// noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols, TypeScriptCheckImport
import { DeepRequired } from "ts-essentials"
import { Maybe, IResponseListener, Endpoint } from "graphql-ts-client/dist"

// Scalars
export type IDate = string | Date
export declare type JSONObject = string
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
export declare type Amount_Fiat = string
export declare type Amount_Currency = string
export declare type Amount_Crypto = string
export declare type Amount = string
export declare type ID = string
export declare type _FieldSet = string
export declare type _Any = string

// Enums

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

type AllEnums =
  | DocumentDrive_TransmitterType
  | DocumentDrive_TriggerType
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

// Args
export interface DrivesArgs {}
export interface DriveIdBySlugArgs {
  slug: string
}
export interface ServiceArgs {}
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
  stateJSON?: JSONObject
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

export interface AtlasFeedbackIssues_AtlasFeedbackIssuesState {
  issues: AtlasFeedbackIssues_Issue[]
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
  stateJSON?: JSONObject
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
  stateJSON?: JSONObject
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
  stateJSON?: JSONObject
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Query {
  drives: string[]
  driveIdBySlug?: string
  _service: _Service
}

/**
 * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
 */

export interface Mutation {
  addDrive?: DocumentDrive_DocumentDriveState
  setDriveIcon?: boolean
  setDriveName?: boolean
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

export interface _Service {
  sdl?: string
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
  stateJSON?: boolean
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

export interface AtlasFeedbackIssues_AtlasFeedbackIssuesStateSelection {
  issues?: AtlasFeedbackIssues_IssueSelection
}

export interface AtlasFeedbackIssues_IssueSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionIds?: boolean
  createdAt?: boolean
  comments?: AtlasFeedbackIssues_CommentSelection
}

export interface AtlasFeedbackIssues_CommentSelection {
  phid?: boolean
  creatorAddress?: boolean
  notionId?: boolean
  content?: boolean
  createdAt?: boolean
  lastEditedAt?: boolean
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
  stateJSON?: boolean
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
  stateJSON?: boolean
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
  stateJSON?: boolean
}

export interface MutationSelection {
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

export interface DocumentDriveStateInputSelection {
  name?: boolean
  id?: boolean
  slug?: boolean
  icon?: boolean
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
