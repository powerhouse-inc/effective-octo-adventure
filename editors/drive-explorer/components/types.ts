import type { AtlasFeedbackIssuesDocument } from "../../../document-models/atlas-feedback-issues/index.js";
import { type PHDocumentHeader } from "document-model";

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
      title: string | null;
      docNo: string | null;
    };
    atlasType: string;
    content: string;
    masterStatus: string;
    globalTags: string[];
    originalContextData: any[];
    notionId: string;
  };
};

export type AtlasFeedbackIssue = AtlasFeedbackIssuesDocument["state"] &
  Pick<
    PHDocumentHeader,
    "documentType" | "createdAtUtcIso" | "lastModifiedAtUtcIso"
  >;
