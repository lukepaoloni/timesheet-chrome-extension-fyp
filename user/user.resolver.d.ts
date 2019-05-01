import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<{}[]>;
}
