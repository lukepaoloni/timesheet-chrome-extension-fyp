import { Resolver, Query } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
    @Query()
    getUsers() {
        return [{
            id: '1',
            username: 'hello',
        }];
    }
}
