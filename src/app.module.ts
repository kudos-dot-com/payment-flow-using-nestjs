import { Module,UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UserModule } from './users/users.module'
import {MongooseModule} from '@nestjs/mongoose'
import { UsersService } from './users/users.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import config from './config/keys';
import { UserSchema } from './users/schema/user.schema';
import { PaymentModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'User' , schema: UserSchema }]),
    UserModule,
    PaymentModule.forRoot(config.stripeKey,{apiVersion:'2020-08-27'}),
    AuthModule],
    
  controllers: [AppController, UsersController, PaymentsController],
  providers: [AppService, UsersService, PaymentsService],
})
export class AppModule {}
