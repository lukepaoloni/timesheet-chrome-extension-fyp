import { User } from "./user-type";
import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  uuid: string;
}
