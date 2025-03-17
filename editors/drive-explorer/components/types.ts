export type AtlasArticle = {
  documentType: string;
  revision: {
    global: number;
    local: number;
  };
  global: {
    name: string;
    docNo: string;
    parent: {
      id: string;
      name: string | null;
      docNo: string | null;
    };
    atlasType: string;
    content: string;
    masterStatus: string;
    globalTags: string[];
    references: string[];
    originalContextData: any[];
    provenance: string[];
    notionId: string;
  };
};
