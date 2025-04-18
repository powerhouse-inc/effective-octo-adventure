import viewTreeData from "../data/view-node-tree.json" with { type: "json" };
import documentIndexData from "../data/parsed/all-items.json" with { type: "json" };
import {
  type ViewTree,
  type ParsedNotionDocumentIndex,
  type ParsedNotionDocumentType,
  type ParsedNotionDocument,
  type ParsedNotionDocumentContent,
  type ViewTreeContentValue,
  type ViewTreeContentSegment,
} from "../scripts/apply-changes/atlas-base/NotionTypes.js";

export const viewTree: ViewTree = viewTreeData as unknown as ViewTree;
export const documentIndex =
  documentIndexData as unknown as ParsedNotionDocumentIndex;

export const getEmptyNotionDocument = (
  notionId: string,
  type: ParsedNotionDocumentType,
): ParsedNotionDocument => ({
  id: notionId,
  type: type,
  docNo: "",
  name: "",
  content: [],
  children: [],
  files: [],
  masterStatus: [],
  masterStatusNames: [],
  hubUrls: [],
  parents: [],
  number: null,
});

export const getOriginalNotionDocument = (
  notionId: string,
  type: ParsedNotionDocumentType,
) => {
  const notionDoc =
    documentIndex[notionId] || getEmptyNotionDocument(notionId, type);

  return notionDoc;
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
