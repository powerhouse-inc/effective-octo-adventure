export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
};

export type AddContextDataInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddReferenceInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type AddTagsInput = {
  tags: Array<FGlobalTag | FGlobalTag>;
};

export type AtlasFoundationState = {
  /**
   * The type of the Foundation entity within Atlas.
   * Example: DAO, Governance Body, Research Hub, etc.
   */
  atlasType: FAtlasType | FAtlasType;
  /** Entire content body of the Foundation document within Atlas.  */
  content: Maybe<Scalars["String"]["output"]>;
  /** Unique document number assigned to the Foundation entity within Atlas. */
  docNo: Maybe<Scalars["String"]["output"]>;
  /** Document tags managed by the Atlas Axis facilitator group for classification. */
  globalTags: Array<FGlobalTag | FGlobalTag>;
  /** Master status of the Foundation entity as managed by the Atlas Axis facilitator group. */
  masterStatus: FStatus | FStatus;
  /** Full name of the Foundation entity. */
  name: Maybe<Scalars["String"]["output"]>;
  /**
   * Original Notion document ID of the Foundation document.
   * Used for cross-system referencing and linking back to the original Notion source.
   */
  notionId: Maybe<Scalars["String"]["output"]>;
  /** List of Atlas documents that were relevant for the creation of this Foundation document. */
  originalContextData: Array<FDocumentLink>;
  /**
   * Parent entity that this Foundation belongs to.
   * This is a reference to another Atlas document.
   */
  parent: Maybe<FDocumentLink>;
  /** Link to the original P0hub Notion environment where this document was first created or referenced. */
  provenance: Array<Scalars["URL"]["output"]>;
  /** References to other Atlas entities that are linked to this Foundation. */
  references: Array<FDocumentLink>;
};

/** Domain (i.e., Atlas) specific document types with the same document model global schema.  */
export type FAtlasType =
  | "ACTIVE_DATA_CONTROLLER"
  | "ARTICLE"
  | "CORE"
  | "SECTION";

/** Reference to a document within Atlas with optional name and document number for display reasons.  */
export type FDocumentLink = {
  docNo: Maybe<Scalars["String"]["output"]>;
  id: Scalars["PHID"]["output"];
  name: Maybe<Scalars["OLabel"]["output"]>;
};

/** These global tags differ from the ones in Scopes.  */
export type FGlobalTag =
  | "AVC"
  | "CAIS"
  | "DAO_TOOLKIT"
  | "ECOSYSTEM_INTELLIGENCE"
  | "EXTERNAL_REFERENCE"
  | "LEGACY_TERM_USE_APPROVED"
  | "ML_DEFER"
  | "ML_LOW_PRIORITY"
  | "ML_SUPPORT_DOCS_NEEDED"
  | "NEWCHAIN"
  | "PURPOSE_SYSTEM"
  | "RECURSIVE_IMPROVEMENT"
  | "SCOPE_ADVISOR"
  | "TWO_STAGE_BRIDGE";

export type FStatus =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";

export type RemoveContextDataInput = {
  id: Scalars["PHID"]["input"];
};

export type RemoveReferenceInput = {
  id: Scalars["PHID"]["input"];
};

export type RemoveTagsInput = {
  tags: Array<FGlobalTag | FGlobalTag>;
};

export type SetAtlasTypeInput = {
  atlasType: FAtlasType | FAtlasType;
};

export type SetContentInput = {
  content: Scalars["String"]["input"];
};

export type SetDocNumberInput = {
  docNo: Scalars["String"]["input"];
};

export type SetFoundationNameInput = {
  name: Scalars["String"]["input"];
};

export type SetMasterStatusInput = {
  masterStatus: FStatus | FStatus;
};

export type SetNotionIdInput = {
  notionID: Scalars["String"]["input"];
};

export type SetParentInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type SetProvenanceInput = {
  provenance: Array<Scalars["URL"]["input"]>;
};
