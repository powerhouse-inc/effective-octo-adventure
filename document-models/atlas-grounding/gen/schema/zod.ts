import { z } from "zod";
import type {
  AddContextDataInput,
  AddTagsInput,
  AtlasGroundingState,
  GAtlasType,
  GDocumentLink,
  GGlobalTag,
  GStatus,
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

export const GAtlasTypeSchema = z.enum([
  "ACTIVE_DATA",
  "ORIGINAL_CONTEXT_DATA",
  "TENET",
]);

export const GGlobalTagSchema = z.enum([
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

export const GStatusSchema = z.enum([
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
    title: z.string().nullish(),
  });
}

export function AddTagsInputSchema(): z.ZodObject<Properties<AddTagsInput>> {
  return z.object({
    tags: z.array(GGlobalTagSchema),
  });
}

export function AtlasGroundingStateSchema(): z.ZodObject<
  Properties<AtlasGroundingState>
> {
  return z.object({
    __typename: z.literal("AtlasGroundingState").optional(),
    atlasType: GAtlasTypeSchema,
    content: z.string().nullable(),
    docNo: z.string().nullable(),
    globalTags: z.array(GGlobalTagSchema),
    masterStatus: GStatusSchema,
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(GDocumentLinkSchema()),
    parent: GDocumentLinkSchema(),
  });
}

export function GDocumentLinkSchema(): z.ZodObject<Properties<GDocumentLink>> {
  return z.object({
    __typename: z.literal("GDocumentLink").optional(),
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
    tags: z.array(GGlobalTagSchema),
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
    atlasType: GAtlasTypeSchema,
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
    masterStatus: GStatusSchema,
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
