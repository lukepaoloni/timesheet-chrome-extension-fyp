import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import Config from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from '@user/user.module';
import { DateScalar } from '../scalar/date';
import { ProjectModule } from '@project/project.module';
import { ClientModule } from '@client/client.module';
import { TimesheetModule } from '@timesheet/timesheet.module';

let imports: any = [
  DatabaseModule,
  GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
  }),
  UserModule,
  ProjectModule,
  ClientModule,
  TimesheetModule
];

if (Config.TYPEORM_CONNECTION) {
  imports.push(
    TypeOrmModule.forRoot(),
  );
}

@Module({
  imports,
  controllers: [],
  providers: [
    DateScalar,
  ],
})
export class AppModule { }
