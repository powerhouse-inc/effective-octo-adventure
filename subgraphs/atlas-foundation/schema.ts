import { gql } from "graphql-tag";

export const schema = gql`
  """
  Subgraph definition for AtlasFoundation (sky/atlas-foundation)
  """
  type AtlasFoundationState {
  """
  Full name of the Foundation entity.
  """
  name: String

  """
  Unique document number assigned to the Foundation entity within Atlas.
  """
  docNo: String

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
  globalTags: [FGlobalTag!]!

  """
  References to other Atlas entities that are linked to this Foundation.
  """
  references: [FDocumentLink!]!

  """
  List of Atlas documents that were relevant for the creation of this Foundation document.
  """
  originalContextData: [FDocumentLink!]!

  """
  Link to the original P0hub Notion environment where this document was first created or referenced.
  """
  provenance: [URL!]!

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
  name: OLabel
  docNo: String
}

"""
Domain (i.e., Atlas) specific document types with the same document model global schema.
"""
enum FAtlasType {
  ARTICLE
  SECTION
  CORE
  ACTIVE_DATA_CONTROLLER
}

enum FStatus {
  PLACEHOLDER
  PROVISIONAL
  APPROVED
  DEFERRED
  ARCHIVED
}

"""
These global tags differ from the ones in Scopes.
"""
enum FGlobalTag {
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
Mutations: AtlasFoundation
"""
type Mutation {
  AtlasFoundation_createDocument(driveId: String, name: String): String

  AtlasFoundation_setFoundationName(
    driveId: String
    docId: PHID
    input: AtlasFoundation_SetFoundationNameInput
  ): Int
  AtlasFoundation_setDocNumber(
    driveId: String
    docId: PHID
    input: AtlasFoundation_SetDocNumberInput
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
  AtlasFoundation_addReference(
    driveId: String
    docId: PHID
    input: AtlasFoundation_AddReferenceInput
  ): Int
  AtlasFoundation_setAtlasType(
    driveId: String
    docId: PHID
    input: AtlasFoundation_SetAtlasTypeInput
  ): Int
  AtlasFoundation_removeReference(
    driveId: String
    docId: PHID
    input: AtlasFoundation_RemoveReferenceInput
  ): Int
  AtlasFoundation_setParent(
    driveId: String
    docId: PHID
    input: AtlasFoundation_SetParentInput
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
  AtlasFoundation_setProvenance(
    driveId: String
    docId: PHID
    input: AtlasFoundation_SetProvenanceInput
  ): Int
  AtlasFoundation_setNotionId(
    driveId: String
    docId: PHID
    input: AtlasFoundation_SetNotionIdInput
  ): Int
}

"""
Module: General
"""
input AtlasFoundation_SetFoundationNameInput {
  name: String!
}
input AtlasFoundation_SetDocNumberInput {
  docNo: String!
}
input AtlasFoundation_SetContentInput {
  content: String!
}
input AtlasFoundation_SetMasterStatusInput {
  masterStatus: FStatus!
}
input AtlasFoundation_AddReferenceInput {
  id: PHID!
  name: OLabel
  docNo: String
}
input AtlasFoundation_SetAtlasTypeInput {
  atlasType: FAtlasType!
}
input AtlasFoundation_RemoveReferenceInput {
  id: PHID!
}
input AtlasFoundation_SetParentInput {
  id: PHID!
  name: OLabel
  docNo: String
}

"""
Module: Tags
"""
input AtlasFoundation_AddTagsInput {
  tags: [FGlobalTag!]!
}
input AtlasFoundation_RemoveTagsInput {
  tags: [FGlobalTag!]!
}

"""
Module: Context
"""
input AtlasFoundation_AddContextDataInput {
  id: PHID!
  name: String
  docNo: String
}
input AtlasFoundation_RemoveContextDataInput {
  id: PHID!
}
input AtlasFoundation_SetProvenanceInput {
  provenance: [URL!]!
}
input AtlasFoundation_SetNotionIdInput {
  notionID: String!
}
`;
