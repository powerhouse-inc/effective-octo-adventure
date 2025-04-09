// noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols, TypeScriptCheckImport
import { DeepRequired } from "ts-essentials"
import { Maybe, IResponseListener, Endpoint } from "graphql-ts-client/dist"

// Scalars
export type IDate = string | Date
export declare type Amount = string
export declare type Amount_Crypto = string
export declare type Amount_Currency = string
export declare type Amount_Fiat = string
export declare type Amount_Money = string
export declare type Amount_Percentage = string
export declare type Amount_Tokens = string
export declare type Currency = string
export declare type Date = IDate
export declare type DateTime = IDate
export declare type ID = string
export declare type EmailAddress = string
export declare type EthereumAddress = string
export declare type JSONObject = string
export declare type OID = string
export declare type OLabel = string
export declare type PHID = string
export declare type URL = string

// Enums

export declare enum AtlasExploratory_EAtlasType {
  scenario = "SCENARIO",
  scenarioVariation = "SCENARIO_VARIATION",
}

export declare enum AtlasExploratory_EGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum AtlasExploratory_EStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum AtlasFoundation_FAtlasType {
  activeDataController = "ACTIVE_DATA_CONTROLLER",
  article = "ARTICLE",
  core = "CORE",
  section = "SECTION",
}

export declare enum AtlasFoundation_FGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum AtlasFoundation_FStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum AtlasGrounding_GAtlasType {
  activeData = "ACTIVE_DATA",
  originalContextData = "ORIGINAL_CONTEXT_DATA",
  tenet = "TENET",
}

export declare enum AtlasGrounding_GGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum AtlasGrounding_GStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum AtlasMultiParent_MAtlasType {
  annotation = "ANNOTATION",
  neededResearch = "NEEDED_RESEARCH",
}

export declare enum AtlasMultiParent_MGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum AtlasMultiParent_MStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum AtlasScope_GlobalTag {
  anonWorkforce = "ANON_WORKFORCE",
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  facilitatordao = "FACILITATORDAO",
  internalReference = "INTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlHighPriority = "ML_HIGH_PRIORITY",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlMedPriority = "ML_MED_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  p0HubEntryNeeded = "P0_HUB_ENTRY_NEEDED",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  subdaoIncubation = "SUBDAO_INCUBATION",
  subdaoRewards = "SUBDAO_REWARDS",
  twoStageBridge = "TWO_STAGE_BRIDGE",
  v1Mip = "V1_MIP",
}

