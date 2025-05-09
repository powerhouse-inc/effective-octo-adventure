import { type Maybe } from "graphql-ts-client";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import { pndContentToString } from "document-models/utils.js";

export type Link = {
  id: string;
  docNo: Maybe<string>;
  title: Maybe<string>;
};

export const findAtlasParentInCache = (
  input: ViewNode,
  cache: DocumentsCache
) => {
  if (!input.parentSlugSuffix) {
    return null; // no parent, probably a scope
  }

  let parent: Maybe<Link> = null;
  const parentInputId = input.parentSlugSuffix.split("|")[0];

  const parentDocIds = cache.resolveInputId(parentInputId);
  const parentDoc = cache.searchDocument(parentDocIds[0]);
  if (parentDoc) {
    parent = {
      id: parentDoc.id,
      title: parentDoc.name || null,
      docNo: (parentDoc.state as any)?.docNo || null,
    };
  }

  // TODO: previous implementation (not used anymore, but kept for reference)
  // for (let i = 0; (parent === null && i < parents.length); i++) {
  //   const parentDocIds = cache.resolveInputId(parents[i]);
  //   if (parentDocIds.length) {
  //     const parentDoc = cache.searchDocument(parentDocIds[0]);
  //     if (parentDoc) {
  //       parent = {
  //         id: parentDoc.id,
  //         title: parentDoc.name || null,
  //         docNo: (parentDoc.state as any)?.docNo || null,
  //       };
  //     }
  //   }
  // }

  if (parent === null) {
    console.log(
      `Can't find the parent in document cache: ${input.ancestorSlugSuffixes?.join(",")}`
    );
  }

  return parent;
};

export const statusStringToEnum = (status: string): string => {
  switch (status.toUpperCase()) {
    case "PLACEHOLDER":
      return "PLACEHOLDER";
    case "PROVISIONAL":
      return "PROVISIONAL";
    case "APPROVED":
      return "APPROVED";
    case "DEFERRED":
      return "DEFERRED";
    case "ARCHIVED":
      return "ARCHIVED";
    default:
      throw new Error("Unknown scope status: " + status);
  }
};

export function contentToMarkdown(blocks: any): string {
  const markdownLines: string[] = [];

  // Iterate over each block in the input array (e.g., a paragraph or a heading)
  for (const block of blocks) {
    if (Array.isArray(block.text)) {
      // This block is a paragraph composed of rich text items.
      let paragraphContent = "";
      for (const richTextItem of block.text) {
        let currentTextSegment = ""; // Holds the processed string for the current rich text item

        if (richTextItem.type === "text") {
          // Current item is a standard text segment
          currentTextSegment = richTextItem.text.content;

          // Apply annotations to the text segment
          if (richTextItem.annotations.bold) {
            currentTextSegment = `**${currentTextSegment}**`;
          }
          if (richTextItem.annotations.italic) {
            currentTextSegment = `*${currentTextSegment}*`;
          }
          if (richTextItem.annotations.strikethrough) {
            currentTextSegment = `~~${currentTextSegment}~~`;
          }
          if (richTextItem.annotations.code) {
            currentTextSegment = `\`${currentTextSegment}\``;
          }

          // Apply link, if present, to the (potentially annotated) text segment
          if (richTextItem.text.link) {
            currentTextSegment = `[${currentTextSegment}](${richTextItem.text.link})`;
          }
        } else if (richTextItem.type === "mention") {
          // Current item is a mention
          currentTextSegment = richTextItem.plain_text; // Use plain_text as the display text for the mention

          // Apply annotations to the mention's plain_text (though less common for mentions)
          if (richTextItem.annotations.bold) {
            currentTextSegment = `**${currentTextSegment}**`;
          }
          if (richTextItem.annotations.italic) {
            currentTextSegment = `*${currentTextSegment}*`;
          }
          if (richTextItem.annotations.strikethrough) {
            currentTextSegment = `~~${currentTextSegment}~~`;
          }
          if (richTextItem.annotations.code) {
            currentTextSegment = `\`${currentTextSegment}\``;
          }

          let pageId;

          if (richTextItem.mention.type === "page") {
            pageId = richTextItem.mention.page.id;
          } else if (richTextItem.mention.type === "database") {
            pageId = richTextItem.mention.database.id;
          } else if (richTextItem.mention.type === "workspace") {
            pageId = richTextItem.mention.workspace.id;
          }

          if (pageId) {
            currentTextSegment = `[${currentTextSegment}](https://sky-atlas.powerhouse.io/${pageId})`;
          } else {
            throw new Error("Unknown mention type: " + richTextItem.mention.type);
          }
        }
        paragraphContent += currentTextSegment; // Append the processed segment to the paragraph
      }
      // Add the composed paragraph to our markdown lines, if it's not empty.
      if (paragraphContent.trim() !== "") {
        markdownLines.push(paragraphContent);
      }
    } else if (
      typeof block.text === "string" &&
      block.text.trim() !== "" &&
      !block.heading
    ) {
      // This handles cases where a block might contain simple, non-rich text
      // (e.g. {"text": "Just a string"} ) and is not a heading.
      markdownLines.push(block.text);
    }
  }

  // Join all processed lines (paragraphs, headings) with double newlines
  // to ensure proper Markdown block separation.
  return markdownLines.join("\n\n");
}
