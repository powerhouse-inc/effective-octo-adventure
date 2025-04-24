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

export type AddNotionIdInput = {
  notionId: Scalars["String"]["input"];
  phid: Scalars["PHID"]["input"];
};

/**
 * Issues are comprised of Comments.
 *
 * When an Issue is first created, it is empty and has no comments. Users can then submit comments which are associated with a given issue.
 *
 * A comment refers to a specific item from the Atlas. This field is required, but can be changed later.
 */
export type AtlasFeedbackComment = {
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  creatorAddress: Scalars["EthereumAddress"]["output"];
  lastEditedAt: Scalars["DateTime"]["output"];
  notionId: Scalars["String"]["output"];
  phid: Scalars["PHID"]["output"];
};

/**
 * An issue that has been submitted to the Atlas.
 *
 * Holds a list of comments pertaining to specific items in the Atlas.
 *
 * Uses the same identifiers to register the relevant content as are used in the Atlas itself. These identifiers are the UUID's used by Notion, sometimes with a suffix of a part of the item's parent for cases where multiple parents exist.
 *
 * The relevant Notion IDs are separate from the Notion IDs referenced in the Comments themselves, because we might want to determine the scope of the Issue's content before any actual comments are added yet.
 */
export type AtlasFeedbackIssue = {
  comments: Array<AtlasFeedbackComment>;
  createdAt: Scalars["DateTime"]["output"];
  creatorAddress: Scalars["EthereumAddress"]["output"];
  notionIds: Array<Scalars["String"]["output"]>;
  phid: Scalars["PHID"]["output"];
};

export type AtlasFeedbackIssuesState = {
  /** The list of issues submitted to the Atlas. */
  issues: Array<AtlasFeedbackIssue>;
};

export type CreateCommentInput = {
  content: Scalars["String"]["input"];
  createdAt: Scalars["DateTime"]["input"];
  issuePhid: Scalars["PHID"]["input"];
  notionId: Scalars["String"]["input"];
  phid: Scalars["PHID"]["input"];
};

export type CreateIssueInput = {
  createdAt: Scalars["DateTime"]["input"];
  notionIds: Array<InputMaybe<Scalars["String"]["input"]>>;
  phid: Scalars["PHID"]["input"];
};

export type DeleteCommentInput = {
  issuePhid: Scalars["PHID"]["input"];
  phid: Scalars["PHID"]["input"];
};

export type DeleteIssueInput = {
  phid: Scalars["PHID"]["input"];
};

export type EditCommentInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  editedAt: Scalars["DateTime"]["input"];
  issuePhid: Scalars["PHID"]["input"];
  notionId?: InputMaybe<Scalars["String"]["input"]>;
  phid: Scalars["PHID"]["input"];
};

export type RemoveNotionIdInput = {
  notionId: Scalars["String"]["input"];
  phid: Scalars["PHID"]["input"];
};
