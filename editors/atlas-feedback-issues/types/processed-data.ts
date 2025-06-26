import { z } from "zod";

export const RichTextAnnotations = z
  .object({
    bold: z.boolean().nullish(),
    italic: z.boolean().nullish(),
    strikethrough: z.boolean().nullish(),
    underline: z.boolean().nullish(),
    code: z.boolean().nullish(),
    color: z.string().nullish(),
  })
  .nullish();

export const ProcessedRichText = z.array(
  z.object({
    type: z
      .union([z.literal("text"), z.literal("equation"), z.literal("mention")])
      .nullish(),
    text: z
      .object({
        link: z
          .object({
            url: z.string().nullish(),
          })
          .nullish(),
      })
      .nullish(),
    url: z.string().nullish(),
    plain_text: z.string().nullish(),
    annotations: RichTextAnnotations,
    mention: z
      .object({
        type: z.string().nullish(),
        page: z
          .object({
            id: z.string().nullish(),
          })
          .nullable()
          .optional(),
      })
      .nullable()
      .optional(),
  }),
);

export const NodeContent = z.array(
  z.object({
    heading: z.string().nullish(),
    text: ProcessedRichText.or(z.string()).nullish(),
  }),
);

export type TNodeContent = z.infer<typeof NodeContent>;

export const ProcessedFile = z.object({
  url: z.string(),
});

export type TProcessedFile = z.infer<typeof ProcessedFile>;
