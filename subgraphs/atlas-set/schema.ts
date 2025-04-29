import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for AtlasSet (sky/atlas-set)
  """
  type AtlasSetState {
    id: PHID!
    name: String!
    parent: SetDocumentLink
    notionId: String
  }

  type SetDocumentLink {
    id: PHID!
    title: OLabel
  }

  """
  Queries: AtlasSet
  """
  type AtlasSetQueries {
    getDocument(driveId: String, docId: PHID): AtlasSet
    getDocuments: [AtlasSet!]
  }

  type Query {
    AtlasSet: AtlasSetQueries
  }

  """
  Mutations: AtlasSet
  """
  type Mutation {
    AtlasSet_createDocument(driveId: String, name: String): String

    AtlasSet_setSetName(
      driveId: String
      docId: PHID
      input: AtlasSet_SetSetNameInput
    ): Int
    AtlasSet_setSetParent(
      driveId: String
      docId: PHID
      input: AtlasSet_SetSetParentInput
    ): Int
    AtlasSet_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasSet_SetNotionIdInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasSet_SetSetNameInput {
    name: String!
  }
  input AtlasSet_SetSetParentInput {
    id: PHID!
    title: OLabel
  }
  input AtlasSet_SetNotionIdInput {
    notionId: String!
  }
`;