export declare enum AtlasScope_Status {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum DocumentDrive_TransmitterType {
  internal = "Internal",
  matrixConnect = "MatrixConnect",
  pullResponder = "PullResponder",
  rESTWebhook = "RESTWebhook",
  secureConnect = "SecureConnect",
  switchboardPush = "SwitchboardPush",
}

export declare enum DocumentDrive_TriggerType {
  pullResponder = "PullResponder",
}

export declare enum EAtlasType {
  scenario = "SCENARIO",
  scenarioVariation = "SCENARIO_VARIATION",
}

export declare enum EGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum EStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum FAtlasType {
  activeDataController = "ACTIVE_DATA_CONTROLLER",
  article = "ARTICLE",
  core = "CORE",
  section = "SECTION",
}

export declare enum FGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum FStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum GAtlasType {
  activeData = "ACTIVE_DATA",
  originalContextData = "ORIGINAL_CONTEXT_DATA",
  tenet = "TENET",
}

export declare enum GGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum GlobalTag {
  anonWorkforce = "ANON_WORKFORCE",
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  facilitatordao = "FACILITATORDAO",
  internalReference = "INTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlHighPriority = "ML_HIGH_PRIORITY",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlMedPriority = "ML_MED_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  p0HubEntryNeeded = "P0_HUB_ENTRY_NEEDED",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  subdaoIncubation = "SUBDAO_INCUBATION",
  subdaoRewards = "SUBDAO_REWARDS",
  twoStageBridge = "TWO_STAGE_BRIDGE",
  v1Mip = "V1_MIP",
}

export declare enum GStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum MAtlasType {
  annotation = "ANNOTATION",
  neededResearch = "NEEDED_RESEARCH",
}

export declare enum MGlobalTag {
  avc = "AVC",
  cais = "CAIS",
  daoToolkit = "DAO_TOOLKIT",
  ecosystemIntelligence = "ECOSYSTEM_INTELLIGENCE",
  externalReference = "EXTERNAL_REFERENCE",
  legacyTermUseApproved = "LEGACY_TERM_USE_APPROVED",
  mlDefer = "ML_DEFER",
  mlLowPriority = "ML_LOW_PRIORITY",
  mlSupportDocsNeeded = "ML_SUPPORT_DOCS_NEEDED",
  newchain = "NEWCHAIN",
  purposeSystem = "PURPOSE_SYSTEM",
  recursiveImprovement = "RECURSIVE_IMPROVEMENT",
  scopeAdvisor = "SCOPE_ADVISOR",
  twoStageBridge = "TWO_STAGE_BRIDGE",
}

export declare enum MStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

export declare enum Status {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
}

type AllEnums =
  | AtlasExploratory_EAtlasType
  | AtlasExploratory_EGlobalTag
  | AtlasExploratory_EStatus
  | AtlasFoundation_FAtlasType
  | AtlasFoundation_FGlobalTag
  | AtlasFoundation_FStatus
  | AtlasGrounding_GAtlasType
  | AtlasGrounding_GGlobalTag
  | AtlasGrounding_GStatus
  | AtlasMultiParent_MAtlasType
  | AtlasMultiParent_MGlobalTag
  | AtlasMultiParent_MStatus
  | AtlasScope_GlobalTag
  | AtlasScope_Status
  | DocumentDrive_TransmitterType
  | DocumentDrive_TriggerType
  | EAtlasType
  | EGlobalTag
  | EStatus
  | FAtlasType
  | FGlobalTag
  | FStatus
  | GAtlasType
  | GGlobalTag
  | GlobalTag
  | GStatus
  | MAtlasType
  | MGlobalTag
  | MStatus
  | Status

// Args
export interface AtlasExploratoryArgs {}
export interface AtlasFeedbackIssuesArgs {}
export interface AtlasFoundationArgs {}
export interface AtlasGroundingArgs {}
export interface AtlasMultiParentArgs {}
export interface AtlasScopeArgs {}
export interface AtlasExploratoryCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasExploratorySetExploratoryNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetExploratoryNameInput
}
export interface AtlasExploratorySetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetDocNumberInput
}
export interface AtlasExploratorySetContentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetContentInput
}
export interface AtlasExploratorySetMasterStatusArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetMasterStatusInput
}
export interface AtlasExploratorySetParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetParentInput
}
export interface AtlasExploratoryRemoveParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_RemoveParentInput
}
export interface AtlasExploratorySetAtlasTypeArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetAtlasTypeInput
}
export interface AtlasExploratorySetFindingsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetFindingsInput
}
export interface AtlasExploratoryAddTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_AddTagsInput
}
export interface AtlasExploratoryRemoveTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_RemoveTagsInput
}
export interface AtlasExploratoryAddContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_AddContextDataInput
}
export interface AtlasExploratoryRemoveContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_RemoveContextDataInput
}
export interface AtlasExploratorySetProvenanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetProvenanceInput
}
export interface AtlasExploratorySetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetNotionIdInput
}
export interface AtlasExploratoryAddAdditionalGuidanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_AddAdditionalGuidanceInput
}
export interface AtlasExploratoryRemoveAdditionalGuidanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_RemoveAdditionalGuidanceInput
}
export interface AtlasFeedbackIssuesCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasFeedbackIssuesCreateIssueArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_CreateIssueInput
}
export interface AtlasFeedbackIssuesDeleteIssueArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_DeleteIssueInput
}
export interface AtlasFeedbackIssuesAddNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_AddNotionIdInput
}
export interface AtlasFeedbackIssuesRemoveNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_RemoveNotionIdInput
}
export interface AtlasFeedbackIssuesCreateCommentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_CreateCommentInput
}
export interface AtlasFeedbackIssuesDeleteCommentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_DeleteCommentInput
}
export interface AtlasFeedbackIssuesEditCommentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFeedbackIssues_EditCommentInput
}
export interface AtlasFoundationCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasFoundationSetFoundationNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetFoundationNameInput
}
export interface AtlasFoundationSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetDocNumberInput
}
export interface AtlasFoundationSetContentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetContentInput
}
export interface AtlasFoundationSetMasterStatusArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetMasterStatusInput
}
export interface AtlasFoundationAddReferenceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_AddReferenceInput
}
export interface AtlasFoundationSetAtlasTypeArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetAtlasTypeInput
}
export interface AtlasFoundationRemoveReferenceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_RemoveReferenceInput
}
export interface AtlasFoundationSetParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetParentInput
}
export interface AtlasFoundationAddTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_AddTagsInput
}
export interface AtlasFoundationRemoveTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_RemoveTagsInput
}
export interface AtlasFoundationAddContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_AddContextDataInput
}
export interface AtlasFoundationRemoveContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_RemoveContextDataInput
}
export interface AtlasFoundationSetProvenanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetProvenanceInput
}
export interface AtlasFoundationSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetNotionIdInput
}
export interface AtlasGroundingCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasGroundingSetGroundingNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetGroundingNameInput
}
export interface AtlasGroundingSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetDocNumberInput
}
export interface AtlasGroundingSetContentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetContentInput
}
export interface AtlasGroundingSetMasterStatusArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetMasterStatusInput
}
export interface AtlasGroundingSetAtlasTypeArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetAtlasTypeInput
}
export interface AtlasGroundingSetParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetParentInput
}
export interface AtlasGroundingAddTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_AddTagsInput
}
export interface AtlasGroundingRemoveTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_RemoveTagsInput
}
export interface AtlasGroundingAddContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_AddContextDataInput
}
export interface AtlasGroundingRemoveContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_RemoveContextDataInput
}
export interface AtlasGroundingSetProvenanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetProvenanceInput
}
export interface AtlasGroundingSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetNotionIdInput
}
export interface AtlasGroundingAddReferenceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_AddReferenceInput
}
export interface AtlasGroundingRemoveReferenceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_RemoveReferenceInput
}
export interface AtlasMultiParentCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasMultiParentSetMultiparentNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetMultiparentNameInput
}
export interface AtlasMultiParentSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetDocNumberInput
}
export interface AtlasMultiParentSetContentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetContentInput
}
export interface AtlasMultiParentSetMasterStatusArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetMasterStatusInput
}
export interface AtlasMultiParentAddParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_AddParentInput
}
export interface AtlasMultiParentSetAtlasTypeArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetAtlasTypeInput
}
export interface AtlasMultiParentRemoveParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_RemoveParentInput
}
export interface AtlasMultiParentAddTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_AddTagsInput
}
export interface AtlasMultiParentRemoveTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_RemoveTagsInput
}
export interface AtlasMultiParentAddContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_AddContextDataInput
}
export interface AtlasMultiParentRemoveContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_RemoveContextDataInput
}
export interface AtlasMultiParentSetProvenanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetProvenanceInput
}
export interface AtlasMultiParentSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetNotionIdInput
}
export interface AtlasMultiParentAddReferenceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_AddReferenceInput
}
export interface AtlasMultiParentRemoveReferenceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_RemoveReferenceInput
}
export interface AtlasScopeCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasScopeSetScopeNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetScopeNameInput
}
export interface AtlasScopeSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetDocNumberInput
}
export interface AtlasScopeSetContentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetContentInput
}
export interface AtlasScopeSetMasterStatusArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetMasterStatusInput
}
export interface AtlasScopeAddTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_AddTagsInput
}
export interface AtlasScopeRemoveTagsArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_RemoveTagsInput
}
export interface AtlasScopeAddContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_AddContextDataInput
}
export interface AtlasScopeRemoveContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_RemoveContextDataInput
}
export interface AtlasScopeSetProvenanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetProvenanceInput
}
export interface AtlasScopeSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetNotionIdInput
}
export interface ForkAtlasArgs {
  driveId?: string
  docId?: PHID
}

