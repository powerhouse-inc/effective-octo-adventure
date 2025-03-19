import { z } from "zod";
import type {
  AddContextDataInput,
  AddTagsInput,
  AtlasScopeState,
  DocumentInfo,
  GlobalTag,
  RemoveContextDataInput,
  RemoveTagsInput,
  SetContentInput,
  SetDocNumberInput,
  SetMasterStatusInput,
  SetNotionIdInput,
  SetProvenanceInput,
  SetScopeNameInput,
  Status,
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

export const GlobalTagSchema = z.enum([
  "ANON_WORKFORCE",
  "AVC",
  "CAIS",
  "DAO_TOOLKIT",
  "ECOSYSTEM_INTELLIGENCE",
  "EXTERNAL_REFERENCE",
  "FACILITATORDAO",
  "INTERNAL_REFERENCE",
  "LEGACY_TERM_USE_APPROVED",
  "ML_DEFER",
  "ML_HIGH_PRIORITY",
  "ML_LOW_PRIORITY",
  "ML_MED_PRIORITY",
  "ML_SUPPORT_DOCS_NEEDED",
  "NEWCHAIN",
  "P0_HUB_ENTRY_NEEDED",
  "PURPOSE_SYSTEM",
  "RECURSIVE_IMPROVEMENT",
  "SCOPE_ADVISOR",
  "SUBDAO_INCUBATION",
  "SUBDAO_REWARDS",
  "TWO_STAGE_BRIDGE",
  "V1_MIP",
]);

export const StatusSchema = z.enum([
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
    newTags: z.array(GlobalTagSchema),
  });
}

export function AtlasScopeStateSchema(): z.ZodObject<
  Properties<AtlasScopeState>
> {
  return z.object({
    __typename: z.literal("AtlasScopeState").optional(),
    content: z.string().nullable(),
    docNo: z.string().nullable(),
    globalTags: z.array(GlobalTagSchema),
    masterStatus: StatusSchema.nullable(),
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(DocumentInfoSchema()),
    provenance: z.string().url().nullable(),
  });
}

export function DocumentInfoSchema(): z.ZodObject<Properties<DocumentInfo>> {
  return z.object({
    __typename: z.literal("DocumentInfo").optional(),
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

export function RemoveTagsInputSchema(): z.ZodObject<
  Properties<RemoveTagsInput>
> {
  return z.object({
    tags: z.array(GlobalTagSchema),
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
    masterStatus: StatusSchema,
  });
}

export function SetNotionIdInputSchema(): z.ZodObject<
  Properties<SetNotionIdInput>
> {
  return z.object({
    notionID: z.string().nullish(),
  });
}

export function SetProvenanceInputSchema(): z.ZodObject<
  Properties<SetProvenanceInput>
> {
  return z.object({
    provenance: z.string().url().nullish(),
  });
}

export function SetScopeNameInputSchema(): z.ZodObject<
  Properties<SetScopeNameInput>
> {
  return z.object({
    name: z.string(),
  });
}
