import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for AtlasExploratory (sky/atlas-exploratory)
  """
  type AtlasExploratoryState {
    """
    Unique document number assigned to the Exploratory document within Atlas.
    """
    docNo: String
    """
    Full name of the Exploratory document entity.
    """
    name: String
    """
    Parent entity that this Exploratory document belongs to.
    This is a reference to another Atlas document.
    """
    parent: EDocumentLink!
    """
    The type of the Exploratory document within Atlas.
    Example: Tenet, Original Context Data, Active Data.
    """
    atlasType: EAtlasType!
    """
    Entire content body of the Exploratory document within Atlas.
    """
    content: String
    """
    Master status of the Exploratory document as managed by the Atlas Axis facilitator group.
    """
    masterStatus: EStatus!
    """
    Document tags managed by the Atlas Axis facilitator group for classification.
    """
    globalTags: [String!]!
    """
    List of Atlas documents that were relevant for the creation of this Exploratory document.
    """
    originalContextData: [String!]!
    """
    Original Notion document ID of the Exploratory document.
    Used for cross-system referencing and linking back to the original Notion source.
    """
    notionId: String
    """
    Alignmnet boolean findings.
    """
    findings: Finding!
    """
    Additional commentary and context for guidance.
    """
    additionalGuidance: String!
  }

  """
  Reference to a document within Atlas with optional name and document number for display reasons.
  """
  type Finding {
    isAligned: Boolean!
  }

  type EDocumentLink {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
    icon: String
  }

  """
  Domain (i.e., Atlas) specific document types with the same document model global schema.
  """
  enum EAtlasType {
    SCENARIO
    SCENARIO_VARIATION
  }

  """
  Defines the lifecycle stage of the Exploratory document within Atlas.
  """
  enum EStatus {
    PLACEHOLDER
    PROVISIONAL
    APPROVED
    DEFERRED
    ARCHIVED
  }

  """
  Queries: AtlasExploratory
  """
  type AtlasExploratoryQueries {
    getDocument(driveId: String, docId: PHID): AtlasExploratory
    getDocuments: [AtlasExploratory!]
  }

  type Query {
    AtlasExploratory: AtlasExploratoryQueries
  }

  """
  Mutations: AtlasExploratory
  """
  type Mutation {
    AtlasExploratory_createDocument(driveId: String, name: String): String

    AtlasExploratory_setExploratoryName(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetExploratoryNameInput
    ): Int
    AtlasExploratory_setContent(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetContentInput
    ): Int
    AtlasExploratory_setMasterStatus(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetMasterStatusInput
    ): Int
    AtlasExploratory_setParent(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetParentInput
    ): Int
    AtlasExploratory_setAtlasType(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetAtlasTypeInput
    ): Int
    AtlasExploratory_setFindings(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetFindingsInput
    ): Int
    AtlasExploratory_setDocNumber(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetDocNumberInput
    ): Int
    AtlasExploratory_addTags(
      driveId: String
      docId: PHID
      input: AtlasExploratory_AddTagsInput
    ): Int
    AtlasExploratory_removeTags(
      driveId: String
      docId: PHID
      input: AtlasExploratory_RemoveTagsInput
    ): Int
    AtlasExploratory_addContextData(
      driveId: String
      docId: PHID
      input: AtlasExploratory_AddContextDataInput
    ): Int
    AtlasExploratory_removeContextData(
      driveId: String
      docId: PHID
      input: AtlasExploratory_RemoveContextDataInput
    ): Int
    AtlasExploratory_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetNotionIdInput
    ): Int
    AtlasExploratory_setAdditionalGuidance(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetAdditionalGuidanceInput
    ): Int
    AtlasExploratory_replaceContextData(
      driveId: String
      docId: PHID
      input: AtlasExploratory_ReplaceContextDataInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasExploratory_SetExploratoryNameInput {
    name: String!
  }
  input AtlasExploratory_SetContentInput {
    content: String!
  }
  input AtlasExploratory_SetMasterStatusInput {
    masterStatus: EStatus!
  }
  input AtlasExploratory_SetParentInput {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
    icon: String
  }
  input AtlasExploratory_SetAtlasTypeInput {
    atlasType: EAtlasType!
  }
  input AtlasExploratory_SetFindingsInput {
    isAligned: Boolean!
  }
  input AtlasExploratory_SetDocNumberInput {
    docNo: String
  }

  """
  Module: Tags
  """
  input AtlasExploratory_AddTagsInput {
    newTags: [String!]!
  }
  input AtlasExploratory_RemoveTagsInput {
    tags: [String!]!
  }

  """
  Module: Context
  """
  input AtlasExploratory_AddContextDataInput {
    id: String!
  }
  input AtlasExploratory_RemoveContextDataInput {
    id: String!
  }
  input AtlasExploratory_SetNotionIdInput {
    notionID: String
  }
  input AtlasExploratory_SetAdditionalGuidanceInput {
    additionalGuidance: String!
  }
  input AtlasExploratory_ReplaceContextDataInput {
    prevId: String!
    id: String!
  }
`;
