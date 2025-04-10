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

export type AddAdditionalGuidanceInput = {
  /** Add your inputs here */
  additionalGuidance: Scalars["String"]["input"];
};

export type AddContextDataInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  /** Add your inputs here */
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddTagsInput = {
  /** Add your inputs here */
  newTags: Array<EGlobalTag | `${EGlobalTag}`>;
};

export type AtlasExploratoryState = {
  /** Additional commentary and context for guidance.  */
  additionalGuidance: Scalars["String"]["output"];
  /**
   * The type of the Grounding document within Atlas.
   * Example: Tenet, Original Context Data, Active Data.
   */
  atlasType: EAtlasType | `${EAtlasType}`;
  /** Entire content body of the Grounding document within Atlas.   */
  content: Maybe<Scalars["String"]["output"]>;
  /** Unique document number assigned to the Grounding document within Atlas.   */
  docNo: Maybe<Scalars["String"]["output"]>;
  /** Alignmnet boolean findings.  */
  findings: Finding;
  /** Document tags managed by the Atlas Axis facilitator group for classification.   */
  globalTags: Array<EGlobalTag | `${EGlobalTag}`>;
  /** Master status of the Grounding document as managed by the Atlas Axis facilitator group.   */
  masterStatus: EStatus | `${EStatus}`;
  /** Full name of the Grounding document entity.   */
  name: Maybe<Scalars["String"]["output"]>;
  /**
   * Original Notion document ID of the Grounding document.
   * Used for cross-system referencing and linking back to the original Notion source.
   */
  notionId: Maybe<Scalars["String"]["output"]>;
  /** List of Atlas documents that were relevant for the creation of this Grounding document.   */
  originalContextData: Array<DocumentInfo>;
  /**
   * Parent entity that this Grounding document belongs to.
   * This is a reference to another Atlas document.
   */
  parent: Scalars["PHID"]["output"];
  /** Link to the original P0hub Notion environment where this document was first created or referenced. */
  provenance: Maybe<Scalars["URL"]["output"]>;
  /** References to other Atlas entities that are linked to this Grounding document.   */
  references: Array<Scalars["PHID"]["output"]>;
};

export type DocumentInfo = {
  docNo: Maybe<Scalars["String"]["output"]>;
  id: Scalars["PHID"]["output"];
  name: Maybe<Scalars["OLabel"]["output"]>;
};

/** Domain (i.e., Atlas) specific document types with the same document model global schema.   */
export type EAtlasType = "SCENARIO" | "SCENARIO_VARIATION";

/** These global tags are used for classification in Grounding documents.   */
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

/** Defines the lifecycle stage of the Grounding document within Atlas.   */
export type EStatus =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";

/** Reference to a document within Atlas with optional name and document number for display reasons.  */
export type Finding = {
  comment: Maybe<Scalars["String"]["output"]>;
  isAligned: Scalars["Boolean"]["output"];
};

export type RemoveAdditionalGuidanceInput = {
  /** Add your inputs here */
  additionalGuidance: Scalars["String"]["input"];
};

export type RemoveContextDataInput = {
  /** Add your inputs here */
  id: Scalars["PHID"]["input"];
};

export type RemoveParentInput = {
  /** Add your inputs here */
  parent?: InputMaybe<Array<Scalars["PHID"]["input"]>>;
};

export type RemoveReferenceInput = {
  /** Add your inputs here */
  reference?: InputMaybe<Scalars["PHID"]["input"]>;
};

export type RemoveTagsInput = {
  /** Add your inputs here */
  tags: Array<EGlobalTag | `${EGlobalTag}`>;
};

export type SetAtlasTypeInput = {
  /** Add your inputs here */
  atlasType: EAtlasType | `${EAtlasType}`;
};

export type SetContentInput = {
  /** Add your inputs here */
  content: Scalars["String"]["input"];
};

export type SetDocNumberInput = {
  /** Add your inputs here */
  docNo: Scalars["String"]["input"];
};

export type SetExploratoryNameInput = {
  /** Add your inputs here */
  name: Scalars["String"]["input"];
};

export type SetFindingsInput = {
  comment: Scalars["String"]["input"];
  /** Add your inputs here */
  isAligned: Scalars["Boolean"]["input"];
};

export type SetMasterStatusInput = {
  /** Add your inputs here */
  masterStatus: EStatus | `${EStatus}`;
};

export type SetNotionIdInput = {
  /** Add your inputs here */
  notionID?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetParentInput = {
  /** Add your inputs here */
  parent?: InputMaybe<Array<Scalars["PHID"]["input"]>>;
};

export type SetProvenanceInput = {
  /** Add your inputs here */
  provenance?: InputMaybe<Scalars["URL"]["input"]>;
};

export type SetReferenceInput = {
  /** Add your inputs here */
  newReference?: InputMaybe<Scalars["PHID"]["input"]>;
};
