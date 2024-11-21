import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async addList(title: string, userId: string) {
    try {
      const checkList = await this.prisma.list.findFirst({
        where: {
          title,
        },
      });
      if (checkList)
        throw new ForbiddenException("List for this month already exists");
      const list = await this.prisma.list.create({
        data: {
          title,
          userId,
        },
      });
      const lists = await this.prisma.list.findMany({
        where: { userId },
        select: {
          id: true,
          title: true,
          items: {
            select: {
              id: true,
              name: true,
              displayImage: true,
              price: true,
              quantity: true,
              category: true,
              bought: true,
            },
          },
        },
      });
      return lists;
    } catch (error) {
      throw error;
    }
  }

  async getUserLists(userId: string) {
    try {
      const lists = await this.prisma.list.findMany({
        where: { userId },
        select: {
          id: true,
          title: true,
          items: {
            select: {
              id: true,
              name: true,
              displayImage: true,
              price: true,
              quantity: true,
              category: true,
              bought: true,
            },
          },
        },
      });
      return lists;
    } catch (error) {
      throw error;
    }
  }

  async getListDetails(userId: string, listId: string) {
    try {
      const list = await this.prisma.list.findFirst({
        where: { userId, id: listId },
        include: {
          items: true,
        },
      });
      return list;
    } catch (error) {
      throw error;
    }
  }

  async deleteList(userId: string, listId: string) {
    try {
      const list = await this.prisma.list.findFirst({
        where: {
          id: listId,
          userId: userId,
        },
      });

      if (!list) {
        throw new Error("List not found or does not belong to the user");
      }
      const deletedList = await this.prisma.list.delete({
        where: {
          id: list.id,
        },
      });

      return deletedList;
    } catch (error) {
      throw error;
    }
  }
}
