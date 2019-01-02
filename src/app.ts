import * as express from "express";
import * as admin from "firebase-admin";
import * as path from "path";
import { GraphQLSchema } from "graphql";
import { createConnection } from "typeorm";
const { ApolloServer } = require("apollo-server-express");

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public start(schema: GraphQLSchema) {
    this.graphQl(schema);
    this.graphqlDocs();
    this.app.listen(4000, () => console.log("🚀 Server ready at http://localhost:4000/graphql/"));
  }

  // Route /graphql
  public graphQl(schema: GraphQLSchema) {
    const server = new ApolloServer({
      schema,
      playground: {
        endpoint: `http://localhost:4000/graphql`,
      },
      // engine: {
      //   apiKey: ""
      // }
    });
    server.applyMiddleware({ app: this.app });
  }

  public async initFirestore(serviceAccount: string) {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  public async initORM(options: string) {
    await createConnection(options);
  }

  // Route /docs
  public graphqlDocs() {
    this.app.use("/doc", express.static(path.join(__dirname, "../doc/index.html")));
  }
}
