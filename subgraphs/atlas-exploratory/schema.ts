import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for AtlasExploratory (sky/atlas-exploratory)
  """
  type AtlasExploratoryState {
    """
    Full name of the Grounding document entity.
    """
    name: String
    """
    Unique document number assigned to the Grounding document within Atlas.
    """
    docNo: String
    """
    Parent entity that this Grounding document belongs to.
    This is a reference to another Atlas document.
    """
    parent: PHID!
    """
    The type of the Grounding document within Atlas.
    Example: Tenet, Original Context Data, Active Data.
    """
    atlasType: EAtlasType!
    """
    Entire content body of the Grounding document within Atlas.
    """
    content: String
    """
    Master status of the Grounding document as managed by the Atlas Axis facilitator group.
    """
    masterStatus: EStatus!
    """
    Document tags managed by the Atlas Axis facilitator group for classification.
    """
    globalTags: [EGlobalTag!]!
    """
    References to other Atlas entities that are linked to this Grounding document.
    """
    references: [PHID!]!
    """
    List of Atlas documents that were relevant for the creation of this Grounding document.
    """
    originalContextData: [DocumentInfo!]!
    """
    Link to the original P0hub Notion environment where this document was first created or referenced.
    """
    provenance: URL
    """
    Original Notion document ID of the Grounding document.
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
    comment: String
  }

  type DocumentInfo {
    id: PHID!
    name: OLabel
    docNo: String
  }

  """
  Domain (i.e., Atlas) specific document types with the same document model global schema.
  """
  enum EAtlasType {
    SCENARIO
    SCENARIO_VARIATION
  }

  """
  Defines the lifecycle stage of the Grounding document within Atlas.
  """
  enum EStatus {
    PLACEHOLDER
    PROVISIONAL
    APPROVED
    DEFERRED
    ARCHIVED
  }

  """
  These global tags are used for classification in Grounding documents.
  """
  enum EGlobalTag {
    SCOPE_ADVISOR
    AVC
    CAIS
    ML_LOW_PRIORITY
    EXTERNAL_REFERENCE
    DAO_TOOLKIT
    ML_DEFER
    PURPOSE_SYSTEM
    NEWCHAIN
    ML_SUPPORT_DOCS_NEEDED
    TWO_STAGE_BRIDGE
    ECOSYSTEM_INTELLIGENCE
    RECURSIVE_IMPROVEMENT
    LEGACY_TERM_USE_APPROVED
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
    AtlasExploratory_setDocNumber(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetDocNumberInput
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
    AtlasExploratory_removeParent(
      driveId: String
      docId: PHID
      input: AtlasExploratory_RemoveParentInput
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
    AtlasExploratory_setReference(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetReferenceInput
    ): Int
    AtlasExploratory_removeReference(
      driveId: String
      docId: PHID
      input: AtlasExploratory_RemoveReferenceInput
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
    AtlasExploratory_setProvenance(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetProvenanceInput
    ): Int
    AtlasExploratory_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasExploratory_SetNotionIdInput
    ): Int
    AtlasExploratory_addAdditionalGuidance(
      driveId: String
      docId: PHID
      input: AtlasExploratory_AddAdditionalGuidanceInput
    ): Int
    AtlasExploratory_removeAdditionalGuidance(
      driveId: String
      docId: PHID
      input: AtlasExploratory_RemoveAdditionalGuidanceInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasExploratory_SetExploratoryNameInput {
    "Add your inputs here"
    name: String!
  }
  input AtlasExploratory_SetDocNumberInput {
    "Add your inputs here"
    docNo: String!
  }
  input AtlasExploratory_SetContentInput {
    "Add your inputs here"
    content: String!
  }
  input AtlasExploratory_SetMasterStatusInput {
    "Add your inputs here"
    masterStatus: EStatus!
  }
  input AtlasExploratory_SetParentInput {
    "Add your inputs here"
    parent: [PHID!]
  }
  input AtlasExploratory_RemoveParentInput {
    "Add your inputs here"
    parent: [PHID!]
  }
  input AtlasExploratory_SetAtlasTypeInput {
    "Add your inputs here"
    atlasType: EAtlasType!
  }
  input AtlasExploratory_SetFindingsInput {
    "Add your inputs here"
    isAligned: Boolean!
    comment: String!
  }
  input AtlasExploratory_SetReferenceInput {
    "Add your inputs here"
    newReference: PHID
  }
  input AtlasExploratory_RemoveReferenceInput {
    "Add your inputs here"
    reference: PHID
  }

  """
  Module: Tags
  """
  input AtlasExploratory_AddTagsInput {
    "Add your inputs here"
    newTags: [EGlobalTag!]!
  }
  input AtlasExploratory_RemoveTagsInput {
    "Add your inputs here"
    tags: [EGlobalTag!]!
  }

  """
  Module: Context
  """
  input AtlasExploratory_AddContextDataInput {
    "Add your inputs here"
    id: PHID!
    name: String
    docNo: String
  }
  input AtlasExploratory_RemoveContextDataInput {
    "Add your inputs here"
    id: PHID!
  }
  input AtlasExploratory_SetProvenanceInput {
    "Add your inputs here"
    provenance: URL
  }
  input AtlasExploratory_SetNotionIdInput {
    "Add your inputs here"
    notionID: String
  }
  input AtlasExploratory_AddAdditionalGuidanceInput {
    "Add your inputs here"
    additionalGuidance: String!
  }
  input AtlasExploratory_RemoveAdditionalGuidanceInput {
    "Add your inputs here"
    additionalGuidance: String!
  }
`;
