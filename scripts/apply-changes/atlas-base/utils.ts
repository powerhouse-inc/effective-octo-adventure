import { type Maybe } from "graphql-ts-client";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";

export const extractDocNoAndTitle = (docNo: string, name: string) => {
  if (name.length > 0) {
    return [docNo.trim(), name.trim()];
  }

  const dashPosition = docNo.indexOf("-");
  if (dashPosition < 0) {
    return [docNo.trim(), name.trim()];
  }

  return [
    docNo.substring(0, dashPosition).trim(),
    docNo.substring(dashPosition + 1).trim(),
  ];
};

type Link = {
  id: string;
  docNo: Maybe<string>;
  title: Maybe<string>;
};

export const findAtlasParentInCache = (
  input: ViewNode,
  cache: DocumentsCache,
) => {
  // "id": "4281ab93-ef4f-4974-988d-7dad149a693d",


  let parent: Maybe<Link> = null;
  const parents = input.ancestorSlugSuffixes?.map(slugSuffix => slugSuffix.split("|")[0])?.filter(id => !!id) ?? [];
  for (let i = 0; (parent === null && i < parents.length); i++) {
    const parentDocIds = cache.resolveInputId(parents[i]);
    if (parentDocIds.length) {
      const parentDoc = cache.searchDocument(parentDocIds[0]);
      if (parentDoc) {
        parent = {
          id: parentDoc.id,
          title: parentDoc.name || null,
          docNo: (parentDoc.state as any)?.docNo || null,
        };
      }
    }
  }

  if (parent === null) {
    console.log(
      `Can't find the parent in document cache: ${input.ancestorSlugSuffixes?.join(",")}`,
    );
  }

  return parent;
};
