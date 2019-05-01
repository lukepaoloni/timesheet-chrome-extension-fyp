import { ERole, EStatus } from '../shared/enum';
import config from '../app/config';
import * as bcrypt from 'bcrypt';
import { UserRO } from './response/user.response';
import { AbstractModel } from '../shared/model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Settings } from './settings';
class IntegrationDto {
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    token: string;
}
export class Integrations {
    @ApiModelProperty()
    google: IntegrationDto;
    @ApiModelProperty()
    github: IntegrationDto;
    @ApiModelProperty()
    bitbucket: IntegrationDto;
}
export class User extends AbstractModel<User> {
    constructor(partial?: Partial<User>) {
        super(partial);
    }
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    email: string;
    password: string;
    role: ERole;
    authType?: 'CUSTOM' | 'GOOGLE';
    integrations: Integrations;
    @ApiModelPropertyOptional()
    fcmPayload?: any;
    settings?: Settings;
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
        const { id, name, email, role, status, integrations, settings } = this;
        const responseObject: UserRO = {
            id,
            name,
            email,
            role,
            status,
            integrations,
            settings,
        };

        return responseObject;
    }
}
