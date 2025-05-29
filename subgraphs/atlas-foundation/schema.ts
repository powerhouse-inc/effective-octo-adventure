import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for AtlasFoundation (sky/atlas-foundation)
  """
  type AtlasFoundationState {
    """
    Unique document number assigned to the Foundation document within Atlas.
    """
    docNo: String
    """
    Full name of the Foundation entity.
    """
    name: String
    """
    Parent entity that this Foundation belongs to.
    This is a reference to another Atlas document.
    """
    parent: FDocumentLink

    """
    The type of the Foundation entity within Atlas.
    Example: DAO, Governance Body, Research Hub, etc.
    """
    atlasType: FAtlasType!

    """
    Entire content body of the Foundation document within Atlas.
    """
    content: String

    """
    Master status of the Foundation entity as managed by the Atlas Axis facilitator group.
    """
    masterStatus: FStatus!

    """
    Document tags managed by the Atlas Axis facilitator group for classification.
    """
    globalTags: [String!]!

    """
    List of Atlas documents that were relevant for the creation of this Foundation document.
    """
    originalContextData: [String!]!

    """
    Original Notion document ID of the Foundation document.
    Used for cross-system referencing and linking back to the original Notion source.
    """
    notionId: String
  }
  """
  Reference to a document within Atlas with optional name and document number for display reasons.
  """
  type FDocumentLink {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
    icon: String
  }

  """
  Domain (i.e., Atlas) specific document types with the same document model global schema.
  """
  enum FAtlasType {
    ARTICLE
    SECTION
    CORE
    ACTIVE_DATA_CONTROLLER
    TYPE_SPECIFICATION
  }

  enum FStatus {
    PLACEHOLDER
    PROVISIONAL
    APPROVED
    DEFERRED
    ARCHIVED
  }

  """
  Queries: AtlasFoundation
  """
  type AtlasFoundationQueries {
    getDocument(driveId: String, docId: PHID): AtlasFoundation
    getDocuments: [AtlasFoundation!]
  }

  type Query {
    AtlasFoundation: AtlasFoundationQueries
  }

  """
  Mutations: AtlasFoundation
  """
  type Mutation {
    AtlasFoundation_createDocument(driveId: String, name: String): String

    AtlasFoundation_setFoundationName(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetFoundationNameInput
    ): Int
    AtlasFoundation_setContent(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetContentInput
    ): Int
    AtlasFoundation_setMasterStatus(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetMasterStatusInput
    ): Int
    AtlasFoundation_setAtlasType(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetAtlasTypeInput
    ): Int
    AtlasFoundation_setParent(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetParentInput
    ): Int
    AtlasFoundation_setDocNumber(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetDocNumberInput
    ): Int
    AtlasFoundation_addTags(
      driveId: String
      docId: PHID
      input: AtlasFoundation_AddTagsInput
    ): Int
    AtlasFoundation_removeTags(
      driveId: String
      docId: PHID
      input: AtlasFoundation_RemoveTagsInput
    ): Int
    AtlasFoundation_addContextData(
      driveId: String
      docId: PHID
      input: AtlasFoundation_AddContextDataInput
    ): Int
    AtlasFoundation_removeContextData(
      driveId: String
      docId: PHID
      input: AtlasFoundation_RemoveContextDataInput
    ): Int
    AtlasFoundation_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasFoundation_SetNotionIdInput
    ): Int
    AtlasFoundation_replaceContextData(
      driveId: String
      docId: PHID
      input: AtlasFoundation_ReplaceContextDataInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasFoundation_SetFoundationNameInput {
    name: String!
  }
  input AtlasFoundation_SetContentInput {
    content: String!
  }
  input AtlasFoundation_SetMasterStatusInput {
    masterStatus: FStatus!
  }
  input AtlasFoundation_SetAtlasTypeInput {
    atlasType: FAtlasType!
  }
  input AtlasFoundation_SetParentInput {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
    icon: String
  }
  input AtlasFoundation_SetDocNumberInput {
    docNo: String
  }

  """
  Module: Tags
  """
  input AtlasFoundation_AddTagsInput {
    tags: [String!]!
  }
  input AtlasFoundation_RemoveTagsInput {
    tags: [String!]!
  }

  """
  Module: Context
  """
  input AtlasFoundation_AddContextDataInput {
    id: String!
  }
  input AtlasFoundation_RemoveContextDataInput {
    id: String!
  }
  input AtlasFoundation_SetNotionIdInput {
    notionID: String!
  }
  input AtlasFoundation_ReplaceContextDataInput {
    prevId: String!
    id: String!
  }
`;
