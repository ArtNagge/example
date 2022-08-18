import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CustomMailerModule } from './mailer/mailer.module';
import { TypeComponentsModule } from './typeComponents/typeComponents.module';
import { ComponentsModule } from './component/component.module';
import { ProductModule } from './product/product.module';
import { ComplectationModule } from './complectation/complectation.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    DbModule,
    AuthModule,
    UsersModule,
    CompanyModule,
    ComponentsModule,
    CustomMailerModule,
    TypeComponentsModule,
    ProductModule,
    ComplectationModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
