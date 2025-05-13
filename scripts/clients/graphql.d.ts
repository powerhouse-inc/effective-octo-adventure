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

export declare enum AnalyticsGranularity {
  annual = "annual",
  daily = "daily",
  hourly = "hourly",
  monthly = "monthly",
  quarterly = "quarterly",
  semiAnnual = "semiAnnual",
  total = "total",
  weekly = "weekly",
}

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
  | AnalyticsGranularity
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
export interface AnalyticsArgs {}
export interface AtlasExploratoryArgs {}
export interface AtlasFeedbackIssuesArgs {}
export interface AtlasFoundationArgs {}
export interface AtlasGroundingArgs {}
export interface AtlasMultiParentArgs {}
export interface AtlasScopeArgs {}
export interface AtlasSetArgs {}
export interface MeArgs {}
export interface SessionsArgs {}
export interface DrivesArgs {}
export interface DriveIdBySlugArgs {
  slug: string
}
export interface AtlasExploratoryCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasExploratorySetExploratoryNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetExploratoryNameInput
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
export interface AtlasExploratorySetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetDocNumberInput
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
export interface AtlasExploratorySetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetNotionIdInput
}
export interface AtlasExploratorySetAdditionalGuidanceArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_SetAdditionalGuidanceInput
}
export interface AtlasExploratoryReplaceContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasExploratory_ReplaceContextDataInput
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
export interface AtlasFoundationSetAtlasTypeArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetAtlasTypeInput
}
export interface AtlasFoundationSetParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetParentInput
}
export interface AtlasFoundationSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetDocNumberInput
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
export interface AtlasFoundationSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_SetNotionIdInput
}
export interface AtlasFoundationReplaceContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasFoundation_ReplaceContextDataInput
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
export interface AtlasGroundingSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetDocNumberInput
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
export interface AtlasGroundingSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_SetNotionIdInput
}
export interface AtlasGroundingReplaceContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasGrounding_ReplaceContextDataInput
}
export interface AtlasMultiParentCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasMultiParentSetExploratoryNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetExploratoryNameInput
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
export interface AtlasMultiParentReplaceParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_ReplaceParentInput
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
export interface AtlasMultiParentReplaceContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_ReplaceContextDataInput
}
export interface AtlasMultiParentSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasMultiParent_SetNotionIdInput
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
export interface AtlasScopeSetDocNumberArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetDocNumberInput
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
export interface AtlasScopeSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_SetNotionIdInput
}
export interface AtlasScopeReplaceContextDataArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasScope_ReplaceContextDataInput
}
export interface AtlasSetCreateDocumentArgs {
  driveId?: string
  name?: string
}
export interface AtlasSetSetSetNameArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasSet_SetSetNameInput
}
export interface AtlasSetSetSetParentArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasSet_SetSetParentInput
}
export interface AtlasSetSetNotionIdArgs {
  driveId?: string
  docId?: PHID
  input?: AtlasSet_SetNotionIdInput
}
export interface CreateChallengeArgs {
  address: string
}
export interface SolveChallengeArgs {
  nonce: string
  signature: string
}
export interface CreateSessionArgs {
  session: SessionInput
}
export interface RevokeSessionArgs {
  sessionId: string
}
export interface ForkAtlasArgs {
  driveId?: string
  docId?: PHID
}
export interface AddDriveArgs {
  global: DocumentDriveStateInput
  preferredEditor?: string
}
export interface SetDriveIconArgs {
  id: string
  icon: string
}
export interface SetDriveNameArgs {
  id: string
  name: string
}

