import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import config from '@app/config';
import { UserController } from './user.controller';

let imports: any = [];

if (config.TYPEORM_CONNECTION) {
    imports.push(
        TypeOrmModule.forFeature([User]),
    );
}

@Module({
    imports,
    providers: [
        UserService,
        UserResolver,
    ],
    controllers: [
        UserController,
    ],
})
export class UserModule { }
