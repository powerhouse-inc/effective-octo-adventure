import {
  type sectionDocTypes,
  type supportDocTypes,
  type allDocTypes,
  type defaultDocTypes,
} from "./constants.js";
import type { TNodeContent, TProcessedFile } from "./processed-data.js";

export type RawSupportDocViewNodes = Partial<{
  [key in SupportDocType]: RawViewNode[];
}>;

export type RawViewNode = {
  id: string;
  type: ViewNodeType;
  title: ViewNodeTitle;
  hubUrls: string[];
  content: TNodeContent;
  slugSuffix: string;
  parentSlugSuffix: string | null;
  ancestorSlugSuffixes: string[];
  descendantSlugSuffixes: string[];
  subDocuments: RawViewNode[];
  files: TProcessedFile[];
};

export type SupportDocViewNodes = Partial<{
  [key in SupportDocType]?: ViewNode[];
}>;

export type RawViewNodeMap = Record<string, RawViewNode | undefined>;

export type ViewNode = Omit<RawViewNode, "content" | "subDocuments"> & {
  content: TProcessedNodeContentItem[];
  subDocuments: ViewNode[];
};

export type ViewNodeMap = Record<string, ViewNode | undefined>;

export type ViewNodeTitle = {
  formalId: {
    prefix: string;
    numberPath: number[];
  };
  title: string;
  typeSuffix?: string;
};

export type ViewNodeTypes = typeof allDocTypes;

export type ViewNodeType = ViewNodeTypes[number];

export type SectionTypes = typeof sectionDocTypes;

export type SectionType = SectionTypes[number];

export type SupportDocTypes = typeof supportDocTypes;

export type SupportDocType = SupportDocTypes[number];

export type DefaultDocTypes = typeof defaultDocTypes;

export type DefaultDocType = DefaultDocTypes[number];

export type Discrepancy = {
  description: string;
  childDocNo: string;
  parentDocNo: string;
  parentId: string;
  childId: string;
};

export type SupportDocIds = Partial<{
  [key in SupportDocType]: string[];
}>;

export type CommonItemProperties = {
  id: string;
  masterStatus: string[];
  hubUrls: string[];
  masterStatusNames: string[];
  docNo: string;
  name: string;
  content: TNodeContent;
  children: string[];
  files: TProcessedFile[];
};

export type DefaultItem = CommonItemProperties & {
  type: DefaultDocType;
  parents?: undefined;
  number?: undefined;
};

export type SectionItem = CommonItemProperties & {
  type: SectionType;
  parents: string[];
  number: number | null;
};

export type Item = DefaultItem | SectionItem;

export type Items = Record<string, Item>;

export type Hub = Record<
  string,
  {
    id: string;
    url: string;
  }
>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type LinkViewNodeContent = {
  type: "link";
  text: string;
  href: string;
  external: boolean;
};

export type MentionViewNodeContent = {
  type: "mention";
  text: string;
  href: string;
};

export type EquationViewNodeContent = {
  type: "equation";
  text: string;
};

export type CodeViewNodeContent = {
  type: "code";
  text: string;
};

export type TableViewNodeContent = {
  type: "table";
  text: string;
};

export type ParagraphsViewNodeContent = {
  type: "paragraphs";
  text: string;
};

export type TProcessedViewNodeContent =
  | LinkViewNodeContent
  | MentionViewNodeContent
  | EquationViewNodeContent
  | CodeViewNodeContent
  | TableViewNodeContent
  | ParagraphsViewNodeContent;

// New type for processed content item
export type TProcessedNodeContentItem = {
  heading?: string | null;
  text: TProcessedViewNodeContent[];
};
