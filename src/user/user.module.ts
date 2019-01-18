import { Module } from '@nestjs/common';
import { UsersCollection } from './users.collection';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { UserResolver } from './user.resolver';
import config from 'src/app/config';

let imports: any = [];

if (config.TYPEORM_CONNECTION) {
    imports.push(
        TypeOrmModule.forFeature([User]),
    );
}

@Module({
    imports,
    providers: [
        UsersCollection,
        UserResolver,
    ],
})
export class UserModule { }
