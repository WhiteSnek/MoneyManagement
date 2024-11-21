import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { S3Module } from '../s3/s3.module'; 
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy, JwtStrategy } from './strategy';

@Module({
  imports: [
    S3Module, JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,GoogleStrategy]
})
export class AuthModule {}
