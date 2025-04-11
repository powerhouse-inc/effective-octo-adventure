import GraphQL from "./graphql.cjs";
import System from "./system.cjs";
const { client: graphqlClient } = GraphQL;
const { client: systemClient } = System;

export { graphqlClient, systemClient };