// Input/Output Types

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AnalyticsFilter {
  start?: string
  end?: string
  granularity?: AnalyticsGranularity
  metrics?: string[]
  dimensions?: AnalyticsFilterDimension[]
  currency?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AnalyticsFilterDimension {
  name: string
  select: string
  lod: number
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AnalyticsPeriod {
  period?: string
  start?: DateTime
  end?: DateTime
  rows?: AnalyticsSeries[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AnalyticsQuery {
  series?: AnalyticsPeriod[]
  multiCurrencySeries?: AnalyticsPeriod[]
  metrics?: string[]
  dimensions?: Dimension[]
  currencies?: string[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AnalyticsSeries {
  dimensions?: AnalyticsSeriesDimension[]
  metric?: string
  unit?: string
  value?: number
  sum?: number
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AnalyticsSeriesDimension {
  name?: string
  path?: string
  label?: string
  description?: string
  icon?: string
}

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

export interface AtlasExploratory_AddContextDataInput {
  id: PHID
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: string
  parent: AtlasExploratory_EDocumentLink
  atlasType: AtlasExploratory_EAtlasType
  content?: string
  masterStatus: AtlasExploratory_EStatus
  globalTags: AtlasExploratory_EGlobalTag[]
  originalContextData: AtlasExploratory_EDocumentLink[]
  notionId?: string
  findings: AtlasExploratory_Finding
  additionalGuidance: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_EDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_Finding {
  isAligned: boolean
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

export interface AtlasExploratory_RemoveTagsInput {
  tags: EGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_ReplaceContextDataInput {
  prevId: PHID
  id: PHID
  title?: string
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasExploratory_SetAdditionalGuidanceInput {
  additionalGuidance: string
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
  docNo?: string
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
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: string
  parent: EDocumentLink
  atlasType: EAtlasType
  content?: string
  masterStatus: EStatus
  globalTags: EGlobalTag[]
  originalContextData: EDocumentLink[]
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
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: string
  parent?: AtlasFoundation_FDocumentLink
  atlasType: AtlasFoundation_FAtlasType
  content?: string
  masterStatus: AtlasFoundation_FStatus
  globalTags: AtlasFoundation_FGlobalTag[]
  originalContextData: AtlasFoundation_FDocumentLink[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_FDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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

export interface AtlasFoundation_RemoveTagsInput {
  tags: FGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasFoundation_ReplaceContextDataInput {
  prevId: PHID
  id: PHID
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
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
  title?: OLabel
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: string
  parent?: FDocumentLink
  atlasType: FAtlasType
  content?: string
  masterStatus: FStatus
  globalTags: FGlobalTag[]
  originalContextData: FDocumentLink[]
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
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: string
  parent: AtlasGrounding_GDocumentLink
  atlasType: AtlasGrounding_GAtlasType
  content?: string
  masterStatus: AtlasGrounding_GStatus
  globalTags: AtlasGrounding_GGlobalTag[]
  originalContextData: AtlasGrounding_GDocumentLink[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_GDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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

export interface AtlasGrounding_RemoveTagsInput {
  tags: GGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_ReplaceContextDataInput {
  prevId: PHID
  id: PHID
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
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
  title?: OLabel
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: string
  parent: GDocumentLink
  atlasType: GAtlasType
  content?: string
  masterStatus: GStatus
  globalTags: GGlobalTag[]
  originalContextData: GDocumentLink[]
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
  title?: OLabel
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AddParentInput {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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
  parents: AtlasMultiParent_MDocumentLink[]
  atlasType: AtlasMultiParent_MAtlasType
  content?: string
  masterStatus: AtlasMultiParent_MStatus
  globalTags: AtlasMultiParent_MGlobalTag[]
  originalContextData: AtlasMultiParent_MDocumentLink[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_MDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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

export interface AtlasMultiParent_RemoveTagsInput {
  tags: MGlobalTag[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_ReplaceContextDataInput {
  prevId: PHID
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_ReplaceParentInput {
  prevID: PHID
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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

export interface AtlasMultiParent_SetExploratoryNameInput {
  name: string
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

export interface AtlasMultiParent_SetNotionIdInput {
  notionId: string
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
  parents: MDocumentLink[]
  atlasType: MAtlasType
  content?: string
  masterStatus: MStatus
  globalTags: MGlobalTag[]
  originalContextData: MDocumentLink[]
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
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
  name?: OLabel
  content?: string
  masterStatus: AtlasScope_Status
  globalTags: AtlasScope_GlobalTag[]
  originalContextData: AtlasScope_DocumentInfo[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasScope_DocumentInfo {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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

export interface AtlasScope_ReplaceContextDataInput {
  prevId: PHID
  id: PHID
  title?: string
  docNo?: string
  documentType?: string
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
  docNo?: string
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
  docNo?: string
  name?: OLabel
  content?: string
  masterStatus: Status
  globalTags: GlobalTag[]
  originalContextData: DocumentInfo[]
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSet {
  id: string
  name: string
  documentType: string
  operations: Operation[]
  revision: number
  created: DateTime
  lastModified: DateTime
  initialState: AtlasSet_AtlasSetState
  state: AtlasSet_AtlasSetState
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSet_AtlasSetState {
  id: PHID
  name: string
  parent?: AtlasSet_SetDocumentLink
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSet_SetDocumentLink {
  id: PHID
  title?: OLabel
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSet_SetNotionIdInput {
  notionId: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSet_SetSetNameInput {
  name: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSet_SetSetParentInput {
  id: PHID
  title?: OLabel
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSetQueries {
  getDocument?: AtlasSet
  getDocuments?: AtlasSet[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasSetState {
  id: PHID
  name: string
  parent?: SetDocumentLink
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Challenge {
  nonce: string
  message: string
  hex: string
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

export interface CurrencyConversion {
  metric: string
  sourceCurrency: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Dimension {
  name?: string
  values?: Value[]
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

export interface DocumentDriveStateInput {
  name?: string
  id?: string
  slug?: string
  icon?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface DocumentInfo {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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

export interface EDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface FDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Finding {
  isAligned: boolean
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface GDocumentLink {
  id: PHID
  title?: OLabel
  docNo?: string
  documentType?: string
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
  title?: OLabel
  docNo?: string
  documentType?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface MultiCurrencyConversions {
  start?: string
  end?: string
  granularity?: AnalyticsGranularity
  metrics?: string[]
  dimensions?: AnalyticsFilterDimension[]
  currency?: string
  conversions: CurrencyConversion[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Mutation {
  AtlasExploratory_createDocument?: string
  AtlasExploratory_setExploratoryName?: number
  AtlasExploratory_setContent?: number
  AtlasExploratory_setMasterStatus?: number
  AtlasExploratory_setParent?: number
  AtlasExploratory_setAtlasType?: number
  AtlasExploratory_setFindings?: number
  AtlasExploratory_setDocNumber?: number
  AtlasExploratory_addTags?: number
  AtlasExploratory_removeTags?: number
  AtlasExploratory_addContextData?: number
  AtlasExploratory_removeContextData?: number
  AtlasExploratory_setNotionId?: number
  AtlasExploratory_setAdditionalGuidance?: number
  AtlasExploratory_replaceContextData?: number
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
  AtlasFoundation_setContent?: number
  AtlasFoundation_setMasterStatus?: number
  AtlasFoundation_setAtlasType?: number
  AtlasFoundation_setParent?: number
  AtlasFoundation_setDocNumber?: number
  AtlasFoundation_addTags?: number
  AtlasFoundation_removeTags?: number
  AtlasFoundation_addContextData?: number
  AtlasFoundation_removeContextData?: number
  AtlasFoundation_setNotionId?: number
  AtlasFoundation_replaceContextData?: number
  AtlasGrounding_createDocument?: string
  AtlasGrounding_setGroundingName?: number
  AtlasGrounding_setContent?: number
  AtlasGrounding_setMasterStatus?: number
  AtlasGrounding_setAtlasType?: number
  AtlasGrounding_setParent?: number
  AtlasGrounding_setDocNumber?: number
  AtlasGrounding_addTags?: number
  AtlasGrounding_removeTags?: number
  AtlasGrounding_addContextData?: number
  AtlasGrounding_removeContextData?: number
  AtlasGrounding_setNotionId?: number
  AtlasGrounding_replaceContextData?: number
  AtlasMultiParent_createDocument?: string
  AtlasMultiParent_setExploratoryName?: number
  AtlasMultiParent_setContent?: number
  AtlasMultiParent_setMasterStatus?: number
  AtlasMultiParent_addParent?: number
  AtlasMultiParent_setAtlasType?: number
  AtlasMultiParent_removeParent?: number
  AtlasMultiParent_replaceParent?: number
  AtlasMultiParent_addTags?: number
  AtlasMultiParent_removeTags?: number
  AtlasMultiParent_addContextData?: number
  AtlasMultiParent_removeContextData?: number
  AtlasMultiParent_replaceContextData?: number
  AtlasMultiParent_setNotionId?: number
  AtlasScope_createDocument?: string
  AtlasScope_setScopeName?: number
  AtlasScope_setContent?: number
  AtlasScope_setMasterStatus?: number
  AtlasScope_setDocNumber?: number
  AtlasScope_addTags?: number
  AtlasScope_removeTags?: number
  AtlasScope_addContextData?: number
  AtlasScope_removeContextData?: number
  AtlasScope_setNotionId?: number
  AtlasScope_replaceContextData?: number
  AtlasSet_createDocument?: string
  AtlasSet_setSetName?: number
  AtlasSet_setSetParent?: number
  AtlasSet_setNotionId?: number
  createChallenge?: Challenge
  solveChallenge?: SessionOutput
  createSession?: SessionOutput
  revokeSession?: SessionOutput
  ForkAtlas?: string
  addDrive?: DocumentDrive_DocumentDriveState
  setDriveIcon?: boolean
  setDriveName?: boolean
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
  analytics?: AnalyticsQuery
  AtlasExploratory?: AtlasExploratoryQueries
  AtlasFeedbackIssues?: AtlasFeedbackIssuesQueries
  AtlasFoundation?: AtlasFoundationQueries
  AtlasGrounding?: AtlasGroundingQueries
  AtlasMultiParent?: AtlasMultiParentQueries
  AtlasScope?: AtlasScopeQueries
  AtlasSet?: AtlasSetQueries
  me?: User
  sessions: Session[]
  drives: string[]
  driveIdBySlug?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Session {
  id: ID
  userId: string
  address: string
  expiresAt: DateTime
  createdAt: DateTime
  updatedAt: DateTime
  referenceTokenId: string
  createdBy: string
  referenceExpiryDate?: DateTime
  isUserCreated: boolean
  name?: string
  allowedOrigins?: string
  revokedAt?: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface SessionInput {
  expiryDurationSeconds?: number
  name: string
  allowedOrigins: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface SessionOutput {
  id: ID
  token?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface SetDocumentLink {
  id: PHID
  title?: OLabel
  documentType?: string
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

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface User {
  address: string
  createdAt: DateTime
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Value {
  path?: string
  label?: string
  description?: string
  icon?: string
}

// Selection Types

export interface AnalyticsFilterSelection {
  start?: boolean
  end?: boolean
  granularity?: boolean
  metrics?: boolean
  dimensions?: AnalyticsFilterDimensionSelection
  currency?: boolean
}

export interface AnalyticsFilterDimensionSelection {
  name?: boolean
  select?: boolean
  lod?: boolean
}

export interface AnalyticsPeriodSelection {
  period?: boolean
  start?: boolean
  end?: boolean
  rows?: AnalyticsSeriesSelection
}

export interface AnalyticsQuerySelection {
  series?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { filter?: AnalyticsFilter }
  } & AnalyticsPeriodSelection
  multiCurrencySeries?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { filter?: MultiCurrencyConversions }
  } & AnalyticsPeriodSelection
  metrics?: boolean
  dimensions?: DimensionSelection
  currencies?: boolean
}

export interface AnalyticsSeriesSelection {
  dimensions?: AnalyticsSeriesDimensionSelection
  metric?: boolean
  unit?: boolean
  value?: boolean
  sum?: boolean
}

export interface AnalyticsSeriesDimensionSelection {
  name?: boolean
  path?: boolean
  label?: boolean
  description?: boolean
  icon?: boolean
}

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

export interface AtlasExploratory_AddContextDataInputSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasExploratory_AddTagsInputSelection {
  newTags?: boolean
}

export interface AtlasExploratory_AtlasExploratoryStateSelection {
  docNo?: boolean
  name?: boolean
  parent?: AtlasExploratory_EDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: AtlasExploratory_EDocumentLinkSelection
  notionId?: boolean
  findings?: AtlasExploratory_FindingSelection
  additionalGuidance?: boolean
}

export interface AtlasExploratory_EDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasExploratory_FindingSelection {
  isAligned?: boolean
}

export interface AtlasExploratory_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasExploratory_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasExploratory_ReplaceContextDataInputSelection {
  prevId?: boolean
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasExploratory_SetAdditionalGuidanceInputSelection {
  additionalGuidance?: boolean
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
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  docNo?: boolean
  name?: boolean
  parent?: EDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: EDocumentLinkSelection
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasFoundation_AddTagsInputSelection {
  tags?: boolean
}

export interface AtlasFoundation_AtlasFoundationStateSelection {
  docNo?: boolean
  name?: boolean
  parent?: AtlasFoundation_FDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: AtlasFoundation_FDocumentLinkSelection
  notionId?: boolean
}

export interface AtlasFoundation_FDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasFoundation_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasFoundation_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasFoundation_ReplaceContextDataInputSelection {
  prevId?: boolean
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  docNo?: boolean
  name?: boolean
  parent?: FDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: FDocumentLinkSelection
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasGrounding_AddTagsInputSelection {
  tags?: boolean
}

export interface AtlasGrounding_AtlasGroundingStateSelection {
  docNo?: boolean
  name?: boolean
  parent?: AtlasGrounding_GDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: AtlasGrounding_GDocumentLinkSelection
  notionId?: boolean
}

export interface AtlasGrounding_GDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasGrounding_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasGrounding_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasGrounding_ReplaceContextDataInputSelection {
  prevId?: boolean
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  docNo?: boolean
  name?: boolean
  parent?: GDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: GDocumentLinkSelection
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasMultiParent_AddParentInputSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasMultiParent_AddTagsInputSelection {
  tags?: boolean
}

export interface AtlasMultiParent_AtlasMultiParentStateSelection {
  name?: boolean
  parents?: AtlasMultiParent_MDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: AtlasMultiParent_MDocumentLinkSelection
  notionId?: boolean
}

export interface AtlasMultiParent_MDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasMultiParent_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasMultiParent_RemoveParentInputSelection {
  id?: boolean
}

export interface AtlasMultiParent_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasMultiParent_ReplaceContextDataInputSelection {
  prevId?: boolean
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasMultiParent_ReplaceParentInputSelection {
  prevID?: boolean
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasMultiParent_SetAtlasTypeInputSelection {
  atlasType?: boolean
}

export interface AtlasMultiParent_SetContentInputSelection {
  content?: boolean
}

export interface AtlasMultiParent_SetExploratoryNameInputSelection {
  name?: boolean
}

export interface AtlasMultiParent_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasMultiParent_SetNotionIdInputSelection {
  notionId?: boolean
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
  parents?: MDocumentLinkSelection
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: MDocumentLinkSelection
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasScope_AddTagsInputSelection {
  newTags?: boolean
}

export interface AtlasScope_AtlasScopeStateSelection {
  docNo?: boolean
  name?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: AtlasScope_DocumentInfoSelection
  notionId?: boolean
}

export interface AtlasScope_DocumentInfoSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface AtlasScope_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasScope_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasScope_ReplaceContextDataInputSelection {
  prevId?: boolean
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  docNo?: boolean
  name?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  originalContextData?: DocumentInfoSelection
  notionId?: boolean
}

export interface AtlasSetSelection {
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
  initialState?: AtlasSet_AtlasSetStateSelection
  state?: AtlasSet_AtlasSetStateSelection
  stateJSON?: boolean
}

export interface AtlasSet_AtlasSetStateSelection {
  id?: boolean
  name?: boolean
  parent?: AtlasSet_SetDocumentLinkSelection
  notionId?: boolean
}

export interface AtlasSet_SetDocumentLinkSelection {
  id?: boolean
  title?: boolean
  documentType?: boolean
}

export interface AtlasSet_SetNotionIdInputSelection {
  notionId?: boolean
}

export interface AtlasSet_SetSetNameInputSelection {
  name?: boolean
}

export interface AtlasSet_SetSetParentInputSelection {
  id?: boolean
  title?: boolean
  documentType?: boolean
}

export interface AtlasSetQueriesSelection {
  getDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  } & AtlasSetSelection
  getDocuments?: AtlasSetSelection
}

export interface AtlasSetStateSelection {
  id?: boolean
  name?: boolean
  parent?: SetDocumentLinkSelection
  notionId?: boolean
}

export interface ChallengeSelection {
  nonce?: boolean
  message?: boolean
  hex?: boolean
}

export interface CommentSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionId?: boolean
  content?: boolean
  createdAt?: boolean
  lastEditedAt?: boolean
}

export interface CurrencyConversionSelection {
  metric?: boolean
  sourceCurrency?: boolean
}

export interface DimensionSelection {
  name?: boolean
  values?: ValueSelection
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

export interface DocumentDriveStateInputSelection {
  name?: boolean
  id?: boolean
  slug?: boolean
  icon?: boolean
}

export interface DocumentInfoSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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

export interface EDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface FDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface FindingSelection {
  isAligned?: boolean
}

export interface GDocumentLinkSelection {
  id?: boolean
  title?: boolean
  docNo?: boolean
  documentType?: boolean
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
  title?: boolean
  docNo?: boolean
  documentType?: boolean
}

export interface MultiCurrencyConversionsSelection {
  start?: boolean
  end?: boolean
  granularity?: boolean
  metrics?: boolean
  dimensions?: AnalyticsFilterDimensionSelection
  currency?: boolean
  conversions?: CurrencyConversionSelection
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
  AtlasExploratory_setAdditionalGuidance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_SetAdditionalGuidanceInput
    }
  }
  AtlasExploratory_replaceContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasExploratory_ReplaceContextDataInput
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
  AtlasFoundation_replaceContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasFoundation_ReplaceContextDataInput
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
  AtlasGrounding_replaceContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasGrounding_ReplaceContextDataInput
    }
  }
  AtlasMultiParent_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasMultiParent_setExploratoryName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_SetExploratoryNameInput
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
  AtlasMultiParent_replaceParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_ReplaceParentInput
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
  AtlasMultiParent_replaceContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasMultiParent_ReplaceContextDataInput
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
  AtlasScope_replaceContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasScope_ReplaceContextDataInput
    }
  }
  AtlasSet_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; name?: string }
  }
  AtlasSet_setSetName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasSet_SetSetNameInput
    }
  }
  AtlasSet_setSetParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasSet_SetSetParentInput
    }
  }
  AtlasSet_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: {
      driveId?: string
      docId?: PHID
      input?: AtlasSet_SetNotionIdInput
    }
  }
  createChallenge?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { address: string }
  } & ChallengeSelection
  solveChallenge?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { nonce: string; signature: string }
  } & SessionOutputSelection
  createSession?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { session: SessionInput }
  } & SessionOutputSelection
  revokeSession?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { sessionId: string }
  } & SessionOutputSelection
  ForkAtlas?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { driveId?: string; docId?: PHID }
  }
  addDrive?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { global: DocumentDriveStateInput; preferredEditor?: string }
  } & DocumentDrive_DocumentDriveStateSelection
  setDriveIcon?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { id: string; icon: string }
  }
  setDriveName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args: { id: string; name: string }
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

export interface SessionSelection {
  id?: boolean
  userId?: boolean
  address?: boolean
  expiresAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  referenceTokenId?: boolean
  createdBy?: boolean
  referenceExpiryDate?: boolean
  isUserCreated?: boolean
  name?: boolean
  allowedOrigins?: boolean
  revokedAt?: boolean
}

export interface SessionInputSelection {
  expiryDurationSeconds?: boolean
  name?: boolean
  allowedOrigins?: boolean
}

export interface SessionOutputSelection {
  id?: boolean
  token?: boolean
}

export interface SetDocumentLinkSelection {
  id?: boolean
  title?: boolean
  documentType?: boolean
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

export interface UserSelection {
  address?: boolean
  createdAt?: boolean
}

export interface ValueSelection {
  path?: boolean
  label?: boolean
  description?: boolean
  icon?: boolean
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
    analytics: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AnalyticsQuerySelection,
      DeepRequired<AnalyticsQuery>,
      AllEnums
    >
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
    AtlasSet: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & AtlasSetQueriesSelection,
      DeepRequired<AtlasSetQueries>,
      AllEnums
    >
    me: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & UserSelection,
      DeepRequired<User>,
      AllEnums
    >
    sessions: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & SessionSelection,
      DeepRequired<Session[]>,
      AllEnums
    >
    drives: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      },
      DeepRequired<string[]>,
      AllEnums
    >
    driveIdBySlug: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: DriveIdBySlugArgs
      },
      string,
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
    AtlasExploratory_setAdditionalGuidance: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratorySetAdditionalGuidanceArgs
      },
      number,
      AllEnums
    >
    AtlasExploratory_replaceContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasExploratoryReplaceContextDataArgs
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
    AtlasFoundation_replaceContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasFoundationReplaceContextDataArgs
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
    AtlasGrounding_replaceContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasGroundingReplaceContextDataArgs
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
    AtlasMultiParent_setExploratoryName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetExploratoryNameArgs
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
    AtlasMultiParent_replaceParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentReplaceParentArgs
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
    AtlasMultiParent_replaceContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentReplaceContextDataArgs
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
    AtlasScope_replaceContextData: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasScopeReplaceContextDataArgs
      },
      number,
      AllEnums
    >
    AtlasSet_createDocument: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasSetCreateDocumentArgs
      },
      string,
      AllEnums
    >
    AtlasSet_setSetName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasSetSetSetNameArgs
      },
      number,
      AllEnums
    >
    AtlasSet_setSetParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasSetSetSetParentArgs
      },
      number,
      AllEnums
    >
    AtlasSet_setNotionId: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasSetSetNotionIdArgs
      },
      number,
      AllEnums
    >
    createChallenge: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: CreateChallengeArgs
      } & ChallengeSelection,
      DeepRequired<Challenge>,
      AllEnums
    >
    solveChallenge: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: SolveChallengeArgs
      } & SessionOutputSelection,
      DeepRequired<SessionOutput>,
      AllEnums
    >
    createSession: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: CreateSessionArgs
      } & SessionOutputSelection,
      DeepRequired<SessionOutput>,
      AllEnums
    >
    revokeSession: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: RevokeSessionArgs
      } & SessionOutputSelection,
      DeepRequired<SessionOutput>,
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
    addDrive: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: AddDriveArgs
      } & DocumentDrive_DocumentDriveStateSelection,
      DeepRequired<DocumentDrive_DocumentDriveState>,
      AllEnums
    >
    setDriveIcon: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: SetDriveIconArgs
      },
      boolean,
      AllEnums
    >
    setDriveName: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args: SetDriveNameArgs
      },
      boolean,
      AllEnums
    >
  }
}

export default client
