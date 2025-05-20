import { type Maybe } from "graphql-ts-client";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { getDocumentIcon } from "../../../document-models/utils.js";

export type Link = {
  id: string;
  docNo: Maybe<string>;
  title: Maybe<string>;
  documentType: Maybe<string>;
  icon: Maybe<string>;
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
      title: parentDoc.name || "",
      docNo: (parentDoc.state as any)?.docNo || "",
      documentType: parentDoc.documentType,
      icon: getDocumentIcon(
        parentDoc.documentType,
        (parentDoc.state as any).atlasType,
      ),
    };
  }

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
    case "PROVISIONAL":
    case "APPROVED":
    case "DEFERRED":
    case "ARCHIVED":
      return status.toUpperCase();
    default:
      throw new Error("Unknown scope status: " + status);
  }
};

export const processMarkdownContent = (content: string): string => {
  const processor = unified()
    .use(remarkParse)
    .use(() => (tree) => {
      visit(tree, "link", (node: any) => {
        if (!!node.url) {
          const isRelative = node.url.startsWith("./");
          const isRootRelative =
            node.url.startsWith("/") && !node.url.startsWith("//");

          if (isRelative || isRootRelative) {
            // Prepend the base URL
            // If the original URL was "./path", it becomes "baseUrl/path"
            // If the original URL was "/path", it becomes "baseUrl/path"
            const pathPart = isRelative
              ? node.url.substring(2)
              : node.url.substring(1);
            const baseUrl = process.env.ATLAS_BASE_URL || "https://sky-atlas.powerhouse.io";
            node.url = `${baseUrl}/${pathPart}`;
          }
        }
      });
    })
    .use(remarkStringify);

  const file = processor.processSync(content);
  return String(file);
};
