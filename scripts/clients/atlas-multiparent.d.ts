// noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols, TypeScriptCheckImport
import { DeepRequired } from "ts-essentials"
import { Maybe, IResponseListener, Endpoint } from "graphql-ts-client/dist"

// Scalars
export type IDate = string | Date
export declare type Amount_Tokens = string
export declare type EthereumAddress = string
export declare type Amount_Percentage = string
export declare type EmailAddress = string
export declare type Date = IDate
export declare type DateTime = IDate
export declare type URL = string
export declare type Amount_Money = string
export declare type OLabel = string
export declare type Currency = string
export declare type PHID = string
export declare type OID = string
export declare type ID = string
export declare type _FieldSet = string
export declare type _Any = string

// Enums

export declare enum AtlasGrounding_GAtlasType {
  activeData = "ACTIVE_DATA",
  originalContextData = "ORIGINAL_CONTEXT_DATA",
  tenet = "TENET",
}

export declare enum AtlasGrounding_GStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
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

export declare enum AtlasFoundation_FAtlasType {
  activeDataController = "ACTIVE_DATA_CONTROLLER",
  article = "ARTICLE",
  core = "CORE",
  section = "SECTION",
}

export declare enum AtlasFoundation_FStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
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

export declare enum AtlasExploratory_EAtlasType {
  scenario = "SCENARIO",
  scenarioVariation = "SCENARIO_VARIATION",
}

export declare enum AtlasExploratory_EStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
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

export declare enum AtlasMultiParent_MAtlasType {
  annotation = "ANNOTATION",
  neededResearch = "NEEDED_RESEARCH",
}

export declare enum AtlasMultiParent_MStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
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

export declare enum AtlasScope_Status {
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

export declare enum MAtlasType {
  annotation = "ANNOTATION",
  neededResearch = "NEEDED_RESEARCH",
}

export declare enum MStatus {
  approved = "APPROVED",
  archived = "ARCHIVED",
  deferred = "DEFERRED",
  placeholder = "PLACEHOLDER",
  provisional = "PROVISIONAL",
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

type AllEnums =
  | AtlasGrounding_GAtlasType
  | AtlasGrounding_GStatus
  | AtlasGrounding_GGlobalTag
  | AtlasFoundation_FAtlasType
  | AtlasFoundation_FStatus
  | AtlasFoundation_FGlobalTag
  | AtlasExploratory_EAtlasType
  | AtlasExploratory_EStatus
  | AtlasExploratory_EGlobalTag
  | AtlasMultiParent_MAtlasType
  | AtlasMultiParent_MStatus
  | AtlasMultiParent_MGlobalTag
  | AtlasScope_Status
  | AtlasScope_GlobalTag
  | DocumentDrive_TransmitterType
  | DocumentDrive_TriggerType
  | MAtlasType
  | MStatus
  | MGlobalTag

// Args
export interface ServiceArgs {}
export interface AtlasMultiParentCreateDocumentArgs {
  name?: string
}
export interface AtlasMultiParentSetMultiparentNameArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetMultiparentNameInput
}
export interface AtlasMultiParentSetDocNumberArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetDocNumberInput
}
export interface AtlasMultiParentSetContentArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetContentInput
}
export interface AtlasMultiParentSetMasterStatusArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetMasterStatusInput
}
export interface AtlasMultiParentSetParentArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetParentInput
}
export interface AtlasMultiParentSetAtlasTypeArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetAtlasTypeInput
}
export interface AtlasMultiParentAddTagsArgs {
  docId?: PHID
  input?: AtlasMultiParent_AddTagsInput
}
export interface AtlasMultiParentRemoveTagsArgs {
  docId?: PHID
  input?: AtlasMultiParent_RemoveTagsInput
}
export interface AtlasMultiParentAddContextDataArgs {
  docId?: PHID
  input?: AtlasMultiParent_AddContextDataInput
}
export interface AtlasMultiParentRemoveContextDataArgs {
  docId?: PHID
  input?: AtlasMultiParent_RemoveContextDataInput
}
export interface AtlasMultiParentSetProvenanceArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetProvenanceInput
}
export interface AtlasMultiParentSetNotionIdArgs {
  docId?: PHID
  input?: AtlasMultiParent_SetNotionIdInput
}

