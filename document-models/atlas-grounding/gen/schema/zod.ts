import { z } from "zod";
import type {
  AddContextDataInput,
  AddReferenceInput,
  AddTagsInput,
  AtlasGroundingState,
  GAtlasType,
  GDocumentLink,
  GGlobalTag,
  GStatus,
  RemoveContextDataInput,
  RemoveReferenceInput,
  RemoveTagsInput,
  SetAtlasTypeInput,
  SetContentInput,
  SetDocNumberInput,
  SetGroundingNameInput,
  SetMasterStatusInput,
  SetNotionIdInput,
  SetParentInput,
  SetProvenanceInput,
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
    name: z.string().nullish(),
  });
}

export function AddReferenceInputSchema(): z.ZodObject<
  Properties<AddReferenceInput>
> {
  return z.object({
    docNo: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
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
    provenance: z.array(z.string().url()),
    references: z.array(GDocumentLinkSchema()),
  });
}

export function GDocumentLinkSchema(): z.ZodObject<Properties<GDocumentLink>> {
  return z.object({
    __typename: z.literal("GDocumentLink").optional(),
    docNo: z.string().nullable(),
    id: z.string(),
    name: z.string().nullable(),
  });
}

export function RemoveContextDataInputSchema(): z.ZodObject<
  Properties<RemoveContextDataInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveReferenceInputSchema(): z.ZodObject<
  Properties<RemoveReferenceInput>
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

export function SetDocNumberInputSchema(): z.ZodObject<
  Properties<SetDocNumberInput>
> {
  return z.object({
    docNo: z.string(),
  });
}

export function SetGroundingNameInputSchema(): z.ZodObject<
  Properties<SetGroundingNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function SetMasterStatusInputSchema(): z.ZodObject<
  Properties<SetMasterStatusInput>
> {
  return z.object({
    masterStatus: GStatusSchema,
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
    name: z.string().nullish(),
  });
}

export function SetProvenanceInputSchema(): z.ZodObject<
  Properties<SetProvenanceInput>
> {
  return z.object({
    provenance: z.array(z.string().url()),
  });
}