// Input/Output Types

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasExploratory_AtlasExploratoryState
  state: AtlasExploratory_AtlasExploratoryState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_AddAdditionalGuidanceInput {
  additionalGuidance: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_AddContextDataInput {
  id: PHID
  name?: string
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_AddTagsInput {
  newTags: EGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_AtlasExploratoryState {
  name?: string
  docNo?: string
  parent: PHID
  atlasType: AtlasExploratory_EAtlasType
  content?: string
  masterStatus: AtlasExploratory_EStatus
  globalTags: AtlasExploratory_EGlobalTag[]
  references: PHID[]
  originalContextData: AtlasExploratory_DocumentInfo[]
  provenance?: URL
  notionId?: string
  findings: AtlasExploratory_Finding
  additionalGuidance: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_DocumentInfo {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_Finding {
  isAligned: boolean
  comment?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_RemoveAdditionalGuidanceInput {
  additionalGuidance: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_RemoveContextDataInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_RemoveParentInput {
  parent?: PHID[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_RemoveTagsInput {
  tags: EGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetAtlasTypeInput {
  atlasType: EAtlasType
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetContentInput {
  content: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetDocNumberInput {
  docNo: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetExploratoryNameInput {
  name: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetFindingsInput {
  isAligned: boolean
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetMasterStatusInput {
  masterStatus: EStatus
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetNotionIdInput {
  notionID?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetParentInput {
  parent?: PHID[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetProvenanceInput {
  provenance?: URL
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratoryQueries {
  getDocument?: AtlasExploratory
  getDocuments?: AtlasExploratory[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratoryState {
  name?: string
  docNo?: string
  parent: PHID
  atlasType: EAtlasType
  content?: string
  masterStatus: EStatus
  globalTags: EGlobalTag[]
  references: PHID[]
  originalContextData: DocumentInfo[]
  provenance?: URL
  notionId?: string
  findings: Finding
  additionalGuidance: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasFeedbackIssues_AtlasFeedbackIssuesState
  state: AtlasFeedbackIssues_AtlasFeedbackIssuesState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_AddNotionIdInput {
  phid: PHID
  notionId: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_AtlasFeedbackIssuesState {
  issues: AtlasFeedbackIssues_Issue[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_Comment {
  phid: PHID
  creatorAddress: EthereumAddress
  notionId: string
  content: string
  createdAt: DateTime
  lastEditedAt: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_CreateCommentInput {
  phid: PHID
  issuePhid: PHID
  notionId: string
  content: string
  createdAt: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_CreateIssueInput {
  phid: PHID
  notionIds: string[]
  createdAt: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_DeleteCommentInput {
  phid: PHID
  issuePhid: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_DeleteIssueInput {
  phid: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_EditCommentInput {
  phid: PHID
  issuePhid: PHID
  notionId?: string
  content?: string
  editedAt: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_Issue {
  phid: PHID
  creatorAddress: EthereumAddress
  notionIds: string[]
  createdAt: DateTime
  comments: AtlasFeedbackIssues_Comment[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssues_RemoveNotionIdInput {
  phid: PHID
  notionId: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssuesQueries {
  getDocument?: AtlasFeedbackIssues
  getDocuments?: AtlasFeedbackIssues[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFeedbackIssuesState {
  issues: Issue[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasFoundation_AtlasFoundationState
  state: AtlasFoundation_AtlasFoundationState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_AddContextDataInput {
  id: PHID
  name?: string
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_AddReferenceInput {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_AddTagsInput {
  tags: FGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_AtlasFoundationState {
  name?: string
  docNo?: string
  parent?: AtlasFoundation_FDocumentLink
  atlasType: AtlasFoundation_FAtlasType
  content?: string
  masterStatus: AtlasFoundation_FStatus
  globalTags: AtlasFoundation_FGlobalTag[]
  references: AtlasFoundation_FDocumentLink[]
  originalContextData: AtlasFoundation_FDocumentLink[]
  provenance: URL[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_FDocumentLink {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_RemoveContextDataInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_RemoveReferenceInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_RemoveTagsInput {
  tags: FGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetAtlasTypeInput {
  atlasType: FAtlasType
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetContentInput {
  content: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetDocNumberInput {
  docNo: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetFoundationNameInput {
  name: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetMasterStatusInput {
  masterStatus: FStatus
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetNotionIdInput {
  notionID: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetParentInput {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_SetProvenanceInput {
  provenance: URL[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundationQueries {
  getDocument?: AtlasFoundation
  getDocuments?: AtlasFoundation[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundationState {
  name?: string
  docNo?: string
  parent?: FDocumentLink
  atlasType: FAtlasType
  content?: string
  masterStatus: FStatus
  globalTags: FGlobalTag[]
  references: FDocumentLink[]
  originalContextData: FDocumentLink[]
  provenance: URL[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasGrounding_AtlasGroundingState
  state: AtlasGrounding_AtlasGroundingState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_AddContextDataInput {
  id: PHID
  name?: string
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_AddReferenceInput {
  id: PHID
  name?: string
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_AddTagsInput {
  tags: GGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_AtlasGroundingState {
  name?: string
  docNo?: string
  parent: AtlasGrounding_GDocumentLink
  atlasType: AtlasGrounding_GAtlasType
  content?: string
  masterStatus: AtlasGrounding_GStatus
  globalTags: AtlasGrounding_GGlobalTag[]
  references: AtlasGrounding_GDocumentLink[]
  originalContextData: AtlasGrounding_GDocumentLink[]
  provenance: URL[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_GDocumentLink {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_RemoveContextDataInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_RemoveReferenceInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_RemoveTagsInput {
  tags: GGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetAtlasTypeInput {
  atlasType: GAtlasType
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetContentInput {
  content: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetDocNumberInput {
  docNo: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetGroundingNameInput {
  name: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetMasterStatusInput {
  masterStatus: GStatus
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetNotionIdInput {
  notionID: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetParentInput {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_SetProvenanceInput {
  provenance: URL[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGroundingQueries {
  getDocument?: AtlasGrounding
  getDocuments?: AtlasGrounding[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGroundingState {
  name?: string
  docNo?: string
  parent: GDocumentLink
  atlasType: GAtlasType
  content?: string
  masterStatus: GStatus
  globalTags: GGlobalTag[]
  references: GDocumentLink[]
  originalContextData: GDocumentLink[]
  provenance: URL[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasMultiParent_AtlasMultiParentState
  state: AtlasMultiParent_AtlasMultiParentState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AddContextDataInput {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AddParentInput {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AddReferenceInput {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AddTagsInput {
  tags: MGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AtlasMultiParentState {
  name?: string
  docNo?: string
  parents: AtlasMultiParent_MDocumentLink[]
  atlasType: AtlasMultiParent_MAtlasType
  content?: string
  masterStatus: AtlasMultiParent_MStatus
  globalTags: AtlasMultiParent_MGlobalTag[]
  references: AtlasMultiParent_MDocumentLink[]
  originalContextData: AtlasMultiParent_MDocumentLink[]
  provenance: URL[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_MDocumentLink {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_RemoveContextDataInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_RemoveParentInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_RemoveReferenceInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_RemoveTagsInput {
  tags: MGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetAtlasTypeInput {
  atlasType: MAtlasType
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetContentInput {
  content: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetDocNumberInput {
  docNo: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetMasterStatusInput {
  masterStatus: MStatus
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetMultiparentNameInput {
  name: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetNotionIdInput {
  notionID: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetProvenanceInput {
  provenance: URL[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParentQueries {
  getDocument?: AtlasMultiParent
  getDocuments?: AtlasMultiParent[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParentState {
  name?: string
  docNo?: string
  parents: MDocumentLink[]
  atlasType: MAtlasType
  content?: string
  masterStatus: MStatus
  globalTags: MGlobalTag[]
  references: MDocumentLink[]
  originalContextData: MDocumentLink[]
  provenance: URL[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasScope_AtlasScopeState
  state: AtlasScope_AtlasScopeState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_AddContextDataInput {
  id: PHID
  name?: string
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_AddTagsInput {
  newTags: GlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_AtlasScopeState {
  name?: OLabel
  docNo?: string
  content?: string
  masterStatus?: AtlasScope_Status
  globalTags: AtlasScope_GlobalTag[]
  originalContextData: AtlasScope_DocumentInfo[]
  provenance?: URL
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_DocumentInfo {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_RemoveContextDataInput {
  id: PHID
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_RemoveTagsInput {
  tags: GlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_SetContentInput {
  content: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_SetDocNumberInput {
  docNo: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_SetMasterStatusInput {
  masterStatus: Status
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_SetNotionIdInput {
  notionID?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_SetProvenanceInput {
  provenance?: URL
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_SetScopeNameInput {
  name: OLabel
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScopeQueries {
  getDocument?: AtlasScope
  getDocuments?: AtlasScope[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScopeState {
  name?: OLabel
  docNo?: string
  content?: string
  masterStatus?: Status
  globalTags: GlobalTag[]
  originalContextData: DocumentInfo[]
  provenance?: URL
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Comment {
  phid: PHID
  creatorAddress: EthereumAddress
  notionId: string
  content: string
  createdAt: DateTime
  lastEditedAt: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: DocumentDrive_DocumentDriveState
  state: DocumentDrive_DocumentDriveState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_DocumentDriveState {
  id: ID
  name: string
  nodes: []
  icon?: string
  slug?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_FileNode {
  id: string
  name: string
  kind: string
  documentType: string
  parentFolder?: string
  synchronizationUnits: DocumentDrive_SynchronizationUnit[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_FolderNode {
  id: string
  name: string
  kind: string
  parentFolder?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_Listener {
  listenerId: ID
  label?: string
  block: boolean
  system: boolean
  filter: DocumentDrive_ListenerFilter
  callInfo?: DocumentDrive_ListenerCallInfo
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_ListenerCallInfo {
  transmitterType?: DocumentDrive_TransmitterType
  name?: string
  data?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_ListenerFilter {
  documentType: string[]
  documentId?: ID[]
  scope?: string[]
  branch?: string[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_PullResponderTriggerData {
  listenerId: ID
  url: string
  interval: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_SynchronizationUnit {
  syncId: ID
  scope: string
  branch: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDrive_Trigger {
  id: ID
  type: DocumentDrive_TriggerType
  data: false
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentDriveLocalState {
  sharingType?: string
  listeners: DocumentDrive_Listener[]
  triggers: DocumentDrive_Trigger[]
  availableOffline: boolean
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentInfo {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentModel {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface FDocumentLink {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Finding {
  isAligned: boolean
  comment?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface GDocumentLink {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Issue {
  phid: PHID
  creatorAddress: EthereumAddress
  notionIds: string[]
  createdAt: DateTime
  comments: Comment[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface MDocumentLink {
  id: PHID
  name?: OLabel
  docNo?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Mutation {
  AtlasExploratory_createDocument?: string
  AtlasExploratory_setExploratoryName?: number
  AtlasExploratory_setDocNumber?: number
  AtlasExploratory_setContent?: number
  AtlasExploratory_setMasterStatus?: number
  AtlasExploratory_setParent?: number
  AtlasExploratory_removeParent?: number
  AtlasExploratory_setAtlasType?: number
  AtlasExploratory_setFindings?: number
  AtlasExploratory_addTags?: number
  AtlasExploratory_removeTags?: number
  AtlasExploratory_addContextData?: number
  AtlasExploratory_removeContextData?: number
  AtlasExploratory_setProvenance?: number
  AtlasExploratory_setNotionId?: number
  AtlasExploratory_addAdditionalGuidance?: number
  AtlasExploratory_removeAdditionalGuidance?: number
  AtlasFeedbackIssues_createDocument?: string
  AtlasFeedbackIssues_createIssue?: number
  AtlasFeedbackIssues_deleteIssue?: number
  AtlasFeedbackIssues_addNotionId?: number
  AtlasFeedbackIssues_removeNotionId?: number
  AtlasFeedbackIssues_createComment?: number
  AtlasFeedbackIssues_deleteComment?: number
  AtlasFeedbackIssues_editComment?: number
  AtlasFoundation_createDocument?: string
  AtlasFoundation_setFoundationName?: number
  AtlasFoundation_setDocNumber?: number
  AtlasFoundation_setContent?: number
  AtlasFoundation_setMasterStatus?: number
  AtlasFoundation_addReference?: number
  AtlasFoundation_setAtlasType?: number
  AtlasFoundation_removeReference?: number
  AtlasFoundation_setParent?: number
  AtlasFoundation_addTags?: number
  AtlasFoundation_removeTags?: number
  AtlasFoundation_addContextData?: number
  AtlasFoundation_removeContextData?: number
  AtlasFoundation_setProvenance?: number
  AtlasFoundation_setNotionId?: number
  AtlasGrounding_createDocument?: string
  AtlasGrounding_setGroundingName?: number
  AtlasGrounding_setDocNumber?: number
  AtlasGrounding_setContent?: number
  AtlasGrounding_setMasterStatus?: number
  AtlasGrounding_setAtlasType?: number
  AtlasGrounding_setParent?: number
  AtlasGrounding_addTags?: number
  AtlasGrounding_removeTags?: number
  AtlasGrounding_addContextData?: number
  AtlasGrounding_removeContextData?: number
  AtlasGrounding_setProvenance?: number
  AtlasGrounding_setNotionId?: number
  AtlasGrounding_addReference?: number
  AtlasGrounding_removeReference?: number
  AtlasMultiParent_createDocument?: string
  AtlasMultiParent_setMultiparentName?: number
  AtlasMultiParent_setDocNumber?: number
  AtlasMultiParent_setContent?: number
  AtlasMultiParent_setMasterStatus?: number
  AtlasMultiParent_addParent?: number
  AtlasMultiParent_setAtlasType?: number
  AtlasMultiParent_removeParent?: number
  AtlasMultiParent_addTags?: number
  AtlasMultiParent_removeTags?: number
  AtlasMultiParent_addContextData?: number
  AtlasMultiParent_removeContextData?: number
  AtlasMultiParent_setProvenance?: number
  AtlasMultiParent_setNotionId?: number
  AtlasMultiParent_addReference?: number
  AtlasMultiParent_removeReference?: number
  AtlasScope_createDocument?: string
  AtlasScope_setScopeName?: number
  AtlasScope_setDocNumber?: number
  AtlasScope_setContent?: number
  AtlasScope_setMasterStatus?: number
  AtlasScope_addTags?: number
  AtlasScope_removeTags?: number
  AtlasScope_addContextData?: number
  AtlasScope_removeContextData?: number
  AtlasScope_setProvenance?: number
  AtlasScope_setNotionId?: number
  ForkAtlas?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Operation {
  id: string
  type: string
  index: number
  timestamp: DateTime
  hash: string
  skip?: number
  inputText?: string
  error?: string
  context?: PHOperationContext
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface PHOperationContext {
  signer?: Signer
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Query {
  AtlasExploratory?: AtlasExploratoryQueries
  AtlasFeedbackIssues?: AtlasFeedbackIssuesQueries
  AtlasFoundation?: AtlasFoundationQueries
  AtlasGrounding?: AtlasGroundingQueries
  AtlasMultiParent?: AtlasMultiParentQueries
  AtlasScope?: AtlasScopeQueries
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Signer {
  user?: SignerUser
  app?: SignerApp
  signatures: string[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface SignerApp {
  name: string
  key: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface SignerUser {
  address: string
  networkId: string
  chainId: number
}

// Selection Types

export interface AtlasExploratorySelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: AtlasExploratory_AtlasExploratoryStateSelection
  state?: AtlasExploratory_AtlasExploratoryStateSelection
  stateJSON?: boolean
}

export interface AtlasExploratory_AddAdditionalGuidanceInputSelection {
  additionalGuidance?: boolean
}

export interface AtlasExploratory_AddContextDataInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasExploratory_AddTagsInputSelection {
  newTags?: boolean
}

export interface AtlasExploratory_AtlasExploratoryStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: boolean
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: boolean
  originalContextData?: AtlasExploratory_DocumentInfoSelection
  provenance?: boolean
  notionId?: boolean
  findings?: AtlasExploratory_FindingSelection
  additionalGuidance?: boolean
}

export interface AtlasExploratory_DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasExploratory_FindingSelection {
  isAligned?: boolean
  comment?: boolean
}

export interface AtlasExploratory_RemoveAdditionalGuidanceInputSelection {
  additionalGuidance?: boolean
}

export interface AtlasExploratory_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasExploratory_RemoveParentInputSelection {
  parent?: boolean
}

export interface AtlasExploratory_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasExploratory_SetAtlasTypeInputSelection {
  atlasType?: boolean
}

export interface AtlasExploratory_SetContentInputSelection {
  content?: boolean
}

export interface AtlasExploratory_SetDocNumberInputSelection {
  docNo?: boolean
}

export interface AtlasExploratory_SetExploratoryNameInputSelection {
  name?: boolean
}

export interface AtlasExploratory_SetFindingsInputSelection {
  isAligned?: boolean
}

export interface AtlasExploratory_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasExploratory_SetNotionIdInputSelection {
  notionID?: boolean
}

export interface AtlasExploratory_SetParentInputSelection {
  parent?: boolean
}

export interface AtlasExploratory_SetProvenanceInputSelection {
  provenance?: boolean
}

export interface AtlasExploratoryQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasExploratorySelection
  getDocuments?: AtlasExploratorySelection
}

export interface AtlasExploratoryStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: boolean
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: boolean
  originalContextData?: DocumentInfoSelection
  provenance?: boolean
  notionId?: boolean
  findings?: FindingSelection
  additionalGuidance?: boolean
}

export interface AtlasFeedbackIssuesSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: AtlasFeedbackIssues_AtlasFeedbackIssuesStateSelection
  state?: AtlasFeedbackIssues_AtlasFeedbackIssuesStateSelection
  stateJSON?: boolean
}

export interface AtlasFeedbackIssues_AddNotionIdInputSelection {
  phid?: boolean
  notionId?: boolean
}

export interface AtlasFeedbackIssues_AtlasFeedbackIssuesStateSelection {
  issues?: AtlasFeedbackIssues_IssueSelection
}

export interface AtlasFeedbackIssues_CommentSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionId?: boolean
  content?: boolean
  createdAt?: boolean
  lastEditedAt?: boolean
}

export interface AtlasFeedbackIssues_CreateCommentInputSelection {
  phid?: boolean
  issuePhid?: boolean
  notionId?: boolean
  content?: boolean
  createdAt?: boolean
}

export interface AtlasFeedbackIssues_CreateIssueInputSelection {
  phid?: boolean
  notionIds?: boolean
  createdAt?: boolean
}

export interface AtlasFeedbackIssues_DeleteCommentInputSelection {
  phid?: boolean
  issuePhid?: boolean
}

export interface AtlasFeedbackIssues_DeleteIssueInputSelection {
  phid?: boolean
}

export interface AtlasFeedbackIssues_EditCommentInputSelection {
  phid?: boolean
  issuePhid?: boolean
  notionId?: boolean
  content?: boolean
  editedAt?: boolean
}

export interface AtlasFeedbackIssues_IssueSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionIds?: boolean
  createdAt?: boolean
  comments?: AtlasFeedbackIssues_CommentSelection
}

export interface AtlasFeedbackIssues_RemoveNotionIdInputSelection {
  phid?: boolean
  notionId?: boolean
}

export interface AtlasFeedbackIssuesQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasFeedbackIssuesSelection
  getDocuments?: AtlasFeedbackIssuesSelection
}

export interface AtlasFeedbackIssuesStateSelection {
  issues?: IssueSelection
}

export interface AtlasFoundationSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: AtlasFoundation_AtlasFoundationStateSelection
  state?: AtlasFoundation_AtlasFoundationStateSelection
  stateJSON?: boolean
}

export interface AtlasFoundation_AddContextDataInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasFoundation_AddReferenceInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasFoundation_AddTagsInputSelection {
  tags?: boolean
}

export interface AtlasFoundation_AtlasFoundationStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: AtlasFoundation_FDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: AtlasFoundation_FDocumentLinkSelection
  originalContextData?: AtlasFoundation_FDocumentLinkSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasFoundation_FDocumentLinkSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasFoundation_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasFoundation_RemoveReferenceInputSelection {
  id?: boolean
}

export interface AtlasFoundation_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasFoundation_SetAtlasTypeInputSelection {
  atlasType?: boolean
}

export interface AtlasFoundation_SetContentInputSelection {
  content?: boolean
}

export interface AtlasFoundation_SetDocNumberInputSelection {
  docNo?: boolean
}

export interface AtlasFoundation_SetFoundationNameInputSelection {
  name?: boolean
}

export interface AtlasFoundation_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasFoundation_SetNotionIdInputSelection {
  notionID?: boolean
}

export interface AtlasFoundation_SetParentInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasFoundation_SetProvenanceInputSelection {
  provenance?: boolean
}

export interface AtlasFoundationQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasFoundationSelection
  getDocuments?: AtlasFoundationSelection
}

export interface AtlasFoundationStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: FDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: FDocumentLinkSelection
  originalContextData?: FDocumentLinkSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasGroundingSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: AtlasGrounding_AtlasGroundingStateSelection
  state?: AtlasGrounding_AtlasGroundingStateSelection
  stateJSON?: boolean
}

export interface AtlasGrounding_AddContextDataInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasGrounding_AddReferenceInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasGrounding_AddTagsInputSelection {
  tags?: boolean
}

export interface AtlasGrounding_AtlasGroundingStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: AtlasGrounding_GDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: AtlasGrounding_GDocumentLinkSelection
  originalContextData?: AtlasGrounding_GDocumentLinkSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasGrounding_GDocumentLinkSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasGrounding_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasGrounding_RemoveReferenceInputSelection {
  id?: boolean
}

export interface AtlasGrounding_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasGrounding_SetAtlasTypeInputSelection {
  atlasType?: boolean
}

export interface AtlasGrounding_SetContentInputSelection {
  content?: boolean
}

export interface AtlasGrounding_SetDocNumberInputSelection {
  docNo?: boolean
}

export interface AtlasGrounding_SetGroundingNameInputSelection {
  name?: boolean
}

export interface AtlasGrounding_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasGrounding_SetNotionIdInputSelection {
  notionID?: boolean
}

export interface AtlasGrounding_SetParentInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasGrounding_SetProvenanceInputSelection {
  provenance?: boolean
}

export interface AtlasGroundingQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasGroundingSelection
  getDocuments?: AtlasGroundingSelection
}

export interface AtlasGroundingStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: GDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: GDocumentLinkSelection
  originalContextData?: GDocumentLinkSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasMultiParentSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: AtlasMultiParent_AtlasMultiParentStateSelection
  state?: AtlasMultiParent_AtlasMultiParentStateSelection
  stateJSON?: boolean
}

export interface AtlasMultiParent_AddContextDataInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasMultiParent_AddParentInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasMultiParent_AddReferenceInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasMultiParent_AddTagsInputSelection {
  tags?: boolean
}

export interface AtlasMultiParent_AtlasMultiParentStateSelection {
  name?: boolean
  docNo?: boolean
  parents?: AtlasMultiParent_MDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: AtlasMultiParent_MDocumentLinkSelection
  originalContextData?: AtlasMultiParent_MDocumentLinkSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasMultiParent_MDocumentLinkSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasMultiParent_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasMultiParent_RemoveParentInputSelection {
  id?: boolean
}

export interface AtlasMultiParent_RemoveReferenceInputSelection {
  id?: boolean
}

export interface AtlasMultiParent_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasMultiParent_SetAtlasTypeInputSelection {
  atlasType?: boolean
}

export interface AtlasMultiParent_SetContentInputSelection {
  content?: boolean
}

export interface AtlasMultiParent_SetDocNumberInputSelection {
  docNo?: boolean
}

export interface AtlasMultiParent_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasMultiParent_SetMultiparentNameInputSelection {
  name?: boolean
}

export interface AtlasMultiParent_SetNotionIdInputSelection {
  notionID?: boolean
}

export interface AtlasMultiParent_SetProvenanceInputSelection {
  provenance?: boolean
}

export interface AtlasMultiParentQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasMultiParentSelection
  getDocuments?: AtlasMultiParentSelection
}

export interface AtlasMultiParentStateSelection {
  name?: boolean
  docNo?: boolean
  parents?: MDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: MDocumentLinkSelection
  originalContextData?: MDocumentLinkSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasScopeSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: AtlasScope_AtlasScopeStateSelection
  state?: AtlasScope_AtlasScopeStateSelection
  stateJSON?: boolean
}

export interface AtlasScope_AddContextDataInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasScope_AddTagsInputSelection {
  newTags?: boolean
}

export interface AtlasScope_AtlasScopeStateSelection {
  name?: boolean
  docNo?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: AtlasScope_DocumentInfoSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasScope_DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasScope_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasScope_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasScope_SetContentInputSelection {
  content?: boolean
}

export interface AtlasScope_SetDocNumberInputSelection {
  docNo?: boolean
}

export interface AtlasScope_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasScope_SetNotionIdInputSelection {
  notionID?: boolean
}

export interface AtlasScope_SetProvenanceInputSelection {
  provenance?: boolean
}

export interface AtlasScope_SetScopeNameInputSelection {
  name?: boolean
}

export interface AtlasScopeQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasScopeSelection
  getDocuments?: AtlasScopeSelection
}

export interface AtlasScopeStateSelection {
  name?: boolean
  docNo?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: DocumentInfoSelection
  provenance?: boolean
  notionId?: boolean
}

export interface CommentSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionId?: boolean
  content?: boolean
  createdAt?: boolean
  lastEditedAt?: boolean
}

export interface DocumentDriveSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  initialState?: DocumentDrive_DocumentDriveStateSelection
  state?: DocumentDrive_DocumentDriveStateSelection
  stateJSON?: boolean
}

export interface DocumentDrive_DocumentDriveStateSelection {
  id?: boolean
  name?: boolean
  nodes?: boolean
  icon?: boolean
  slug?: boolean
}

export interface DocumentDrive_FileNodeSelection {
  id?: boolean
  name?: boolean
  kind?: boolean
  documentType?: boolean
  parentFolder?: boolean
  synchronizationUnits?: DocumentDrive_SynchronizationUnitSelection
}

export interface DocumentDrive_FolderNodeSelection {
  id?: boolean
  name?: boolean
  kind?: boolean
  parentFolder?: boolean
}

export interface DocumentDrive_ListenerSelection {
  listenerId?: boolean
  label?: boolean
  block?: boolean
  system?: boolean
  filter?: DocumentDrive_ListenerFilterSelection
  callInfo?: DocumentDrive_ListenerCallInfoSelection
}

export interface DocumentDrive_ListenerCallInfoSelection {
  transmitterType?: boolean
  name?: boolean
  data?: boolean
}

export interface DocumentDrive_ListenerFilterSelection {
  documentType?: boolean
  documentId?: boolean
  scope?: boolean
  branch?: boolean
}

export interface DocumentDrive_PullResponderTriggerDataSelection {
  listenerId?: boolean
  url?: boolean
  interval?: boolean
}

export interface DocumentDrive_SynchronizationUnitSelection {
  syncId?: boolean
  scope?: boolean
  branch?: boolean
}

export interface DocumentDrive_TriggerSelection {
  id?: boolean
  type?: boolean
  data?: boolean
}

export interface DocumentDriveLocalStateSelection {
  sharingType?: boolean
  listeners?: DocumentDrive_ListenerSelection
  triggers?: DocumentDrive_TriggerSelection
  availableOffline?: boolean
}

export interface DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface DocumentModelSelection {
  id?: boolean
  name?: boolean
  documentType?: boolean
  operations?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { skip?: number; first?: number }
  } & OperationSelection
  revision?: boolean
  created?: boolean
  lastModified?: boolean
  stateJSON?: boolean
}

export interface FDocumentLinkSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface FindingSelection {
  isAligned?: boolean
  comment?: boolean
}

export interface GDocumentLinkSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface IssueSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionIds?: boolean
  createdAt?: boolean
  comments?: CommentSelection
}

export interface MDocumentLinkSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface MutationSelection {
  AtlasExploratory_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasExploratory_setExploratoryName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetExploratoryNameInput
    }
  }
  AtlasExploratory_setDocNumber?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetDocNumberInput
    }
  }
  AtlasExploratory_setContent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetContentInput
    }
  }
  AtlasExploratory_setMasterStatus?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetMasterStatusInput
    }
  }
  AtlasExploratory_setParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetParentInput
    }
  }
  AtlasExploratory_removeParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_RemoveParentInput
    }
  }
  AtlasExploratory_setAtlasType?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetAtlasTypeInput
    }
  }
  AtlasExploratory_setFindings?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetFindingsInput
    }
  }
  AtlasExploratory_addTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_AddTagsInput
    }
  }
  AtlasExploratory_removeTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_RemoveTagsInput
    }
  }
  AtlasExploratory_addContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_AddContextDataInput
    }
  }
  AtlasExploratory_removeContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_RemoveContextDataInput
    }
  }
  AtlasExploratory_setProvenance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetProvenanceInput
    }
  }
  AtlasExploratory_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetNotionIdInput
    }
  }
  AtlasExploratory_addAdditionalGuidance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_AddAdditionalGuidanceInput
    }
  }
  AtlasExploratory_removeAdditionalGuidance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_RemoveAdditionalGuidanceInput
    }
  }
  AtlasFeedbackIssues_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasFeedbackIssues_createIssue?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_CreateIssueInput
    }
  }
  AtlasFeedbackIssues_deleteIssue?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_DeleteIssueInput
    }
  }
  AtlasFeedbackIssues_addNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_AddNotionIdInput
    }
  }
  AtlasFeedbackIssues_removeNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_RemoveNotionIdInput
    }
  }
  AtlasFeedbackIssues_createComment?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_CreateCommentInput
    }
  }
  AtlasFeedbackIssues_deleteComment?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_DeleteCommentInput
    }
  }
  AtlasFeedbackIssues_editComment?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFeedbackIssues_EditCommentInput
    }
  }
  AtlasFoundation_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasFoundation_setFoundationName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetFoundationNameInput
    }
  }
  AtlasFoundation_setDocNumber?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetDocNumberInput
    }
  }
  AtlasFoundation_setContent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetContentInput
    }
  }
  AtlasFoundation_setMasterStatus?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetMasterStatusInput
    }
  }
  AtlasFoundation_addReference?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_AddReferenceInput
    }
  }
  AtlasFoundation_setAtlasType?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetAtlasTypeInput
    }
  }
  AtlasFoundation_removeReference?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_RemoveReferenceInput
    }
  }
  AtlasFoundation_setParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetParentInput
    }
  }
  AtlasFoundation_addTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_AddTagsInput
    }
  }
  AtlasFoundation_removeTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_RemoveTagsInput
    }
  }
  AtlasFoundation_addContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_AddContextDataInput
    }
  }
  AtlasFoundation_removeContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_RemoveContextDataInput
    }
  }
  AtlasFoundation_setProvenance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetProvenanceInput
    }
  }
  AtlasFoundation_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_SetNotionIdInput
    }
  }
  AtlasGrounding_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasGrounding_setGroundingName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetGroundingNameInput
    }
  }
  AtlasGrounding_setDocNumber?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetDocNumberInput
    }
  }
  AtlasGrounding_setContent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetContentInput
    }
  }
  AtlasGrounding_setMasterStatus?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetMasterStatusInput
    }
  }
  AtlasGrounding_setAtlasType?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetAtlasTypeInput
    }
  }
  AtlasGrounding_setParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetParentInput
    }
  }
  AtlasGrounding_addTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_AddTagsInput
    }
  }
  AtlasGrounding_removeTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_RemoveTagsInput
    }
  }
  AtlasGrounding_addContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_AddContextDataInput
    }
  }
  AtlasGrounding_removeContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_RemoveContextDataInput
    }
  }
  AtlasGrounding_setProvenance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetProvenanceInput
    }
  }
  AtlasGrounding_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_SetNotionIdInput
    }
  }
  AtlasGrounding_addReference?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_AddReferenceInput
    }
  }
  AtlasGrounding_removeReference?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_RemoveReferenceInput
    }
  }
  AtlasMultiParent_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasMultiParent_setMultiparentName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetMultiparentNameInput
    }
  }
  AtlasMultiParent_setDocNumber?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetDocNumberInput
    }
  }
  AtlasMultiParent_setContent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetContentInput
    }
  }
  AtlasMultiParent_setMasterStatus?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetMasterStatusInput
    }
  }
  AtlasMultiParent_addParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_AddParentInput
    }
  }
  AtlasMultiParent_setAtlasType?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetAtlasTypeInput
    }
  }
  AtlasMultiParent_removeParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_RemoveParentInput
    }
  }
  AtlasMultiParent_addTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_AddTagsInput
    }
  }
  AtlasMultiParent_removeTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_RemoveTagsInput
    }
  }
  AtlasMultiParent_addContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_AddContextDataInput
    }
  }
  AtlasMultiParent_removeContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_RemoveContextDataInput
    }
  }
  AtlasMultiParent_setProvenance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetProvenanceInput
    }
  }
  AtlasMultiParent_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetNotionIdInput
    }
  }
  AtlasMultiParent_addReference?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_AddReferenceInput
    }
  }
  AtlasMultiParent_removeReference?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_RemoveReferenceInput
    }
  }
  AtlasScope_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasScope_setScopeName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_SetScopeNameInput
    }
  }
  AtlasScope_setDocNumber?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_SetDocNumberInput
    }
  }
  AtlasScope_setContent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_SetContentInput
    }
  }
  AtlasScope_setMasterStatus?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_SetMasterStatusInput
    }
  }
  AtlasScope_addTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID; input?: AtlasScope_AddTagsInput }
  }
  AtlasScope_removeTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_RemoveTagsInput
    }
  }
  AtlasScope_addContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_AddContextDataInput
    }
  }
  AtlasScope_removeContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_RemoveContextDataInput
    }
  }
  AtlasScope_setProvenance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_SetProvenanceInput
    }
  }
  AtlasScope_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_SetNotionIdInput
    }
  }
  ForkAtlas?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  }
}

