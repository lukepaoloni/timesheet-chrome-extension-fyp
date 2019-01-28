import { ERole, EStatus } from '@shared/enum';
import config from '@app/config';
import * as bcrypt from 'bcrypt';
import { UserRO } from './response/user.response';
import { AbstractModel } from '../shared/model';
import * as jwt from 'jsonwebtoken';
import Config from '@app/config';
import { ApiModelProperty } from '@nestjs/swagger';

export class User extends AbstractModel<User> {
    constructor(partial?: Partial<User>) {
        super(partial)
    }
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    email: string;
    password: string;
    role: ERole;
    status: EStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLoggedIn: Date;

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, config.SALT_ROUNDS);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    getData(): UserRO {
        const { name, email, role, status } = this;
        const responseObject: UserRO = { name, email, role, status };

        return responseObject;
    }
}
