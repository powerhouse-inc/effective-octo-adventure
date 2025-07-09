import {
  type ParsedNotionDocument,
  type ParsedNotionDocumentContent,
  type ViewTreeContentValue,
  type ViewTreeContentSegment,
} from "../scripts/apply-changes/atlas-base/NotionTypes.js";
import type { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import path from "path";
import fs from "fs";
import { type IconName } from "@powerhousedao/design-system";
import { fetchAllData } from "../scripts/fetch-data/fetch.js";

/**
 * Returns the atlas data from the local file system dynamically.
 */
export const getAtlasData = async () => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  // if the data is not available, fetch it
  if (
    !fs.existsSync(path.resolve(__dirname, "../data/atlas-data-extended.json"))
  ) {
    console.log("Fetching Atlas Data");
    await fetchAllData();
  }

  const jsonPath = path.resolve(__dirname, "../data/atlas-data-extended.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(raw) as ViewNodeExtended[];
};

export const getPNDTitle = (
  notionDoc: ParsedNotionDocument,
  withNumber = true,
) => {
  return (withNumber ? notionDoc.docNo + " - " : "") + notionDoc.name;
};

export const pndContentToString = (
  content: ParsedNotionDocumentContent,
): string => {
  //const result: string[] = content.heading ? [content.heading] : [];
  const result: string[] = [];

  if (typeof content.text === "string") {
    result.push(content.text);
  } else {
    content.text.forEach((textElement) => {
      if (textElement.type === "mention") {
        result.push(`@notionId:${textElement.mention.page.id}`);
      } else if (textElement.text.link) {
        result.push(`[${textElement.text.content}](${textElement.text.link})`);
      } else {
        result.push(textElement.text.content);
      }
    });
  }

  return result
    .map((t) => t.trim())
    .join("\n")
    .trim();
};

export const viewNodeContentToString = (content: ViewTreeContentValue) => {
  let result = "";
  content.forEach((block) => {
    if (block.heading) {
      result += "\n\n#" + block.heading + "\n\n";
    }

    if (block.text) {
      result += block.text.map((s) => contentSegmentToString(s)).join("");
    }
  });

  return result + "\n";
};

export const contentSegmentToString = (segment: ViewTreeContentSegment) => {
  return segment.text;
};

export const getNodeDocNo = (node: ViewNodeExtended) => {
  const formalId = node.title.formalId;
  return `${formalId.prefix ?? ""}.${formalId.numberPath.join(".")}`;
};

export const getNodeName = (node: ViewNodeExtended) => {
  return node.title.title;
};

export const getNodeTitle = (node: ViewNodeExtended) => {
  return `${getNodeDocNo(node)} - ${getNodeName(node)}`;
};

export const getDocumentIcon = (
  documentType: string,
  atlasType: string,
): IconName => {
  if (documentType === "sky/atlas-set") {
    return "FolderClose";
  }

  const type = atlasType?.toLowerCase() || "scope";

  if (type === "neededResearch" || type === "needed_research") {
    return "Tube";
  } else if (type === "tenet") {
    return "Compass";
  } else if (type === "annotation") {
    return "Pencil";
  }

  return "File";
};
