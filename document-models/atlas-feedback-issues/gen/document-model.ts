import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  id: "makerdao/feedback-issues",
  name: "Atlas Feedback Issues",
  extension: ".phdm",
  description:
    "Provide feedback on the data presented in the Atlas in a decentralized way.",
  author: {
    name: "powerhouse",
    website: "https://powerhouse.inc",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            'type AtlasFeedbackIssuesState {\n  """\n  The list of issues submitted to the Atlas.\n  """\n  issues: [Issue!]!\n}\n\n"""\nAn issue that has been submitted to the Atlas.\n\nHolds a list of comments pertaining to specific items in the Atlas.\n\nUses the same identifiers to register the relevant content as are used in the Atlas itself. These identifiers are the UUID\'s used by Notion, sometimes with a suffix of a part of the item\'s parent for cases where multiple parents exist.\n\nThe relevant Notion IDs are separate from the Notion IDs referenced in the Comments themselves, because we might want to determine the scope of the Issue\'s content before any actual comments are added yet.\n"""\ntype Issue {\n  phid: PHID!\n  creatorAddress: EthereumAddress!\n  notionIds: [String!]!\n  createdAt: DateTime!\n  comments: [Comment!]!\n}\n\n"""\nIssues are comprised of Comments.\n\nWhen an Issue is first created, it is empty and has no comments. Users can then submit comments which are associated with a given issue.\n\nA comment refers to a specific item from the Atlas. This field is required, but can be changed later. \n"""\ntype Comment {\n  phid: PHID!\n  creatorAddress: EthereumAddress!\n  notionId: String!\n  content: String!\n  createdAt: DateTime!\n  lastEditedAt: DateTime!\n}',
          initialValue: '"{\\n  \\"issues\\": []\\n}"',
          examples: [],
        },
        local: {
          schema: "",
          initialValue: '""',
          examples: [],
        },
      },
      modules: [
        {
          id: "YZJPZidNMq9cQt48o60KMbzVZk0=",
          name: "issues",
          description: "",
          operations: [
            {
              id: "S6/a+9eF+PPBQFoCY4m8Ip4KH/Y=",
              name: "CREATE_ISSUE",
              description: "Create a new issue",
              schema:
                "input CreateIssueInput {\n  phid: PHID!\n  notionIds: [String]!\n  createdAt: DateTime!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "CqeN1/sU6fVP5ZJQ6xrhwlzwd8o=",
              name: "DELETE_ISSUE",
              description: "Delete an issue",
              schema: "input DeleteIssueInput {\n  phid: PHID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "V73o2ytGItUtVjP6MIZcL0wQO18=",
              name: "ADD_NOTION_ID",
              description: "",
              schema:
                "input AddNotionIdInput {\n  phid: PHID!\n  notionId: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "wyd6+UZr08r07DnTf6lF2JA5QXU=",
              name: "REMOVE_NOTION_ID",
              description: "",
              schema:
                "input RemoveNotionIdInput {\n  phid: PHID!\n  notionId: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "Z0AAnbI03Ii8Ql4CTOxjHYqC34s=",
          name: "comments",
          description: "",
          operations: [
            {
              id: "eGouUlpibah0LAI8s7kUxz/lh4s=",
              name: "CREATE_COMMENT",
              description: "Add a comment to an issue",
              schema:
                "input CreateCommentInput {\n  phid: PHID!\n  issuePhid: PHID!\n  notionId: String!\n  content: String!\n  createdAt: DateTime!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "Rvml7RPRvL9rrLkAwEbVJEbBWTQ=",
              name: "DELETE_COMMENT",
              description: "Delete a comment from an issue",
              schema:
                "input DeleteCommentInput {\n  phid: PHID!\n  issuePhid: PHID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "rJi+/Ju9rwI+k39Q4RrsFAH1lRI=",
              name: "EDIT_COMMENT",
              description: "Edit a comment in an issue",
              schema:
                "input EditCommentInput {\n  phid: PHID!\n  issuePhid: PHID!\n  notionId: String\n  content: String\n  editedAt: DateTime!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
    },
  ],
};
