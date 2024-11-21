import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ListService } from "./list.service";
import { GetUser } from "src/auth/decorator";
import { ApiResponse } from "src/common";

@Controller("list")
@UseGuards(JwtGuard)
export class ListController {
  constructor(private listService: ListService) {}

  @Post("add")
  @HttpCode(201) // Set HTTP status code to 201 for created resource
  async addList(
    @Body() body: { title: string },
    @GetUser("id") userId: string
  ): Promise<ApiResponse> {
    try {
      const response = await this.listService.addList(body.title, userId);
      return {
        status: "success",
        message: "List created successfully",
        data: response,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message || "Failed to create list",
        data: null,
      };
    }
  }

  @Get("lists")
  async getUserLists(@GetUser("id") userId: string): Promise<ApiResponse> {
    try {
      const response = await this.listService.getUserLists(userId);
      return {
        status: "success",
        message: "User lists retrieved successfully",
        data: response,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message || "Failed to retrieve user lists",
        data: null,
      };
    }
  }

  @Get(":id")
  async getListDetails(
    @GetUser("id") userId: string,
    @Param("id") listId: string
  ): Promise<ApiResponse> {
    try {
      const response = await this.listService.getListDetails(userId, listId);
      if (!response) {
        return {
          status: "error",
          message: "List not found",
          data: null,
        };
      }
      return {
        status: "success",
        message: "List details retrieved successfully",
        data: response,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message || "Failed to retrieve list details",
        data: null,
      };
    }
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteList(
    @GetUser("id") userId: string,
    @Param("id") listId: string
  ): Promise<ApiResponse> {
    const response = await this.listService.deleteList(userId, listId);
    if (!response) {
      return {
        status: "error",
        message: "List not found or not authorized to delete",
        data: null,
      };
    }
    return {
      status: "success",
      message: "List deleted successfully",
      data: null,
    };
  }
}
