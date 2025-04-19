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
  id: Scalars["PHID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddTagsInput = {
  /** Tags to be added */
  newTags: Array<GlobalTag | `${GlobalTag}`>;
};

export type AtlasScopeState = {
  /**
   * Document number of the scope document within Atlas.
   * For example: "A.1" for the Governance Scope.
   */
  content: Maybe<Scalars["String"]["output"]>;
  /** Unique document number assigned to the Scope document within Atlas. */
  docNo: Maybe<Scalars["String"]["output"]>;
  /** Document tags as managed by the Atlas Axis facilitator group. */
  globalTags: Array<GlobalTag | `${GlobalTag}`>;
  /** Master status as managed by the Atlas Axis facilitator group. */
  masterStatus: Status | `${Status}`;
  /**
   * Full name of the Scope without the document number.
   * For example: "The Support Scope"
   */
  name: Maybe<Scalars["OLabel"]["output"]>;
  /** Original Notion document ID of the scope document. */
  notionId: Maybe<Scalars["String"]["output"]>;
  /** List of Atlas documents that were relevant for the creation of the scope document.  */
  originalContextData: Array<DocumentInfo>;
};

/** Reference to a document within Atlas with optional name and document number for display reasons.  */
export type DocumentInfo = {
  docNo: Maybe<Scalars["String"]["output"]>;
  id: Scalars["PHID"]["output"];
  title: Maybe<Scalars["OLabel"]["output"]>;
};

export type GlobalTag =
  | "ANON_WORKFORCE"
  | "AVC"
  | "CAIS"
  | "DAO_TOOLKIT"
  | "ECOSYSTEM_INTELLIGENCE"
  | "EXTERNAL_REFERENCE"
  | "FACILITATORDAO"
  | "INTERNAL_REFERENCE"
  | "LEGACY_TERM_USE_APPROVED"
  | "ML_DEFER"
  | "ML_HIGH_PRIORITY"
  | "ML_LOW_PRIORITY"
  | "ML_MED_PRIORITY"
  | "ML_SUPPORT_DOCS_NEEDED"
  | "NEWCHAIN"
  | "P0_HUB_ENTRY_NEEDED"
  | "PURPOSE_SYSTEM"
  | "RECURSIVE_IMPROVEMENT"
  | "SCOPE_ADVISOR"
  | "SUBDAO_INCUBATION"
  | "SUBDAO_REWARDS"
  | "TWO_STAGE_BRIDGE"
  | "V1_MIP";

export type RemoveContextDataInput = {
  id: Scalars["PHID"]["input"];
};

export type RemoveTagsInput = {
  /** Tags to be removed */
  tags: Array<GlobalTag | `${GlobalTag}`>;
};

export type ReplaceContextDataInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  prevId: Scalars["PHID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetContentInput = {
  /** Update the content of the scope document */
  content: Scalars["String"]["input"];
};

export type SetDocumentNumberInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetMasterStatusInput = {
  /** New master status */
  masterStatus: Status | `${Status}`;
};

export type SetNameInput = {
  name: Scalars["OLabel"]["input"];
};

export type SetNotionIdInput = {
  /** Add your inputs here */
  notionID?: InputMaybe<Scalars["String"]["input"]>;
};

export type Status =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";
