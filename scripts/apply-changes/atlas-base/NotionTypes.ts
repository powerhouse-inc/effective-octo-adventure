export type ParsedNotionDocumentIndex = {
  [id: string]: ParsedNotionDocument | undefined;
};

export type ParsedNotionDocumentType =
  | "scenarioVariation"
  | "scenario"
  | "tenet"
  | "annotation"
  | "section"
  | "core"
  | "activeDataController"
  | "scope"
  | "article"
  | "category"
  | "neededResearch"
  | "typeSpecification";

export type ParsedNotionDocument = {
  id: string;
  type: ParsedNotionDocumentType;
  docNo: string;
  name: string;
  content: ParsedNotionDocumentContent[];
  children: string[];
  files: never[];
  masterStatus: string[];
  masterStatusNames: string[];
  hubUrls: string[];
  parents?: string[];
  number?: number | null;
};

export type ParsedNotionDocumentContent = {
  heading?: string;
  text:
    | string
    | (ParsedNotionDocumentContentText | ParsedNotionDocumentContentMention)[];
};

export type ParsedNotionDocumentContentMention = {
  type: "mention";
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: "default";
  };
  mention: {
    type: "page";
    page: {
      id: string;
    };
  };
};

export type ParsedNotionDocumentContentText = {
  type: "text";
  text: {
    content: string;
    link: string | null;
  };
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: "default";
  };
};

export type ViewTree = {
  [key: string]: ViewTreeNode;
};

export type ViewTreeNode = {
  id: string;
  type: string;
  slugSuffix: string;
  parentSlugSuffix: string;
  ancestorSlugSuffixes: string[];
  descendantSlugSuffixes: string[];
  title: {
    formalId: {
      prefix: string;
      numberPath: number[];
    };
    title: string;
  };
  hubUrls: string[];
  content: ViewTreeContentValue;
  subDocuments: ViewTreeNode[];
};

export type ViewTreeContentSegment = {
  type: string;
  text: string;
};

export type ViewTreeContentValue = {
  heading?: string;
  text?: ViewTreeContentSegment[];
}[];
