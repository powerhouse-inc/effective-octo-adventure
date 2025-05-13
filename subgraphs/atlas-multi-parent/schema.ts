import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for AtlasMultiParent (sky/atlas-multiparent)
  """
  type AtlasMultiParentState {
    """
    Full name of the MultiParent document entity.
    """
    name: String

    """
    Parent entity that this MultiParent document belongs to.
    This is a reference to another Atlas document.
    """
    parents: [MDocumentLink!]!

    """
    The type of the MultiParent document within Atlas.
    Example: Tenet, Original Context Data, Active Data.
    """
    atlasType: MAtlasType!

    """
    Entire content body of the MultiParent document within Atlas.
    """
    content: String

    """
    Master status of the MultiParent document as managed by the Atlas Axis facilitator group.
    """
    masterStatus: MStatus!

    """
    Document tags managed by the Atlas Axis facilitator group for classification.
    """
    globalTags: [MGlobalTag!]!

    """
      List of Atlas documents that were relevant for the creation of this MultiParent document.

      Should the subfields of the MDocumentLink object differ from the subfields of the MDocumentLink for Parent? Potentially we don't need docNo field.

    Change a subfield "name" to "title" in MDocumentLink object.


      type MDocumentCDLink {
      id: PHID!
      title: OLabel
    }
    """
    originalContextData: [MDocumentLink!]!

    """
    Original Notion document ID of the MultiParent document.
    Used for cross-system referencing and linking back to the original Notion source.
    """
    notionId: String
  }

  """
  Reference to a document within Atlas with optional name and document number for display reasons.
  """
  type MDocumentLink {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
  }

  """
  Domain (i.e., Atlas) specific document types with the same document model global schema.
  """
  enum MAtlasType {
    ANNOTATION
    NEEDED_RESEARCH
  }

  """
  Defines the lifecycle stage of the MultiParent document within Atlas.
  """
  enum MStatus {
    PLACEHOLDER
    PROVISIONAL
    APPROVED
    DEFERRED
    ARCHIVED
  }

  """
  These global tags are used for classification in MultiParent documents.
  """
  enum MGlobalTag {
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
  Queries: AtlasMultiParent
  """
  type AtlasMultiParentQueries {
    getDocument(driveId: String, docId: PHID): AtlasMultiParent
    getDocuments: [AtlasMultiParent!]
  }

  type Query {
    AtlasMultiParent: AtlasMultiParentQueries
  }

  """
  Mutations: AtlasMultiParent
  """
  type Mutation {
    AtlasMultiParent_createDocument(driveId: String, name: String): String

    AtlasMultiParent_setExploratoryName(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_SetExploratoryNameInput
    ): Int
    AtlasMultiParent_setContent(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_SetContentInput
    ): Int
    AtlasMultiParent_setMasterStatus(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_SetMasterStatusInput
    ): Int
    AtlasMultiParent_addParent(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_AddParentInput
    ): Int
    AtlasMultiParent_setAtlasType(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_SetAtlasTypeInput
    ): Int
    AtlasMultiParent_removeParent(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_RemoveParentInput
    ): Int
    AtlasMultiParent_replaceParent(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_ReplaceParentInput
    ): Int
    AtlasMultiParent_addTags(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_AddTagsInput
    ): Int
    AtlasMultiParent_removeTags(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_RemoveTagsInput
    ): Int
    AtlasMultiParent_addContextData(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_AddContextDataInput
    ): Int
    AtlasMultiParent_removeContextData(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_RemoveContextDataInput
    ): Int
    AtlasMultiParent_replaceContextData(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_ReplaceContextDataInput
    ): Int
    AtlasMultiParent_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasMultiParent_SetNotionIdInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasMultiParent_SetExploratoryNameInput {
    name: String!
  }
  input AtlasMultiParent_SetContentInput {
    content: String!
  }
  input AtlasMultiParent_SetMasterStatusInput {
    masterStatus: MStatus!
  }
  input AtlasMultiParent_AddParentInput {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
  }
  input AtlasMultiParent_SetAtlasTypeInput {
    atlasType: MAtlasType!
  }
  input AtlasMultiParent_RemoveParentInput {
    id: PHID!
  }
  input AtlasMultiParent_ReplaceParentInput {
    prevID: PHID!
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
  }

  """
  Module: Tags
  """
  input AtlasMultiParent_AddTagsInput {
    tags: [MGlobalTag!]!
  }
  input AtlasMultiParent_RemoveTagsInput {
    tags: [MGlobalTag!]!
  }

  """
  Module: Context
  """
  input AtlasMultiParent_AddContextDataInput {
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
  }
  input AtlasMultiParent_RemoveContextDataInput {
    id: PHID!
  }
  input AtlasMultiParent_ReplaceContextDataInput {
    prevId: PHID!
    id: PHID!
    title: OLabel
    docNo: String
    documentType: String
  }
  input AtlasMultiParent_SetNotionIdInput {
    notionId: String!
  }
`;
