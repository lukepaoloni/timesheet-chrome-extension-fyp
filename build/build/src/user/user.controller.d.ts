import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<import("./response/user.response").UserRO[]>;
    create(data: UserDto): Promise<import("firebase").firestore.DocumentData>;
    getOne(id: string): Promise<import("firebase").firestore.DocumentData>;
    update(id: string, data: Partial<User>): Promise<void>;
    destroy(id: string): Promise<void>;
}
