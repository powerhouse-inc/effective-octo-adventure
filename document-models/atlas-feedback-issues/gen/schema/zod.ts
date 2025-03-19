import { z } from "zod";
import type {
  AddNotionIdInput,
  AtlasFeedbackComment,
  AtlasFeedbackIssue,
  AtlasFeedbackIssuesState,
  CreateCommentInput,
  CreateIssueInput,
  DeleteCommentInput,
  DeleteIssueInput,
  EditCommentInput,
  RemoveNotionIdInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddNotionIdInputSchema(): z.ZodObject<
  Properties<AddNotionIdInput>
> {
  return z.object({
    notionId: z.string(),
    phid: z.string(),
  });
}

export function AtlasFeedbackCommentSchema(): z.ZodObject<
  Properties<AtlasFeedbackComment>
> {
  return z.object({
    __typename: z.literal("AtlasFeedbackComment").optional(),
    content: z.string(),
    createdAt: z.string().datetime(),
    creatorAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      }),
    lastEditedAt: z.string().datetime(),
    notionId: z.string(),
    phid: z.string(),
  });
}

export function AtlasFeedbackIssueSchema(): z.ZodObject<
  Properties<AtlasFeedbackIssue>
> {
  return z.object({
    __typename: z.literal("AtlasFeedbackIssue").optional(),
    comments: z.array(AtlasFeedbackCommentSchema()),
    createdAt: z.string().datetime(),
    creatorAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      }),
    notionIds: z.array(z.string()),
    phid: z.string(),
  });
}

export function AtlasFeedbackIssuesStateSchema(): z.ZodObject<
  Properties<AtlasFeedbackIssuesState>
> {
  return z.object({
    __typename: z.literal("AtlasFeedbackIssuesState").optional(),
    issues: z.array(AtlasFeedbackIssueSchema()),
  });
}

export function CreateCommentInputSchema(): z.ZodObject<
  Properties<CreateCommentInput>
> {
  return z.object({
    content: z.string(),
    createdAt: z.string().datetime(),
    issuePhid: z.string(),
    notionId: z.string(),
    phid: z.string(),
  });
}

export function CreateIssueInputSchema(): z.ZodObject<
  Properties<CreateIssueInput>
> {
  return z.object({
    createdAt: z.string().datetime(),
    notionIds: z.array(z.string().nullable()),
    phid: z.string(),
  });
}

export function DeleteCommentInputSchema(): z.ZodObject<
  Properties<DeleteCommentInput>
> {
  return z.object({
    issuePhid: z.string(),
    phid: z.string(),
  });
}

export function DeleteIssueInputSchema(): z.ZodObject<
  Properties<DeleteIssueInput>
> {
  return z.object({
    phid: z.string(),
  });
}

export function EditCommentInputSchema(): z.ZodObject<
  Properties<EditCommentInput>
> {
  return z.object({
    content: z.string().nullish(),
    editedAt: z.string().datetime(),
    issuePhid: z.string(),
    notionId: z.string().nullish(),
    phid: z.string(),
  });
}

export function RemoveNotionIdInputSchema(): z.ZodObject<
  Properties<RemoveNotionIdInput>
> {
  return z.object({
    notionId: z.string(),
    phid: z.string(),
  });
}
