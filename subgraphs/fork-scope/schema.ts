import { gql } from "graphql-tag";

export const schema = gql`
  """
  Mutations: AtlasScope
  """
  type Mutation {
    ForkAtlas(driveId: String, docId: PHID): String
  }
`;
