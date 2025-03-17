import { z } from "zod";
import {
  type AddContextDataInput,
  type AddParentInput,
  type AddReferenceInput,
  type AddTagsInput,
  type AtlasMultiParentState,
  MAtlasType,
  type MDocumentLink,
  MGlobalTag,
  MStatus,
  type RemoveContextDataInput,
  type RemoveParentInput,
  type RemoveReferenceInput,
  type RemoveTagsInput,
  type SetAtlasTypeInput,
  type SetContentInput,
  type SetDocNumberInput,
  type SetMasterStatusInput,
  type SetMultiparentNameInput,
  type SetNotionIdInput,
  type SetProvenanceInput,
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
    name: z.string().nullish(),
  });
}

export function AddParentInputSchema(): z.ZodObject<
  Properties<AddParentInput>
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
    docNo: z.string().nullable(),
    globalTags: z.array(MGlobalTagSchema),
    masterStatus: MStatusSchema,
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(MDocumentLinkSchema()),
    parents: z.array(MDocumentLinkSchema()),
    provenance: z.array(z.string().url()),
    references: z.array(MDocumentLinkSchema()),
  });
}

export function MDocumentLinkSchema(): z.ZodObject<Properties<MDocumentLink>> {
  return z.object({
    __typename: z.literal("MDocumentLink").optional(),
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

export function RemoveParentInputSchema(): z.ZodObject<
  Properties<RemoveParentInput>
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
    tags: z.array(MGlobalTagSchema),
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

export function SetDocNumberInputSchema(): z.ZodObject<
  Properties<SetDocNumberInput>
> {
  return z.object({
    docNo: z.string(),
  });
}

export function SetMasterStatusInputSchema(): z.ZodObject<
  Properties<SetMasterStatusInput>
> {
  return z.object({
    masterStatus: MStatusSchema,
  });
}

export function SetMultiparentNameInputSchema(): z.ZodObject<
  Properties<SetMultiparentNameInput>
> {
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

export function SetProvenanceInputSchema(): z.ZodObject<
  Properties<SetProvenanceInput>
> {
  return z.object({
    provenance: z.array(z.string().url()),
  });
}
