import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { JwtStrategy } from 'src/auth/strategy';
import { S3Module } from 'src/s3/s3.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    S3Module, JwtModule.register({})
  ],
  controllers: [ItemController],
  providers: [ItemService, JwtStrategy]
})
export class ItemModule {}
