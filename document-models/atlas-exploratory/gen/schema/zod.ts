import { z } from "zod";
import type {
  AddAdditionalGuidanceInput,
  AddContextDataInput,
  AddTagsInput,
  AtlasExploratoryState,
  DocumentInfo,
  EAtlasType,
  EGlobalTag,
  EStatus,
  Finding,
  RemoveAdditionalGuidanceInput,
  RemoveContextDataInput,
  RemoveParentInput,
  RemoveTagsInput,
  SetAtlasTypeInput,
  SetContentInput,
  SetDocNumberInput,
  SetExploratoryNameInput,
  SetFindingsInput,
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

export const EAtlasTypeSchema = z.enum(["SCENARIO", "SCENARIO_VARIATION"]);

export const EGlobalTagSchema = z.enum([
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

export const EStatusSchema = z.enum([
  "APPROVED",
  "ARCHIVED",
  "DEFERRED",
  "PLACEHOLDER",
  "PROVISIONAL",
]);

export function AddAdditionalGuidanceInputSchema(): z.ZodObject<
  Properties<AddAdditionalGuidanceInput>
> {
  return z.object({
    additionalGuidance: z.string(),
  });
}

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
    newTags: z.array(EGlobalTagSchema),
  });
}

export function AtlasExploratoryStateSchema(): z.ZodObject<
  Properties<AtlasExploratoryState>
> {
  return z.object({
    __typename: z.literal("AtlasExploratoryState").optional(),
    additionalGuidance: z.string(),
    atlasType: EAtlasTypeSchema,
    content: z.string().nullish(),
    docNo: z.string().nullish(),
    findings: FindingSchema(),
    globalTags: z.array(EGlobalTagSchema),
    masterStatus: EStatusSchema,
    name: z.string().nullish(),
    notionId: z.string().nullish(),
    originalContextData: z.array(DocumentInfoSchema()),
    parent: z.string(),
    provenance: z.string().url().nullish(),
    references: z.array(z.string()),
  });
}

export function DocumentInfoSchema(): z.ZodObject<Properties<DocumentInfo>> {
  return z.object({
    __typename: z.literal("DocumentInfo").optional(),
    docNo: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function FindingSchema(): z.ZodObject<Properties<Finding>> {
  return z.object({
    __typename: z.literal("Finding").optional(),
    comment: z.string().nullish(),
    isAligned: z.boolean(),
  });
}

export function RemoveAdditionalGuidanceInputSchema(): z.ZodObject<
  Properties<RemoveAdditionalGuidanceInput>
> {
  return z.object({
    additionalGuidance: z.string(),
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
    parent: z.array(z.string()).nullish(),
  });
}

export function RemoveTagsInputSchema(): z.ZodObject<
  Properties<RemoveTagsInput>
> {
  return z.object({
    tags: z.array(EGlobalTagSchema),
  });
}

export function SetAtlasTypeInputSchema(): z.ZodObject<
  Properties<SetAtlasTypeInput>
> {
  return z.object({
    atlasType: EAtlasTypeSchema,
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

export function SetExploratoryNameInputSchema(): z.ZodObject<
  Properties<SetExploratoryNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function SetFindingsInputSchema(): z.ZodObject<
  Properties<SetFindingsInput>
> {
  return z.object({
    isAligned: z.boolean(),
  });
}

export function SetMasterStatusInputSchema(): z.ZodObject<
  Properties<SetMasterStatusInput>
> {
  return z.object({
    masterStatus: EStatusSchema,
  });
}

export function SetNotionIdInputSchema(): z.ZodObject<
  Properties<SetNotionIdInput>
> {
  return z.object({
    notionID: z.string().nullish(),
  });
}

export function SetParentInputSchema(): z.ZodObject<
  Properties<SetParentInput>
> {
  return z.object({
    parent: z.array(z.string()).nullish(),
  });
}

export function SetProvenanceInputSchema(): z.ZodObject<
  Properties<SetProvenanceInput>
> {
  return z.object({
    provenance: z.string().url().nullish(),
  });
}
