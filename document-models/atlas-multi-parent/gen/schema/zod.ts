import { z } from "zod";
import type {
  AddContextDataInput,
  AddParentInput,
  AddTagsInput,
  AtlasMultiParentState,
  MAtlasType,
  MDocumentLink,
  MGlobalTag,
  MStatus,
  RemoveContextDataInput,
  RemoveParentInput,
  RemoveTagsInput,
  ReplaceContextDataInput,
  ReplaceParentInput,
  SetAtlasTypeInput,
  SetContentInput,
  SetMasterStatusInput,
  SetNameInput,
  SetNotionIdInput,
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

export const MAtlasTypeSchema = z.enum(["ANNOTATION", "NEEDED_RESEARCH"]);

export const MGlobalTagSchema = z.enum([
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

export const MStatusSchema = z.enum([
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

export function AddParentInputSchema(): z.ZodObject<
  Properties<AddParentInput>
> {
  return z.object({
    docNo: z.string().nullish(),
    id: z.string(),
    title: z.string().nullish(),
  });
}

export function AddTagsInputSchema(): z.ZodObject<Properties<AddTagsInput>> {
  return z.object({
    tags: z.array(MGlobalTagSchema),
  });
}

export function AtlasMultiParentStateSchema(): z.ZodObject<
  Properties<AtlasMultiParentState>
> {
  return z.object({
    __typename: z.literal("AtlasMultiParentState").optional(),
    atlasType: MAtlasTypeSchema,
    content: z.string().nullable(),
    globalTags: z.array(MGlobalTagSchema),
    masterStatus: MStatusSchema,
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(MDocumentLinkSchema()),
    parents: z.array(MDocumentLinkSchema()),
  });
}

export function MDocumentLinkSchema(): z.ZodObject<Properties<MDocumentLink>> {
  return z.object({
    __typename: z.literal("MDocumentLink").optional(),
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

export function RemoveParentInputSchema(): z.ZodObject<
  Properties<RemoveParentInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveTagsInputSchema(): z.ZodObject<
  Properties<RemoveTagsInput>
> {
  return z.object({
    tags: z.array(MGlobalTagSchema),
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

export function ReplaceParentInputSchema(): z.ZodObject<
  Properties<ReplaceParentInput>
> {
  return z.object({
    docNo: z.string().nullish(),
    id: z.string(),
    prevID: z.string(),
    title: z.string().nullish(),
  });
}

export function SetAtlasTypeInputSchema(): z.ZodObject<
  Properties<SetAtlasTypeInput>
> {
  return z.object({
    atlasType: MAtlasTypeSchema,
  });
}

export function SetContentInputSchema(): z.ZodObject<
  Properties<SetContentInput>
> {
  return z.object({
    content: z.string(),
  });
}

export function SetMasterStatusInputSchema(): z.ZodObject<
  Properties<SetMasterStatusInput>
> {
  return z.object({
    masterStatus: MStatusSchema,
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
    notionId: z.string(),
  });
}
