import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for AtlasGrounding (sky/atlas-grounding)
  """
  type AtlasGroundingState {
    """
    Unique document number assigned to the Grounding document within Atlas.
    """
    docNo: String
    """
    Full name of the Grounding document entity.
    """
    name: String
    """
    Parent entity that this Grounding document belongs to.
    This is a reference to another Atlas document.
    """
    parent: GDocumentLink!
    """
    The type of the Grounding document within Atlas.
    Example: Tenet, Original Context Data, Active Data.
    """
    atlasType: GAtlasType!
    """
    Entire content body of the Grounding document within Atlas.
    """
    content: String
    """
    Master status of the Grounding document as managed by the Atlas Axis facilitator group.
    """
    masterStatus: GStatus!
    """
    Document tags managed by the Atlas Axis facilitator group for classification.
    """
    globalTags: [String!]!

    """
    List of Atlas documents that were relevant for the creation of this Grounding document.
    """
    originalContextData: [String!]!

    """
    Original Notion document ID of the Grounding document.
    Used for cross-system referencing and linking back to the original Notion source.
    """
    notionId: String
  }

  """
  Reference to a document within Atlas with optional name and document number for display reasons.
  """
  type GDocumentLink {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
    icon: String
  }

  """
  Domain (i.e., Atlas) specific document types with the same document model global schema.
  """
  enum GAtlasType {
    TENET
    ORIGINAL_CONTEXT_DATA
    ACTIVE_DATA
  }

  """
  Defines the lifecycle stage of the Grounding document within Atlas.
  """
  enum GStatus {
    PLACEHOLDER
    PROVISIONAL
    APPROVED
    DEFERRED
    ARCHIVED
  }

  """
  Queries: AtlasGrounding
  """
  type AtlasGroundingQueries {
    getDocument(driveId: String, docId: PHID): AtlasGrounding
    getDocuments: [AtlasGrounding!]
  }

  type Query {
    AtlasGrounding: AtlasGroundingQueries
  }

  """
  Mutations: AtlasGrounding
  """
  type Mutation {
    AtlasGrounding_createDocument(driveId: String, name: String): String

    AtlasGrounding_setGroundingName(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetGroundingNameInput
    ): Int
    AtlasGrounding_setContent(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetContentInput
    ): Int
    AtlasGrounding_setMasterStatus(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetMasterStatusInput
    ): Int
    AtlasGrounding_setAtlasType(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetAtlasTypeInput
    ): Int
    AtlasGrounding_setParent(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetParentInput
    ): Int
    AtlasGrounding_setDocNumber(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetDocNumberInput
    ): Int
    AtlasGrounding_addTags(
      driveId: String
      docId: PHID
      input: AtlasGrounding_AddTagsInput
    ): Int
    AtlasGrounding_removeTags(
      driveId: String
      docId: PHID
      input: AtlasGrounding_RemoveTagsInput
    ): Int
    AtlasGrounding_addContextData(
      driveId: String
      docId: PHID
      input: AtlasGrounding_AddContextDataInput
    ): Int
    AtlasGrounding_removeContextData(
      driveId: String
      docId: PHID
      input: AtlasGrounding_RemoveContextDataInput
    ): Int
    AtlasGrounding_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetNotionIdInput
    ): Int
    AtlasGrounding_replaceContextData(
      driveId: String
      docId: PHID
      input: AtlasGrounding_ReplaceContextDataInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasGrounding_SetGroundingNameInput {
    name: String!
  }
  input AtlasGrounding_SetContentInput {
    content: String!
  }
  input AtlasGrounding_SetMasterStatusInput {
    "Add your inputs here"
    masterStatus: GStatus!
  }
  input AtlasGrounding_SetAtlasTypeInput {
    atlasType: GAtlasType!
  }
  input AtlasGrounding_SetParentInput {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
    icon: String
  }
  input AtlasGrounding_SetDocNumberInput {
    docNo: String
  }

  """
  Module: Tags
  """
  input AtlasGrounding_AddTagsInput {
    tags: [String!]!
  }
  input AtlasGrounding_RemoveTagsInput {
    tags: [String!]!
  }

  """
  Module: Context
  """
  input AtlasGrounding_AddContextDataInput {
    id: String!
  }
  input AtlasGrounding_RemoveContextDataInput {
    id: String!
  }
  input AtlasGrounding_SetNotionIdInput {
    notionID: String!
  }
  input AtlasGrounding_ReplaceContextDataInput {
    prevId: String!
    id: String!
  }
`;
