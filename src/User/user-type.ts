import { Field, ObjectType, Int, Float } from "type-graphql";

@ObjectType({ description: "Object representing a user" })
export class User {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  uuid: string;
}
