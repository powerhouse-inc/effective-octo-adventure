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
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Currency: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
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
  /** Add your inputs here */
  id: Scalars["PHID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddTagsInput = {
  /** Add your inputs here */
  newTags: Array<EGlobalTag | `${EGlobalTag}`>;
};

export type AtlasExploratoryState = {
  /** Additional commentary and context for guidance.  */
  additionalGuidance: Scalars["String"]["output"];
  /**
   * The type of the Exploratory document within Atlas.
   * Example: Tenet, Original Context Data, Active Data.
   */
  atlasType: EAtlasType | `${EAtlasType}`;
  /** Entire content body of the Exploratory document within Atlas. */
  content: Maybe<Scalars["String"]["output"]>;
  /** Unique document number assigned to the Exploratory document within Atlas. */
  docNo: Maybe<Scalars["String"]["output"]>;
  /** Alignmnet boolean findings.  */
  findings: Finding;
  /** Document tags managed by the Atlas Axis facilitator group for classification.   */
  globalTags: Array<EGlobalTag | `${EGlobalTag}`>;
  /** Master status of the Exploratory document as managed by the Atlas Axis facilitator group.   */
  masterStatus: EStatus | `${EStatus}`;
  /** Full name of the Exploratory document entity.   */
  name: Maybe<Scalars["String"]["output"]>;
  /**
   * Original Notion document ID of the Exploratory document.
   * Used for cross-system referencing and linking back to the original Notion source.
   */
  notionId: Maybe<Scalars["String"]["output"]>;
  /** List of Atlas documents that were relevant for the creation of this Exploratory document.   */
  originalContextData: Array<DocumentInfo>;
  /**
   * Parent entity that this Exploratory document belongs to.
   * This is a reference to another Atlas document.
   */
  parent: Scalars["PHID"]["output"];
};

export type DocumentInfo = {
  docNo: Maybe<Scalars["String"]["output"]>;
  id: Scalars["PHID"]["output"];
  title: Maybe<Scalars["OLabel"]["output"]>;
};

/** Domain (i.e., Atlas) specific document types with the same document model global schema.   */
export type EAtlasType = "SCENARIO" | "SCENARIO_VARIATION";

/** These global tags are used for classification in Exploratory documents.   */
export type EGlobalTag =
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

/** Defines the lifecycle stage of the Exploratory document within Atlas.   */
export type EStatus =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";

/** Reference to a document within Atlas with optional name and document number for display reasons.  */
export type Finding = {
  isAligned: Scalars["Boolean"]["output"];
};

export type RemoveContextDataInput = {
  /** Add your inputs here */
  id: Scalars["PHID"]["input"];
};

export type RemoveTagsInput = {
  /** Add your inputs here */
  tags: Array<EGlobalTag | `${EGlobalTag}`>;
};

export type ReplaceContextDataInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  prevId: Scalars["PHID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetAdditionalGuidanceInput = {
  /** Add your inputs here */
  additionalGuidance: Scalars["String"]["input"];
};

export type SetAtlasTypeInput = {
  /** Add your inputs here */
  atlasType: EAtlasType | `${EAtlasType}`;
};

export type SetContentInput = {
  /** Add your inputs here */
  content: Scalars["String"]["input"];
};

export type SetDocumentNumberInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetFindingsInput = {
  /** Add your inputs here */
  isAligned: Scalars["Boolean"]["input"];
};

export type SetMasterStatusInput = {
  /** Add your inputs here */
  masterStatus: EStatus | `${EStatus}`;
};

export type SetNameInput = {
  /** Add your inputs here */
  name: Scalars["String"]["input"];
};

export type SetNotionIdInput = {
  /** Add your inputs here */
  notionID?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetParentInput = {
  /** Add your inputs here */
  parent: Scalars["PHID"]["input"];
};