// Input/Output Types

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface PHOperationContext {
  signer?: Signer
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

export interface SignerUser {
  address: string
  networkId: string
  chainId: number
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

export interface AtlasGrounding_AtlasGroundingState {
  name?: string
  docNo?: string
  parent: PHID
  atlasType: AtlasGrounding_GAtlasType
  content?: string
  masterStatus: AtlasGrounding_GStatus
  globalTags: AtlasGrounding_GGlobalTag[]
  references: PHID[]
  originalContextData: AtlasGrounding_DocumentInfo[]
  provenance?: URL
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasGrounding_DocumentInfo {
  id: PHID
  name?: OLabel
  docNo?: string
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

export interface AtlasExploratory_Finding {
  isAligned: boolean
  comment?: string
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
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AtlasMultiParentState {
  name?: string
  docNo?: string
  parent: PHID[]
  atlasType: AtlasMultiParent_MAtlasType
  content?: string
  masterStatus: AtlasMultiParent_MStatus
  globalTags: AtlasMultiParent_MGlobalTag[]
  references: PHID[]
  originalContextData: AtlasMultiParent_DocumentInfo[]
  provenance?: URL
  notionId?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_DocumentInfo {
  id: PHID
  name?: OLabel
  docNo?: string
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

export interface DocumentDrive_SynchronizationUnit {
  syncId: ID
  scope: string
  branch: string
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

export interface DocumentDrive_ListenerFilter {
  documentType: string[]
  documentId?: ID[]
  scope?: string[]
  branch?: string[]
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

export interface DocumentDrive_PullResponderTriggerData {
  listenerId: ID
  url: string
  interval: string
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
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParentState {
  name?: string
  docNo?: string
  parent: PHID[]
  atlasType: MAtlasType
  content?: string
  masterStatus: MStatus
  globalTags: MGlobalTag[]
  references: PHID[]
  originalContextData: DocumentInfo[]
  provenance?: URL
  notionId?: string
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

export interface Mutation {
  AtlasMultiParent_createDocument?: string
  AtlasMultiParent_setMultiparentName?: number
  AtlasMultiParent_setDocNumber?: number
  AtlasMultiParent_setContent?: number
  AtlasMultiParent_setMasterStatus?: number
  AtlasMultiParent_setParent?: number
  AtlasMultiParent_setAtlasType?: number
  AtlasMultiParent_addTags?: number
  AtlasMultiParent_removeTags?: number
  AtlasMultiParent_addContextData?: number
  AtlasMultiParent_removeContextData?: number
  AtlasMultiParent_setProvenance?: number
  AtlasMultiParent_setNotionId?: number
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

export interface AtlasMultiParent_SetDocNumberInput {
  docNo: string
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

export interface AtlasMultiParent_SetMasterStatusInput {
  masterStatus: MStatus
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetParentInput {
  parent?: PHID[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetAtlasTypeInput {
  atlasType?: MAtlasType[]
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_AddTagsInput {
  newTags: MGlobalTag[]
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

export interface AtlasMultiParent_AddContextDataInput {
  id: PHID
  name?: string
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

export interface AtlasMultiParent_SetProvenanceInput {
  provenance?: URL
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface AtlasMultiParent_SetNotionIdInput {
  notionID?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface _Service {
  sdl?: string
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Query {
  _service: _Service
}

// Selection Types

export interface PHOperationContextSelection {
  signer?: SignerSelection
}

export interface SignerSelection {
  user?: SignerUserSelection
  app?: SignerAppSelection
  signatures?: boolean
}

export interface SignerUserSelection {
  address?: boolean
  networkId?: boolean
  chainId?: boolean
}

export interface SignerAppSelection {
  name?: boolean
  key?: boolean
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

export interface AtlasGrounding_AtlasGroundingStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: boolean
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: boolean
  originalContextData?: AtlasGrounding_DocumentInfoSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasGrounding_DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
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

export interface AtlasExploratory_FindingSelection {
  isAligned?: boolean
  comment?: boolean
}

export interface AtlasExploratory_DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
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
}

export interface AtlasMultiParent_AtlasMultiParentStateSelection {
  name?: boolean
  docNo?: boolean
  parent?: boolean
  atlasType?: boolean
  content?: boolean
  masterStatus?: boolean
  globalTags?: boolean
  references?: boolean
  originalContextData?: AtlasMultiParent_DocumentInfoSelection
  provenance?: boolean
  notionId?: boolean
}

export interface AtlasMultiParent_DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
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
}

export interface DocumentDrive_FolderNodeSelection {
  id?: boolean
  name?: boolean
  kind?: boolean
  parentFolder?: boolean
}

export interface DocumentDrive_SynchronizationUnitSelection {
  syncId?: boolean
  scope?: boolean
  branch?: boolean
}

export interface DocumentDrive_FileNodeSelection {
  id?: boolean
  name?: boolean
  kind?: boolean
  documentType?: boolean
  parentFolder?: boolean
  synchronizationUnits?: DocumentDrive_SynchronizationUnitSelection
}

export interface DocumentDrive_DocumentDriveStateSelection {
  id?: boolean
  name?: boolean
  nodes?: boolean
  icon?: boolean
  slug?: boolean
}

export interface DocumentDrive_ListenerFilterSelection {
  documentType?: boolean
  documentId?: boolean
  scope?: boolean
  branch?: boolean
}

export interface DocumentDrive_ListenerCallInfoSelection {
  transmitterType?: boolean
  name?: boolean
  data?: boolean
}

export interface DocumentDrive_ListenerSelection {
  listenerId?: boolean
  label?: boolean
  block?: boolean
  system?: boolean
  filter?: DocumentDrive_ListenerFilterSelection
  callInfo?: DocumentDrive_ListenerCallInfoSelection
}

export interface DocumentDrive_PullResponderTriggerDataSelection {
  listenerId?: boolean
  url?: boolean
  interval?: boolean
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
}

export interface AtlasMultiParentStateSelection {
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
}

export interface DocumentInfoSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface MutationSelection {
  AtlasMultiParent_createDocument?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { name?: string }
  }
  AtlasMultiParent_setMultiparentName?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetMultiparentNameInput }
  }
  AtlasMultiParent_setDocNumber?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetDocNumberInput }
  }
  AtlasMultiParent_setContent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetContentInput }
  }
  AtlasMultiParent_setMasterStatus?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetMasterStatusInput }
  }
  AtlasMultiParent_setParent?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetParentInput }
  }
  AtlasMultiParent_setAtlasType?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetAtlasTypeInput }
  }
  AtlasMultiParent_addTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_AddTagsInput }
  }
  AtlasMultiParent_removeTags?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_RemoveTagsInput }
  }
  AtlasMultiParent_addContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_AddContextDataInput }
  }
  AtlasMultiParent_removeContextData?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_RemoveContextDataInput }
  }
  AtlasMultiParent_setProvenance?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetProvenanceInput }
  }
  AtlasMultiParent_setNotionId?: {
    __headers?: { [key: string]: string }
    __retry?: boolean
    __alias?: string
    __args?: { docId?: PHID; input?: AtlasMultiParent_SetNotionIdInput }
  }
}

