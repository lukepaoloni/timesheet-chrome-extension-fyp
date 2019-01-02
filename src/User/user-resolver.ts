import { Resolver, Query, Args } from "type-graphql";
import { User } from "./user-type";
import * as admin from "firebase-admin";

@Resolver(of => User)
export class UserResolver {
  @Query(returns => [User], { description: "Gets all the users" })
  async users(): Promise<User[]> {
    const users = await admin
      .firestore()
      .collection(`users`)
      .get();
    return users.docs.map(user => user.data()) as User[];
  }

  @Query(returns => User)
  async user(@Args() uuid?: string): Promise<User | null> {
    uuid = uuid ? uuid : "Ly1lNJpvwKV8wDETZD6P";
    await admin
      .firestore()
      .collection(`users`)
      .doc(uuid)
      .onSnapshot(doc => {
        return doc.data() as User;
      });
    return null;
  }
}
