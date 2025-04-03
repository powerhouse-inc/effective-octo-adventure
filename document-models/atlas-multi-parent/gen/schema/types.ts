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
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type AddParentInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type AddReferenceInput = {
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type AddTagsInput = {
  tags: Array<MGlobalTag | `${MGlobalTag}`>;
};

export type AtlasMultiParentState = {
  /**
   * The type of the Grounding document within Atlas.
   * Example: Tenet, Original Context Data, Active Data.
   */
  atlasType: MAtlasType | `${MAtlasType}`;
  /** Entire content body of the Grounding document within Atlas. */
  content: Maybe<Scalars["String"]["output"]>;
  /** Unique document number assigned to the Grounding document within Atlas.   */
  docNo: Maybe<Scalars["String"]["output"]>;
  /** Document tags managed by the Atlas Axis facilitator group for classification.   */
  globalTags: Array<MGlobalTag | `${MGlobalTag}`>;
  /** Master status of the Grounding document as managed by the Atlas Axis facilitator group.   */
  masterStatus: MStatus | `${MStatus}`;
  /** Full name of the Grounding document entity. */
  name: Maybe<Scalars["String"]["output"]>;
  /**
   * Original Notion document ID of the Grounding document.
   * Used for cross-system referencing and linking back to the original Notion source.
   */
  notionId: Maybe<Scalars["String"]["output"]>;
  /** List of Atlas documents that were relevant for the creation of this Grounding document.   */
  originalContextData: Array<MDocumentLink>;
  /**
   * Parent entity that this Grounding document belongs to.
   * This is a reference to another Atlas document.
   */
  parents: Array<MDocumentLink>;
  /** Link to the original P0hub Notion environment where this document was first created or referenced. */
  provenance: Array<Scalars["URL"]["output"]>;
  /** References to other Atlas entities that are linked to this Grounding document.   */
  references: Array<MDocumentLink>;
};

/** Domain (i.e., Atlas) specific document types with the same document model global schema.   */
export type MAtlasType = "ANNOTATION" | "NEEDED_RESEARCH";

/** Reference to a document within Atlas with optional name and document number for display reasons.  */
export type MDocumentLink = {
  docNo: Maybe<Scalars["String"]["output"]>;
  id: Scalars["PHID"]["output"];
  name: Maybe<Scalars["OLabel"]["output"]>;
};

/** These global tags are used for classification in Grounding documents.  */
export type MGlobalTag =
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

/** Defines the lifecycle stage of the Grounding document within Atlas. */
export type MStatus =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";

export type RemoveContextDataInput = {
  id: Scalars["PHID"]["input"];
};

export type RemoveParentInput = {
  id: Scalars["PHID"]["input"];
};

export type RemoveReferenceInput = {
  id: Scalars["PHID"]["input"];
};

export type RemoveTagsInput = {
  tags: Array<MGlobalTag | `${MGlobalTag}`>;
};

export type SetAtlasTypeInput = {
  atlasType: MAtlasType | `${MAtlasType}`;
};

export type SetContentInput = {
  content: Scalars["String"]["input"];
};

export type SetDocNumberInput = {
  docNo: Scalars["String"]["input"];
};

export type SetMasterStatusInput = {
  masterStatus: MStatus | `${MStatus}`;
};

export type SetMultiparentNameInput = {
  /** Add your inputs here */
  name: Scalars["String"]["input"];
};

export type SetNotionIdInput = {
  notionID: Scalars["String"]["input"];
};

export type SetProvenanceInput = {
  provenance: Array<Scalars["URL"]["input"]>;
};
