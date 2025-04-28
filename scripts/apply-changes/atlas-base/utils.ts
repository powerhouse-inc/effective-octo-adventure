import { type Maybe } from "graphql-ts-client";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";

export type Link = {
  id: string;
  docNo: Maybe<string>;
  title: Maybe<string>;
};

export const findAtlasParentInCache = (
  input: ViewNode,
  cache: DocumentsCache,
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
      `Can't find the parent in document cache: ${input.ancestorSlugSuffixes?.join(",")}`,
    );
  }

  return parent;
};
