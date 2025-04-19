import { z } from "zod";
import type {
  AddContextDataInput,
  AddTagsInput,
  AtlasFoundationState,
  FAtlasType,
  FDocumentLink,
  FGlobalTag,
  FStatus,
  RemoveContextDataInput,
  RemoveTagsInput,
  ReplaceContextDataInput,
  SetAtlasTypeInput,
  SetContentInput,
  SetDocumentNumberInput,
  SetMasterStatusInput,
  SetNameInput,
  SetNotionIdInput,
  SetParentInput,
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

export const FAtlasTypeSchema = z.enum([
  "ACTIVE_DATA_CONTROLLER",
  "ARTICLE",
  "CORE",
  "SECTION",
]);

export const FGlobalTagSchema = z.enum([
  "AVC",
  "CAIS",
  "DAO_TOOLKIT",
  "ECOSYSTEM_INTELLIGENCE",
  "EXTERNAL_REFERENCE",
  "LEGACY_TERM_USE_APPROVED",
  "ML_DEFER",
  "ML_LOW_PRIORITY",
  "ML_SUPPORT_DOCS_NEEDED",
  "NEWCHAIN",
  "PURPOSE_SYSTEM",
  "RECURSIVE_IMPROVEMENT",
  "SCOPE_ADVISOR",
  "TWO_STAGE_BRIDGE",
]);

export const FStatusSchema = z.enum([
  "APPROVED",
  "ARCHIVED",
  "DEFERRED",
  "PLACEHOLDER",
  "PROVISIONAL",
]);

export function AddContextDataInputSchema(): z.ZodObject<
  Properties<AddContextDataInput>
> {
  return z.object({
    docNo: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function AddTagsInputSchema(): z.ZodObject<Properties<AddTagsInput>> {
  return z.object({
    tags: z.array(FGlobalTagSchema),
  });
}

export function AtlasFoundationStateSchema(): z.ZodObject<
  Properties<AtlasFoundationState>
> {
  return z.object({
    __typename: z.literal("AtlasFoundationState").optional(),
    atlasType: FAtlasTypeSchema,
    content: z.string().nullable(),
    docNo: z.string().nullable(),
    globalTags: z.array(FGlobalTagSchema),
    masterStatus: FStatusSchema,
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(FDocumentLinkSchema()),
    parent: FDocumentLinkSchema().nullable(),
  });
}

export function FDocumentLinkSchema(): z.ZodObject<Properties<FDocumentLink>> {
  return z.object({
    __typename: z.literal("FDocumentLink").optional(),
    docNo: z.string().nullable(),
    id: z.string(),
    title: z.string().nullable(),
  });
}

export function RemoveContextDataInputSchema(): z.ZodObject<
  Properties<RemoveContextDataInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveTagsInputSchema(): z.ZodObject<
  Properties<RemoveTagsInput>
> {
  return z.object({
    tags: z.array(FGlobalTagSchema),
  });
}

export function ReplaceContextDataInputSchema(): z.ZodObject<
  Properties<ReplaceContextDataInput>
> {
  return z.object({
    docNo: z.string().nullish(),
    id: z.string(),
    prevId: z.string(),
    title: z.string().nullish(),
  });
}

export function SetAtlasTypeInputSchema(): z.ZodObject<
  Properties<SetAtlasTypeInput>
> {
  return z.object({
    atlasType: FAtlasTypeSchema,
  });
}

export function SetContentInputSchema(): z.ZodObject<
  Properties<SetContentInput>
> {
  return z.object({
    content: z.string(),
  });
}

export function SetDocumentNumberInputSchema(): z.ZodObject<
  Properties<SetDocumentNumberInput>
> {
  return z.object({
    docNo: z.string().nullish(),
  });
}

export function SetMasterStatusInputSchema(): z.ZodObject<
  Properties<SetMasterStatusInput>
> {
  return z.object({
    masterStatus: FStatusSchema,
  });
}

export function SetNameInputSchema(): z.ZodObject<Properties<SetNameInput>> {
  return z.object({
    name: z.string(),
  });
}

export function SetNotionIdInputSchema(): z.ZodObject<
  Properties<SetNotionIdInput>
> {
  return z.object({
    notionID: z.string(),
  });
}

export function SetParentInputSchema(): z.ZodObject<
  Properties<SetParentInput>
> {
  return z.object({
    docNo: z.string().nullish(),
    id: z.string(),
    title: z.string().nullish(),
  });
}