export interface AtlasMultiParent_SetMultiparentNameInputSelection {
  name?: boolean
}

export interface AtlasMultiParent_SetDocNumberInputSelection {
  docNo?: boolean
}

export interface AtlasMultiParent_SetContentInputSelection {
  content?: boolean
}

export interface AtlasMultiParent_SetMasterStatusInputSelection {
  masterStatus?: boolean
}

export interface AtlasMultiParent_SetParentInputSelection {
  parent?: boolean
}

export interface AtlasMultiParent_SetAtlasTypeInputSelection {
  atlasType?: boolean
}

export interface AtlasMultiParent_AddTagsInputSelection {
  newTags?: boolean
}

export interface AtlasMultiParent_RemoveTagsInputSelection {
  tags?: boolean
}

export interface AtlasMultiParent_AddContextDataInputSelection {
  id?: boolean
  name?: boolean
  docNo?: boolean
}

export interface AtlasMultiParent_RemoveContextDataInputSelection {
  id?: boolean
}

export interface AtlasMultiParent_SetProvenanceInputSelection {
  provenance?: boolean
}

export interface AtlasMultiParent_SetNotionIdInputSelection {
  notionID?: boolean
}

export interface _ServiceSelection {
  sdl?: boolean
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
    _service: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
      } & _ServiceSelection,
      DeepRequired<_Service>,
      AllEnums
    >
  }
  mutations: {
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
    AtlasMultiParent_setParent: Endpoint<
      {
        __headers?: { [key: string]: string }
        __retry?: boolean
        __alias?: string
        __args?: AtlasMultiParentSetParentArgs
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
  }
}

export default client
