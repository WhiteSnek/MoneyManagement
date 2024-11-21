import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemDto } from "./dto";
import { S3Service } from "src/s3/s3.service";
import { Prisma } from "@prisma/client";
import cron from "node-cron";

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private s3: S3Service
  ) {}

  cleanName(name: string, maxLen: number = 30): string {
    // Remove slashes and truncate if necessary
    const sanitized = name.replace(/[\/\s]/g, "");

    return sanitized.length > maxLen ? sanitized.slice(0, maxLen) : sanitized;
  }

  async addItem(displayImage: Express.Multer.File, dto: ItemDto, userId) {
    console.log(dto);
    try {
      const link = dto.link || "";
      const price = parseFloat(dto.price);
      const quantity = parseInt(dto.quantity);
      const isService = dto.isService.toLowerCase() === "true";
      if (!dto.listId) {
        throw new Error(
          "List ID is required to create an item and associate it with a list."
        );
      }
      let item;
      item = await this.prisma.item.findFirst({
        where: {
          userId,
          name: dto.name,
          listId: dto.listId,
          bought: false,
        },
      });
      if (item) {
        const newItem = await this.prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity + 1,
          },
        });
        return newItem;
      }
      let displayImageUrl: string | null = null;
      if (displayImage) {
        displayImageUrl = await this.s3.uploadToS3(
          displayImage,
          `products/${dto.listId}/${this.cleanName(dto.name, 20)}`
        );
      }
      item = await this.prisma.item.create({
        data: {
          name: dto.name,
          specifications: dto.specifications,
          price,
          link,
          quantity,
          isService,
          category: dto.category,
          list: { connect: { id: dto.listId } },
          displayImage: displayImageUrl,
          user: { connect: { id: userId } },
        },
      });

      return item;
    } catch (error) {
      throw error;
    }
  }

  async getBoughtItems(userId: string) {
    try {
      const items = await this.prisma.item.findMany({
        where: {
          userId,
          bought: true,
        },
        select: {
          id: true,
          name: true,
          displayImage: true,
          price: true,
          quantity: true,
          specifications: true,
          updatedAt: true,
        },
      });
      return items;
    } catch (error) {
      throw error;
    }
  }

  async getListItems(listId: string) {
    try {
      const items = await this.prisma.item.findMany({
        where: {
          listId,
        },
        select: {
          id: true,
          name: true,
          displayImage: true,
          quantity: true,
          price: true,
          priority: true,
          category: true,
        },
      });
      return items;
    } catch (error) {
      throw error;
    }
  }

  async getItemDetails(itemId: string) {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });
      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(itemId: string) {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new ForbiddenException("Item not found!");
      }

      if (item.displayImage) {
        const fileKey = item.displayImage.split("amazonaws.com/")[1];
        await this.s3.deleteFromS3(fileKey);
      }

      const deletedItem = await this.prisma.item.delete({
        where: {
          id: itemId,
        },
      });
      return deletedItem;
    } catch (error) {
      throw error;
    }
  }

  async houseKeeping() {
    const presentDate = new Date();
    const cutoffDate = new Date(
      presentDate.getTime() - 180 * 24 * 60 * 60 * 1000
    );

    try {
      await this.prisma.item.deleteMany({
        where: {
          bought: true,
          updatedAt: {
            lt: cutoffDate,
          },
        },
      });
      console.log("Housekeeping completed successfully");
    } catch (error) {
      console.error("Error during housekeeping:", error);
    }
  }

  // set cronjob
  scheduleHouseKeeping() {
    cron.schedule("0 0 * * *", () => this.houseKeeping());
    console.log("Daily housekeeping job scheduled at midnight.");
  }

  async buyItem(itemId: string, userId: string) {
    try {
      // Fetch the item details
      const item = await this.prisma.item.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        throw new ForbiddenException("Item not found");
      }

      if (item.bought) {
        throw new ForbiddenException("Item is already marked as bought");
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new ForbiddenException("User not found");
      }

      const itemPrice = item.price as Prisma.Decimal;

      const totalItemPrice = itemPrice.mul(item.quantity);
      const budget = user.budget;

      if (budget.lt(totalItemPrice)) {
        throw new ForbiddenException("Insufficient funds to buy the item");
      }

      // Mark the item as bought
      const updatedItem = await this.prisma.item.update({
        where: { id: itemId },
        data: { bought: true },
      });

      // Update the user's monthly income
      const newBudget = budget.minus(totalItemPrice);
      await this.prisma.user.update({
        where: { id: userId },
        data: { budget: newBudget },
      });

      return updatedItem;
    } catch (error) {
      console.error("Error buying item:", error.message);
      throw error;
    }
  }
}
