import { gql } from "graphql-tag";

export const schema = gql`
  """
  Subgraph definition for AtlasFeedbackIssues (makerdao/feedback-issues)
  """
  type AtlasFeedbackIssuesState {
    """
    The list of issues submitted to the Atlas.
    """
    issues: [Issue!]!
  }

  """
  An issue that has been submitted to the Atlas.

  Holds a list of comments pertaining to specific items in the Atlas.

  Uses the same identifiers to register the relevant content as are used in the Atlas itself. These identifiers are the UUID's used by Notion, sometimes with a suffix of a part of the item's parent for cases where multiple parents exist.

  The relevant Notion IDs are separate from the Notion IDs referenced in the Comments themselves, because we might want to determine the scope of the Issue's content before any actual comments are added yet.
  """
  type Issue {
    phid: PHID!
    creatorAddress: EthereumAddress!
    notionIds: [String!]!
    createdAt: DateTime!
    comments: [Comment!]!
  }

  """
  Issues are comprised of Comments.

  When an Issue is first created, it is empty and has no comments. Users can then submit comments which are associated with a given issue.

  A comment refers to a specific item from the Atlas. This field is required, but can be changed later.
  """
  type Comment {
    phid: PHID!
    creatorAddress: EthereumAddress!
    notionId: String!
    content: String!
    createdAt: DateTime!
    lastEditedAt: DateTime!
  }

  """
  Mutations: AtlasFeedbackIssues
  """
  type Mutation {
    AtlasFeedbackIssues_createDocument(driveId: String, name: String): String

    AtlasFeedbackIssues_createIssue(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_CreateIssueInput
    ): Int
    AtlasFeedbackIssues_deleteIssue(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_DeleteIssueInput
    ): Int
    AtlasFeedbackIssues_addNotionId(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_AddNotionIdInput
    ): Int
    AtlasFeedbackIssues_removeNotionId(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_RemoveNotionIdInput
    ): Int
    AtlasFeedbackIssues_createComment(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_CreateCommentInput
    ): Int
    AtlasFeedbackIssues_deleteComment(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_DeleteCommentInput
    ): Int
    AtlasFeedbackIssues_editComment(
      driveId: String
      docId: PHID
      input: AtlasFeedbackIssues_EditCommentInput
    ): Int
  }

  """
  Module: Issues
  """
  input AtlasFeedbackIssues_CreateIssueInput {
    phid: PHID!
    notionIds: [String]!
    createdAt: DateTime!
  }
  input AtlasFeedbackIssues_DeleteIssueInput {
    phid: PHID!
  }
  input AtlasFeedbackIssues_AddNotionIdInput {
    phid: PHID!
    notionId: String!
  }
  input AtlasFeedbackIssues_RemoveNotionIdInput {
    phid: PHID!
    notionId: String!
  }

  """
  Module: Comments
  """
  input AtlasFeedbackIssues_CreateCommentInput {
    phid: PHID!
    issuePhid: PHID!
    notionId: String!
    content: String!
    createdAt: DateTime!
  }
  input AtlasFeedbackIssues_DeleteCommentInput {
    phid: PHID!
    issuePhid: PHID!
  }
  input AtlasFeedbackIssues_EditCommentInput {
    phid: PHID!
    issuePhid: PHID!
    notionId: String
    content: String
    editedAt: DateTime!
  }
`;
