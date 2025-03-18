import { gql } from "graphql-tag";

export const schema = gql`
  """
  Subgraph definition for AtlasMultiParent (sky/atlas-multiparent)
  """
type AtlasMultiParentState {
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
  parents: [MDocumentLink!]!

  """
  The type of the Grounding document within Atlas.
  Example: Tenet, Original Context Data, Active Data.
  """
  atlasType: MAtlasType!

  """
  Entire content body of the Grounding document within Atlas.
  """
  content: String

  """
  Master status of the Grounding document as managed by the Atlas Axis facilitator group.
  """
  masterStatus: MStatus!

  """
  Document tags managed by the Atlas Axis facilitator group for classification.
  """
  globalTags: [MGlobalTag!]!

  """
  References to other Atlas entities that are linked to this Grounding document.
  """
  references: [MDocumentLink!]!

  """
  List of Atlas documents that were relevant for the creation of this Grounding document.
  """
  originalContextData: [MDocumentLink!]!

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
type MDocumentLink {
  id: PHID!
  name: OLabel
  docNo: String
}

"""
Domain (i.e., Atlas) specific document types with the same document model global schema.
"""
enum MAtlasType {
  ANNOTATION
  NEEDED_RESEARCH
}

"""
Defines the lifecycle stage of the Grounding document within Atlas.
"""
enum MStatus {
  PLACEHOLDER
  PROVISIONAL
  APPROVED
  DEFERRED
  ARCHIVED
}

"""
These global tags are used for classification in Grounding documents.
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
Mutations: AtlasMultiParent
"""
type Mutation {
  AtlasMultiParent_createDocument(driveId: String, name: String): String

  AtlasMultiParent_setMultiparentName(
    driveId: String
    docId: PHID
    input: AtlasMultiParent_SetMultiparentNameInput
  ): Int
  AtlasMultiParent_setDocNumber(
    driveId: String
    docId: PHID
    input: AtlasMultiParent_SetDocNumberInput
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
  AtlasMultiParent_setProvenance(
    driveId: String
    docId: PHID
    input: AtlasMultiParent_SetProvenanceInput
  ): Int
  AtlasMultiParent_setNotionId(
    driveId: String
    docId: PHID
    input: AtlasMultiParent_SetNotionIdInput
  ): Int
  AtlasMultiParent_addReference(
    driveId: String
    docId: PHID
    input: AtlasMultiParent_AddReferenceInput
  ): Int
  AtlasMultiParent_removeReference(
    driveId: String
    docId: PHID
    input: AtlasMultiParent_RemoveReferenceInput
  ): Int
}

"""
Module: General
"""
input AtlasMultiParent_SetMultiparentNameInput {
  "Add your inputs here"
  name: String!
}
input AtlasMultiParent_SetDocNumberInput {
  docNo: String!
}
input AtlasMultiParent_SetContentInput {
  content: String!
}
input AtlasMultiParent_SetMasterStatusInput {
  masterStatus: MStatus!
}
input AtlasMultiParent_AddParentInput {
  id: PHID!
  name: OLabel
  docNo: String
}
input AtlasMultiParent_SetAtlasTypeInput {
  atlasType: MAtlasType!
}
input AtlasMultiParent_RemoveParentInput {
  id: PHID!
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
  name: OLabel
  docNo: String
}
input AtlasMultiParent_RemoveContextDataInput {
  id: PHID!
}
input AtlasMultiParent_SetProvenanceInput {
  provenance: [URL!]!
}
input AtlasMultiParent_SetNotionIdInput {
  notionID: String!
}
input AtlasMultiParent_AddReferenceInput {
  id: PHID!
  name: OLabel
  docNo: String
}
input AtlasMultiParent_RemoveReferenceInput {
  id: PHID!
}
`;
