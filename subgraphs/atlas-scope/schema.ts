import { gql } from "graphql-tag";

export const schema = gql`
  """
  Subgraph definition for AtlasScope (sky/atlas-scope)
  """
  type AtlasScopeState {
    """
    Full name of the Scope without the document number.
    For example: "The Support Scope"
    """
    name: OLabel

    """
    Document number of the scope document within Atlas.
    For example: "A.1" for the Governance Scope.
    """
    docNo: String

    """
    Entire content body of the scope document within Atlas.
    For example: "The Governance Scope regulates the governance processes and balance..."
    """
    content: String

    """
    Master status as managed by the Atlas Axis facilitator group.
    """
    masterStatus: Status

    """
    Document tags as managed by the Atlas Axis facilitator group.
    """
    globalTags: [GlobalTag!]!

    """
    List of Atlas documents that were relevant for the creation of the scope document.
    """
    originalContextData: [DocumentInfo!]!

    """
    Link to the original P0hub Notion environment.
    """
    provenance: URL

    """
    Original Notion document ID of the scope document.
    """
    notionId: String
  }

  """
  Reference to a document within Atlas with optional name and document number for display reasons.
  """
  type DocumentInfo {
    id: PHID!
    name: OLabel
    docNo: String
  }

  enum Status {
    PLACEHOLDER
    PROVISIONAL
    APPROVED
    DEFERRED
    ARCHIVED
  }

  enum GlobalTag {
    RECURSIVE_IMPROVEMENT
    SCOPE_ADVISOR
    DAO_TOOLKIT
    PURPOSE_SYSTEM
    ML_LOW_PRIORITY
    EXTERNAL_REFERENCE
    ML_DEFER
    SUBDAO_INCUBATION
    V1_MIP
    ML_HIGH_PRIORITY
    ECOSYSTEM_INTELLIGENCE
    LEGACY_TERM_USE_APPROVED
    CAIS
    INTERNAL_REFERENCE
    FACILITATORDAO
    ML_MED_PRIORITY
    AVC
    P0_HUB_ENTRY_NEEDED
    ANON_WORKFORCE
    NEWCHAIN
    ML_SUPPORT_DOCS_NEEDED
    SUBDAO_REWARDS
    TWO_STAGE_BRIDGE
  }

  """
  Mutations: AtlasScope
  """
  type Mutation {
    AtlasScope_createDocument(driveId: String, name: String): String

    AtlasScope_setScopeName(
      driveId: String
      docId: PHID
      input: AtlasScope_SetScopeNameInput
    ): Int
    AtlasScope_setDocNumber(
      driveId: String
      docId: PHID
      input: AtlasScope_SetDocNumberInput
    ): Int
    AtlasScope_setContent(
      driveId: String
      docId: PHID
      input: AtlasScope_SetContentInput
    ): Int
    AtlasScope_setMasterStatus(
      driveId: String
      docId: PHID
      input: AtlasScope_SetMasterStatusInput
    ): Int
    AtlasScope_addTags(
      driveId: String
      docId: PHID
      input: AtlasScope_AddTagsInput
    ): Int
    AtlasScope_removeTags(
      driveId: String
      docId: PHID
      input: AtlasScope_RemoveTagsInput
    ): Int
    AtlasScope_addContextData(
      driveId: String
      docId: PHID
      input: AtlasScope_AddContextDataInput
    ): Int
    AtlasScope_removeContextData(
      driveId: String
      docId: PHID
      input: AtlasScope_RemoveContextDataInput
    ): Int
    AtlasScope_setProvenance(
      driveId: String
      docId: PHID
      input: AtlasScope_SetProvenanceInput
    ): Int
    AtlasScope_setNotionId(
      driveId: String
      docId: PHID
      input: AtlasScope_SetNotionIdInput
    ): Int
  }

  """
  Module: General
  """
  input AtlasScope_SetScopeNameInput {
    "New name for Scope"
    name: OLabel!
  }
  input AtlasScope_SetDocNumberInput {
    "New document number for the scope document"
    docNo: String!
  }
  input AtlasScope_SetContentInput {
    "Update the content of the scope document"
    content: String!
  }
  input AtlasScope_SetMasterStatusInput {
    "New master status"
    masterStatus: Status!
  }

  """
  Module: Tags
  """
  input AtlasScope_AddTagsInput {
    "Tags to be added"
    newTags: [GlobalTag!]!
  }
  input AtlasScope_RemoveTagsInput {
    "Tags to be removed"
    tags: [GlobalTag!]!
  }

  """
  Module: Context
  """
  input AtlasScope_AddContextDataInput {
    id: PHID!
    name: String
    docNo: String
  }
  input AtlasScope_RemoveContextDataInput {
    id: PHID!
  }
  input AtlasScope_SetProvenanceInput {
    provenance: URL
  }
  input AtlasScope_SetNotionIdInput {
    "Add your inputs here"
    notionID: String
  }
`;
