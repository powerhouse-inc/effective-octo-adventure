import { gql } from "graphql-tag";

export const schema = gql`
  """
  Subgraph definition for AtlasGrounding (sky/atlas-grounding)
  """
  type AtlasGroundingState {
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
    globalTags: [GGlobalTag!]!

    """
    References to other Atlas entities that are linked to this Grounding document.
    """
    references: [GDocumentLink!]!

    """
    List of Atlas documents that were relevant for the creation of this Grounding document.
    """
    originalContextData: [GDocumentLink!]!

    """
    Link to the original P0hub Notion environment where this document was first created or referenced.
    """
    provenance: [URL!]!

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
    name: OLabel
    docNo: String
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
  These global tags are used for classification in Grounding documents.
  """
  enum GGlobalTag {
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
  Mutations: AtlasGrounding
  """
  type Mutation {
    AtlasGrounding_createDocument(driveId: String, name: String): String

    AtlasGrounding_setGroundingName(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetGroundingNameInput
    ): Int
    AtlasGrounding_setDocNumber(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetDocNumberInput
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
    AtlasGrounding_setProvenance(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetProvenanceInput
    ): Int
    AtlasGrounding_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasGrounding_SetNotionIdInput
    ): Int
    AtlasGrounding_addReference(
      driveId: String
      docId: PHID
      input: AtlasGrounding_AddReferenceInput
    ): Int
    AtlasGrounding_removeReference(
      driveId: String
      docId: PHID
      input: AtlasGrounding_RemoveReferenceInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasGrounding_SetGroundingNameInput {
    name: String!
  }
  input AtlasGrounding_SetDocNumberInput {
    docNo: String!
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
    name: OLabel
    docNo: String
  }

  """
  Module: Tags
  """
  input AtlasGrounding_AddTagsInput {
    tags: [GGlobalTag!]!
  }
  input AtlasGrounding_RemoveTagsInput {
    tags: [GGlobalTag!]!
  }

  """
  Module: Context
  """
  input AtlasGrounding_AddContextDataInput {
    id: PHID!
    name: String
    docNo: String
  }
  input AtlasGrounding_RemoveContextDataInput {
    id: PHID!
  }
  input AtlasGrounding_SetProvenanceInput {
    provenance: [URL!]!
  }
  input AtlasGrounding_SetNotionIdInput {
    notionID: String!
  }
  input AtlasGrounding_AddReferenceInput {
    id: PHID!
    name: String
    docNo: String
  }
  input AtlasGrounding_RemoveReferenceInput {
    id: PHID!
  }
`;
