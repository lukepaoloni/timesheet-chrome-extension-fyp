import { IRole, IStatus } from './interfaces';
import config from '@app/config';
import * as bcrypt from 'bcrypt';
import { UserRO } from './response/user.response';

export class User {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    id: string;
    name: string;
    email: string;
    password: string;
    role: IRole;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLoggedIn: Date;
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, config.SALT_ROUNDS);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    getData(showToken: boolean = true): UserRO {
        const { name, email, role, status } = this;
        const responseObject: UserRO = { name, email, role, status };

        return responseObject;
    }
}
