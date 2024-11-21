import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  specifications: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  link: string;
  
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsOptional()
  priority: string;

  @IsString()
  @IsNotEmpty()
  isService: string;
  
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsOptional()
  bought: boolean;

  @IsString()
  @IsNotEmpty()
  listId: string;
}
