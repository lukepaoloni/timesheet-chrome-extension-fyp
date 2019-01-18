import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global()
@Module({
    providers: [
        {
            provide: DatabaseService,
            useValue: new DatabaseService(),
        },
    ],
    exports: [
        DatabaseService,
    ],
})
export class DatabaseModule { }