export interface OperationSelection {
  id?: boolean
  type?: boolean
  index?: boolean
  timestamp?: boolean
  hash?: boolean
  skip?: boolean
  inputText?: boolean
  error?: boolean
  context?: PHOperationContextSelection
}

export interface PHOperationContextSelection {
  signer?: SignerSelection
}

export interface SignerSelection {
  user?: SignerUserSelection
  app?: SignerAppSelection
  signatures?: boolean
}

export interface SignerAppSelection {
  name?: boolean
  key?: boolean
}

export interface SignerUserSelection {
  address?: boolean
  networkId?: boolean
  chainId?: boolean
}

export declare const client: {
  addResponseListener: (listener: IResponseListener) => void
  setHeader: (key: string, value: string) => void
  setHeaders: (newHeaders: { [k: string]: string }) => void
  setUrl: (url: string) => void
  setRetryConfig: (options: {
    max: number
    waitBeforeRetry?: number
    before?: IResponseListener
  }) => void
  queries: {
    AtlasExploratory: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasExploratoryQueriesSelection,
      DeepRequired<AtlasExploratoryQueries>,
      AllEnums
    >
    AtlasFeedbackIssues: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasFeedbackIssuesQueriesSelection,
      DeepRequired<AtlasFeedbackIssuesQueries>,
      AllEnums
    >
    AtlasFoundation: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasFoundationQueriesSelection,
      DeepRequired<AtlasFoundationQueries>,
      AllEnums
    >
    AtlasGrounding: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasGroundingQueriesSelection,
      DeepRequired<AtlasGroundingQueries>,
      AllEnums
    >
    AtlasMultiParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasMultiParentQueriesSelection,
      DeepRequired<AtlasMultiParentQueries>,
      AllEnums
    >
    AtlasScope: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasScopeQueriesSelection,
      DeepRequired<AtlasScopeQueries>,
      AllEnums
    >
  }
  mutations: {
    AtlasExploratory_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasExploratory_setExploratoryName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetExploratoryNameArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setDocNumber: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetDocNumberArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setContent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetContentArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setMasterStatus: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetMasterStatusArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetParentArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_removeParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryRemoveParentArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setAtlasType: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetAtlasTypeArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setFindings: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetFindingsArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_addTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryAddTagsArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_removeTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryRemoveTagsArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_addContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryAddContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_removeContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryRemoveContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setProvenance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetProvenanceArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_setNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetNotionIdArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_addAdditionalGuidance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryAddAdditionalGuidanceArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_removeAdditionalGuidance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryRemoveAdditionalGuidanceArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasFeedbackIssues_createIssue: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesCreateIssueArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_deleteIssue: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesDeleteIssueArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_addNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesAddNotionIdArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_removeNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesRemoveNotionIdArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_createComment: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesCreateCommentArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_deleteComment: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesDeleteCommentArgs
      },
      number,
      AllEnums
    >
    AtlasFeedbackIssues_editComment: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFeedbackIssuesEditCommentArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasFoundation_setFoundationName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetFoundationNameArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setDocNumber: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetDocNumberArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setContent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetContentArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setMasterStatus: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetMasterStatusArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_addReference: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationAddReferenceArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setAtlasType: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetAtlasTypeArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_removeReference: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationRemoveReferenceArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetParentArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_addTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationAddTagsArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_removeTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationRemoveTagsArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_addContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationAddContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_removeContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationRemoveContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setProvenance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetProvenanceArgs
      },
      number,
      AllEnums
    >
    AtlasFoundation_setNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationSetNotionIdArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasGrounding_setGroundingName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetGroundingNameArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setDocNumber: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetDocNumberArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setContent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetContentArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setMasterStatus: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetMasterStatusArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setAtlasType: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetAtlasTypeArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetParentArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_addTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingAddTagsArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_removeTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingRemoveTagsArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_addContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingAddContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_removeContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingRemoveContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setProvenance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetProvenanceArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_setNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingSetNotionIdArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_addReference: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingAddReferenceArgs
      },
      number,
      AllEnums
    >
    AtlasGrounding_removeReference: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingRemoveReferenceArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasMultiParent_setMultiparentName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetMultiparentNameArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_setDocNumber: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetDocNumberArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_setContent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetContentArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_setMasterStatus: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetMasterStatusArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_addParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentAddParentArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_setAtlasType: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetAtlasTypeArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_removeParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentRemoveParentArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_addTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentAddTagsArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_removeTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentRemoveTagsArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_addContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentAddContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_removeContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentRemoveContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_setProvenance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetProvenanceArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_setNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetNotionIdArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_addReference: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentAddReferenceArgs
      },
      number,
      AllEnums
    >
    AtlasMultiParent_removeReference: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentRemoveReferenceArgs
      },
      number,
      AllEnums
    >
    AtlasScope_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasScope_setScopeName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeSetScopeNameArgs
      },
      number,
      AllEnums
    >
    AtlasScope_setDocNumber: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeSetDocNumberArgs
      },
      number,
      AllEnums
    >
    AtlasScope_setContent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeSetContentArgs
      },
      number,
      AllEnums
    >
    AtlasScope_setMasterStatus: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeSetMasterStatusArgs
      },
      number,
      AllEnums
    >
    AtlasScope_addTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeAddTagsArgs
      },
      number,
      AllEnums
    >
    AtlasScope_removeTags: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeRemoveTagsArgs
      },
      number,
      AllEnums
    >
    AtlasScope_addContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeAddContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasScope_removeContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeRemoveContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasScope_setProvenance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeSetProvenanceArgs
      },
      number,
      AllEnums
    >
    AtlasScope_setNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeSetNotionIdArgs
      },
      number,
      AllEnums
    >
    ForkAtlas: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: ForkAtlasArgs
      },
      string,
      AllEnums
    >
  }
}

export default client
