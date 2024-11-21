import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './dto';
import { GetUser, UploadFile } from 'src/auth/decorator';
import { ApiResponse } from 'src/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('item')
@UseGuards(JwtGuard)
export class ItemController {
    constructor(private itemService: ItemService) {}

    @UploadFile('displayImage')
    @Post('add')
    async addItem(@UploadedFile() displayImage: Express.Multer.File, @Body() dto: ItemDto, @GetUser('id') userId: string): Promise<ApiResponse> {
        try {
            const response = await this.itemService.addItem(displayImage, dto, userId);
            return {
                status: 'success',
                message: 'Item created successfully',
                data: response
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to add item',
                data: null
            };
        }
    }

    @Get('list/:id') // Get list items by listId
    async getListItems(@Param('id') listId: string): Promise<ApiResponse> {
        try {
            const response = await this.itemService.getListItems(listId);
            return {
                status: 'success',
                message: 'Items fetched successfully',
                data: response
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to fetch items for list',
                data: null
            };
        }
    }

    @Get('bought')
    async getBoughtProducts(@GetUser('id') userId: string) {
        try {
            const response = await this.itemService.getBoughtItems(userId);
            return {
                status: 'success',
                message: 'Items fetched successfully',
                data: response
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to fetch items for list',
                data: null
            };
        }
    }

    @Get(':id') // Get details of a specific item
    async getItemDetails(@Param('id') itemId: string): Promise<ApiResponse> {
        try {
            const response = await this.itemService.getItemDetails(itemId);
            if (!response) {
                return {
                    status: 'error',
                    message: 'Item not found',
                    data: null
                };
            }
            return {
                status: 'success',
                message: 'Item details fetched successfully',
                data: response
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to fetch item details',
                data: null
            };
        }
    }

    @Delete(':id')
    async deleteItem(@Param('id') itemId: string): Promise<ApiResponse> {
        try {
            const response = await this.itemService.deleteItem(itemId);
            if (!response) {
                return {
                    status: 'error',
                    message: 'Item not found or cannot be deleted',
                    data: null
                };
            }
            return {
                status: 'success',
                message: 'Item deleted successfully',
                data: null
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to delete item',
                data: null
            };
        }
    }

    @Patch(':id') // Corrected this to properly handle dynamic ID parameter
    async buyItem(@Param('id') itemId: string, @GetUser('id') userId: string): Promise<ApiResponse> {
        try {
            const response = await this.itemService.buyItem(itemId, userId);
            if (!response) {
                return {
                    status: 'error',
                    message: 'Item not found or already bought',
                    data: null
                };
            }
            return {
                status: 'success',
                message: 'Item purchased successfully',
                data: response
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to buy item',
                data: null
            };
        }
    }
}
