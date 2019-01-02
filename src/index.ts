// import * as admin from "firebase-admin";
import "reflect-metadata";
import { UserResolver } from "./User/user-resolver";
import { buildSchema } from "type-graphql";
import * as path from "path";
import App from "./app";

let serviceAccount: string | undefined = undefined;
let options: string | undefined = undefined;

try {
  serviceAccount = require("../serviceAccountKey.json");
  options = require("../ormconfig.json");
} catch (error) {}

async function bootstrap() {
  // build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "../build/schema.gql"), // create schema file
  });
  const app = new App();

  if (serviceAccount) {
    await app.initFirestore(serviceAccount);
  } else if (options) {
    await app.initORM(options);
  }

  app.start(schema);
}

bootstrap();
