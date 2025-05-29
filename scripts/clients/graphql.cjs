var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  AnalyticsGranularity: () => AnalyticsGranularity,
  AtlasExploratory_EAtlasType: () => AtlasExploratory_EAtlasType,
  AtlasExploratory_EStatus: () => AtlasExploratory_EStatus,
  AtlasFoundation_FAtlasType: () => AtlasFoundation_FAtlasType,
  AtlasFoundation_FStatus: () => AtlasFoundation_FStatus,
  AtlasGrounding_GAtlasType: () => AtlasGrounding_GAtlasType,
  AtlasGrounding_GStatus: () => AtlasGrounding_GStatus,
  AtlasMultiParent_MAtlasType: () => AtlasMultiParent_MAtlasType,
  AtlasMultiParent_MStatus: () => AtlasMultiParent_MStatus,
  AtlasScope_Status: () => AtlasScope_Status,
  DocumentDrive_TransmitterType: () => DocumentDrive_TransmitterType,
  DocumentDrive_TriggerType: () => DocumentDrive_TriggerType,
  EAtlasType: () => EAtlasType,
  EStatus: () => EStatus,
  FAtlasType: () => FAtlasType,
  FStatus: () => FStatus,
  GAtlasType: () => GAtlasType,
  GStatus: () => GStatus,
  MAtlasType: () => MAtlasType,
  MStatus: () => MStatus,
  Status: () => Status,
  client: () => client,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_endpoint = require("graphql-ts-client/dist/endpoint");
const formatGraphQL = (query) => query;
const AnalyticsGranularity = {
  annual: "annual",
  daily: "daily",
  hourly: "hourly",
  monthly: "monthly",
  quarterly: "quarterly",
  semiAnnual: "semiAnnual",
  total: "total",
  weekly: "weekly"
};
const AtlasExploratory_EAtlasType = {
  scenario: "SCENARIO",
  scenarioVariation: "SCENARIO_VARIATION"
};
const AtlasExploratory_EStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const AtlasFoundation_FAtlasType = {
  activeDataController: "ACTIVE_DATA_CONTROLLER",
  article: "ARTICLE",
  core: "CORE",
  section: "SECTION"
};
const AtlasFoundation_FStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const AtlasGrounding_GAtlasType = {
  activeData: "ACTIVE_DATA",
  originalContextData: "ORIGINAL_CONTEXT_DATA",
  tenet: "TENET"
};
const AtlasGrounding_GStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const AtlasMultiParent_MAtlasType = {
  annotation: "ANNOTATION",
  neededResearch: "NEEDED_RESEARCH"
};
const AtlasMultiParent_MStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const AtlasScope_Status = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const DocumentDrive_TransmitterType = {
  internal: "Internal",
  matrixConnect: "MatrixConnect",
  pullResponder: "PullResponder",
  rESTWebhook: "RESTWebhook",
  secureConnect: "SecureConnect",
  switchboardPush: "SwitchboardPush"
};
const DocumentDrive_TriggerType = { pullResponder: "PullResponder" };
const EAtlasType = {
  scenario: "SCENARIO",
  scenarioVariation: "SCENARIO_VARIATION"
};
const EStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const FAtlasType = {
  activeDataController: "ACTIVE_DATA_CONTROLLER",
  article: "ARTICLE",
  core: "CORE",
  section: "SECTION"
};
const FStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const GAtlasType = {
  activeData: "ACTIVE_DATA",
  originalContextData: "ORIGINAL_CONTEXT_DATA",
  tenet: "TENET"
};
const GStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const MAtlasType = {
  annotation: "ANNOTATION",
  neededResearch: "NEEDED_RESEARCH"
};
const MStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const Status = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const typesTree = {
  AnalyticsQuery: {
    get series() {
      return {
        __fields: typesTree.AnalyticsPeriod,
        __args: {
          filter: "AnalyticsFilter"
        }
      };
    },
    get multiCurrencySeries() {
      return {
        __fields: typesTree.AnalyticsPeriod,
        __args: {
          filter: "MultiCurrencyConversions"
        }
      };
    },
    metrics: {},
    get dimensions() {
      return {
        __fields: typesTree.Dimension
      };
    },
    currencies: {}
  },
  AtlasExploratory: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasExploratory_AtlasExploratoryState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasExploratory_AtlasExploratoryState
      };
    }
  },
  AtlasExploratoryQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasExploratory,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasExploratory
      };
    }
  },
  AtlasFeedbackIssues: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasFeedbackIssues_AtlasFeedbackIssuesState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasFeedbackIssues_AtlasFeedbackIssuesState
      };
    }
  },
  AtlasFeedbackIssuesQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasFeedbackIssues,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasFeedbackIssues
      };
    }
  },
  AtlasFoundation: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasFoundation_AtlasFoundationState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasFoundation_AtlasFoundationState
      };
    }
  },
  AtlasFoundationQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasFoundation,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasFoundation
      };
    }
  },
  AtlasGrounding: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasGrounding_AtlasGroundingState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasGrounding_AtlasGroundingState
      };
    }
  },
  AtlasGroundingQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasGrounding,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasGrounding
      };
    }
  },
  AtlasMultiParent: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasMultiParent_AtlasMultiParentState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasMultiParent_AtlasMultiParentState
      };
    }
  },
  AtlasMultiParentQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasMultiParent,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasMultiParent
      };
    }
  },
  AtlasScope: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasScope_AtlasScopeState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasScope_AtlasScopeState
      };
    }
  },
  AtlasScopeQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasScope,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasScope
      };
    }
  },
  AtlasSet: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.AtlasSet_AtlasSetState
      };
    },
    get state() {
      return {
        __fields: typesTree.AtlasSet_AtlasSetState
      };
    }
  },
  AtlasSetQueries: {
    get getDocument() {
      return {
        __fields: typesTree.AtlasSet,
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get getDocuments() {
      return {
        __fields: typesTree.AtlasSet
      };
    }
  },
  DocumentDrive: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    },
    get initialState() {
      return {
        __fields: typesTree.DocumentDrive_DocumentDriveState
      };
    },
    get state() {
      return {
        __fields: typesTree.DocumentDrive_DocumentDriveState
      };
    }
  },
  DocumentModel: {
    get operations() {
      return {
        __fields: typesTree.Operation,
        __args: {
          skip: "Int",
          first: "Int"
        }
      };
    }
  },
  Mutation: {
    get AtlasExploratory_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasExploratory_setExploratoryName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetExploratoryNameInput"
        }
      };
    },
    get AtlasExploratory_setContent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetContentInput"
        }
      };
    },
    get AtlasExploratory_setMasterStatus() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetMasterStatusInput"
        }
      };
    },
    get AtlasExploratory_setParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetParentInput"
        }
      };
    },
    get AtlasExploratory_setAtlasType() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetAtlasTypeInput"
        }
      };
    },
    get AtlasExploratory_setFindings() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetFindingsInput"
        }
      };
    },
    get AtlasExploratory_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetDocNumberInput"
        }
      };
    },
    get AtlasExploratory_addTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_AddTagsInput"
        }
      };
    },
    get AtlasExploratory_removeTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_RemoveTagsInput"
        }
      };
    },
    get AtlasExploratory_addContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_AddContextDataInput"
        }
      };
    },
    get AtlasExploratory_removeContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_RemoveContextDataInput"
        }
      };
    },
    get AtlasExploratory_setNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetNotionIdInput"
        }
      };
    },
    get AtlasExploratory_setAdditionalGuidance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetAdditionalGuidanceInput"
        }
      };
    },
    get AtlasExploratory_replaceContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_ReplaceContextDataInput"
        }
      };
    },
    get AtlasFeedbackIssues_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasFeedbackIssues_createIssue() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_CreateIssueInput"
        }
      };
    },
    get AtlasFeedbackIssues_deleteIssue() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_DeleteIssueInput"
        }
      };
    },
    get AtlasFeedbackIssues_addNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_AddNotionIdInput"
        }
      };
    },
    get AtlasFeedbackIssues_removeNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_RemoveNotionIdInput"
        }
      };
    },
    get AtlasFeedbackIssues_createComment() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_CreateCommentInput"
        }
      };
    },
    get AtlasFeedbackIssues_deleteComment() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_DeleteCommentInput"
        }
      };
    },
    get AtlasFeedbackIssues_editComment() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFeedbackIssues_EditCommentInput"
        }
      };
    },
    get AtlasFoundation_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasFoundation_setFoundationName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetFoundationNameInput"
        }
      };
    },
    get AtlasFoundation_setContent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetContentInput"
        }
      };
    },
    get AtlasFoundation_setMasterStatus() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetMasterStatusInput"
        }
      };
    },
    get AtlasFoundation_setAtlasType() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetAtlasTypeInput"
        }
      };
    },
    get AtlasFoundation_setParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetParentInput"
        }
      };
    },
    get AtlasFoundation_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetDocNumberInput"
        }
      };
    },
    get AtlasFoundation_addTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_AddTagsInput"
        }
      };
    },
    get AtlasFoundation_removeTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_RemoveTagsInput"
        }
      };
    },
    get AtlasFoundation_addContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_AddContextDataInput"
        }
      };
    },
    get AtlasFoundation_removeContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_RemoveContextDataInput"
        }
      };
    },
    get AtlasFoundation_setNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetNotionIdInput"
        }
      };
    },
    get AtlasFoundation_replaceContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_ReplaceContextDataInput"
        }
      };
    },
    get AtlasGrounding_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasGrounding_setGroundingName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetGroundingNameInput"
        }
      };
    },
    get AtlasGrounding_setContent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetContentInput"
        }
      };
    },
    get AtlasGrounding_setMasterStatus() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetMasterStatusInput"
        }
      };
    },
    get AtlasGrounding_setAtlasType() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetAtlasTypeInput"
        }
      };
    },
    get AtlasGrounding_setParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetParentInput"
        }
      };
    },
    get AtlasGrounding_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetDocNumberInput"
        }
      };
    },
    get AtlasGrounding_addTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_AddTagsInput"
        }
      };
    },
    get AtlasGrounding_removeTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_RemoveTagsInput"
        }
      };
    },
    get AtlasGrounding_addContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_AddContextDataInput"
        }
      };
    },
    get AtlasGrounding_removeContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_RemoveContextDataInput"
        }
      };
    },
    get AtlasGrounding_setNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetNotionIdInput"
        }
      };
    },
    get AtlasGrounding_replaceContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_ReplaceContextDataInput"
        }
      };
    },
    get AtlasMultiParent_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasMultiParent_setExploratoryName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetExploratoryNameInput"
        }
      };
    },
    get AtlasMultiParent_setContent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetContentInput"
        }
      };
    },
    get AtlasMultiParent_setMasterStatus() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetMasterStatusInput"
        }
      };
    },
    get AtlasMultiParent_addParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_AddParentInput"
        }
      };
    },
    get AtlasMultiParent_setAtlasType() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetAtlasTypeInput"
        }
      };
    },
    get AtlasMultiParent_removeParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_RemoveParentInput"
        }
      };
    },
    get AtlasMultiParent_replaceParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_ReplaceParentInput"
        }
      };
    },
    get AtlasMultiParent_addTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_AddTagsInput"
        }
      };
    },
    get AtlasMultiParent_removeTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_RemoveTagsInput"
        }
      };
    },
    get AtlasMultiParent_addContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_AddContextDataInput"
        }
      };
    },
    get AtlasMultiParent_removeContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_RemoveContextDataInput"
        }
      };
    },
    get AtlasMultiParent_replaceContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_ReplaceContextDataInput"
        }
      };
    },
    get AtlasMultiParent_setNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetNotionIdInput"
        }
      };
    },
    get AtlasScope_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasScope_setScopeName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetScopeNameInput"
        }
      };
    },
    get AtlasScope_setContent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetContentInput"
        }
      };
    },
    get AtlasScope_setMasterStatus() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetMasterStatusInput"
        }
      };
    },
    get AtlasScope_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetDocNumberInput"
        }
      };
    },
    get AtlasScope_addTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_AddTagsInput"
        }
      };
    },
    get AtlasScope_removeTags() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_RemoveTagsInput"
        }
      };
    },
    get AtlasScope_addContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_AddContextDataInput"
        }
      };
    },
    get AtlasScope_removeContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_RemoveContextDataInput"
        }
      };
    },
    get AtlasScope_setNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetNotionIdInput"
        }
      };
    },
    get AtlasScope_replaceContextData() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_ReplaceContextDataInput"
        }
      };
    },
    get AtlasSet_createDocument() {
      return {
        __args: {
          driveId: "String",
          name: "String"
        }
      };
    },
    get AtlasSet_setSetName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasSet_SetSetNameInput"
        }
      };
    },
    get AtlasSet_setSetParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasSet_SetSetParentInput"
        }
      };
    },
    get AtlasSet_setNotionId() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasSet_SetNotionIdInput"
        }
      };
    },
    get createChallenge() {
      return {
        __args: {
          address: "String!"
        }
      };
    },
    get solveChallenge() {
      return {
        __args: {
          nonce: "String!",
          signature: "String!"
        }
      };
    },
    get createSession() {
      return {
        __args: {
          session: "SessionInput!"
        }
      };
    },
    get revokeSession() {
      return {
        __args: {
          sessionId: "String!"
        }
      };
    },
    get ForkAtlas() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    },
    get addDrive() {
      return {
        __fields: typesTree.DocumentDrive_DocumentDriveState,
        __args: {
          global: "DocumentDriveStateInput!",
          preferredEditor: "String"
        }
      };
    },
    get setDriveIcon() {
      return {
        __args: {
          id: "String!",
          icon: "String!"
        }
      };
    },
    get setDriveName() {
      return {
        __args: {
          id: "String!",
          name: "String!"
        }
      };
    }
  },
  Query: {
    get driveIdBySlug() {
      return {
        __args: {
          slug: "String!"
        }
      };
    },
    get analytics() {
      return {
        __fields: typesTree.AnalyticsQuery
      };
    },
    get AtlasExploratory() {
      return {
        __fields: typesTree.AtlasExploratoryQueries
      };
    },
    get AtlasFeedbackIssues() {
      return {
        __fields: typesTree.AtlasFeedbackIssuesQueries
      };
    },
    get AtlasFoundation() {
      return {
        __fields: typesTree.AtlasFoundationQueries
      };
    },
    get AtlasGrounding() {
      return {
        __fields: typesTree.AtlasGroundingQueries
      };
    },
    get AtlasMultiParent() {
      return {
        __fields: typesTree.AtlasMultiParentQueries
      };
    },
    get AtlasScope() {
      return {
        __fields: typesTree.AtlasScopeQueries
      };
    },
    get AtlasSet() {
      return {
        __fields: typesTree.AtlasSetQueries
      };
    },
    me: {},
    sessions: {},
    drives: {}
  },
  AnalyticsPeriod: {
    get rows() {
      return {
        __fields: typesTree.AnalyticsSeries
      };
    }
  },
  AnalyticsSeries: {
    dimensions: {}
  },
  AtlasExploratory_AtlasExploratoryState: {
    parent: {},
    globalTags: {},
    originalContextData: {},
    findings: {}
  },
  AtlasExploratoryState: {
    parent: {},
    globalTags: {},
    originalContextData: {},
    findings: {}
  },
  AtlasFeedbackIssues_AtlasFeedbackIssuesState: {
    get issues() {
      return {
        __fields: typesTree.AtlasFeedbackIssues_Issue
      };
    }
  },
  AtlasFeedbackIssues_Issue: {
    notionIds: {},
    comments: {}
  },
  AtlasFeedbackIssuesState: {
    get issues() {
      return {
        __fields: typesTree.Issue
      };
    }
  },
  AtlasFoundation_AtlasFoundationState: {
    parent: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasFoundationState: {
    parent: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasGrounding_AtlasGroundingState: {
    parent: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasGroundingState: {
    parent: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasMultiParent_AtlasMultiParentState: {
    parents: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasMultiParentState: {
    parents: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasScope_AtlasScopeState: {
    globalTags: {},
    originalContextData: {}
  },
  AtlasScopeState: {
    globalTags: {},
    originalContextData: {}
  },
  AtlasSet_AtlasSetState: {
    parent: {}
  },
  AtlasSetState: {
    parent: {}
  },
  Dimension: {
    values: {}
  },
  DocumentDrive_DocumentDriveState: {
    nodes: {}
  },
  DocumentDrive_FileNode: {
    synchronizationUnits: {}
  },
  DocumentDrive_Listener: {
    get filter() {
      return {
        __fields: typesTree.DocumentDrive_ListenerFilter
      };
    },
    callInfo: {}
  },
  DocumentDrive_ListenerFilter: {
    documentType: {},
    documentId: {},
    scope: {},
    branch: {}
  },
  DocumentDriveLocalState: {
    get listeners() {
      return {
        __fields: typesTree.DocumentDrive_Listener
      };
    },
    triggers: {}
  },
  Issue: {
    notionIds: {},
    comments: {}
  },
  Operation: {
    get context() {
      return {
        __fields: typesTree.PHOperationContext
      };
    }
  },
  PHOperationContext: {
    get signer() {
      return {
        __fields: typesTree.Signer
      };
    }
  },
  Signer: {
    user: {},
    app: {},
    signatures: {}
  }
};
let verbose = false;
let headers = {};
let url = "http://localhost:4001/graphql";
let retryConfig = {
  max: 0,
  before: void 0,
  waitBeforeRetry: 0
};
let responseListeners = [];
let apiEndpoint = (0, import_endpoint.getApiEndpointCreator)({
  getClient: () => ({ url, headers, retryConfig }),
  responseListeners,
  maxAge: 3e4,
  verbose,
  typesTree,
  formatGraphQL
});
const client = {
  addResponseListener: (listener) => responseListeners.push(
    listener
  ),
  setHeader: (key, value) => {
    headers[key] = value;
  },
  setHeaders: (newHeaders) => {
    headers = newHeaders;
  },
  setRetryConfig: (options) => {
    if (!Number.isInteger(options.max) || options.max < 0) {
      throw new Error("retryOptions.max should be a non-negative integer");
    }
    retryConfig = {
      max: options.max,
      waitBeforeRetry: options.waitBeforeRetry,
      before: options.before
    };
  },
  setUrl: (_url) => url = _url,
  queries: {
    analytics: apiEndpoint("query", "analytics"),
    AtlasExploratory: apiEndpoint("query", "AtlasExploratory"),
    AtlasFeedbackIssues: apiEndpoint("query", "AtlasFeedbackIssues"),
    AtlasFoundation: apiEndpoint("query", "AtlasFoundation"),
    AtlasGrounding: apiEndpoint("query", "AtlasGrounding"),
    AtlasMultiParent: apiEndpoint("query", "AtlasMultiParent"),
    AtlasScope: apiEndpoint("query", "AtlasScope"),
    AtlasSet: apiEndpoint("query", "AtlasSet"),
    me: apiEndpoint("query", "me"),
    sessions: apiEndpoint("query", "sessions"),
    drives: apiEndpoint("query", "drives"),
    driveIdBySlug: apiEndpoint("query", "driveIdBySlug")
  },
  mutations: {
    AtlasExploratory_createDocument: apiEndpoint("mutation", "AtlasExploratory_createDocument"),
    AtlasExploratory_setExploratoryName: apiEndpoint("mutation", "AtlasExploratory_setExploratoryName"),
    AtlasExploratory_setContent: apiEndpoint("mutation", "AtlasExploratory_setContent"),
    AtlasExploratory_setMasterStatus: apiEndpoint("mutation", "AtlasExploratory_setMasterStatus"),
    AtlasExploratory_setParent: apiEndpoint("mutation", "AtlasExploratory_setParent"),
    AtlasExploratory_setAtlasType: apiEndpoint("mutation", "AtlasExploratory_setAtlasType"),
    AtlasExploratory_setFindings: apiEndpoint("mutation", "AtlasExploratory_setFindings"),
    AtlasExploratory_setDocNumber: apiEndpoint("mutation", "AtlasExploratory_setDocNumber"),
    AtlasExploratory_addTags: apiEndpoint("mutation", "AtlasExploratory_addTags"),
    AtlasExploratory_removeTags: apiEndpoint("mutation", "AtlasExploratory_removeTags"),
    AtlasExploratory_addContextData: apiEndpoint("mutation", "AtlasExploratory_addContextData"),
    AtlasExploratory_removeContextData: apiEndpoint("mutation", "AtlasExploratory_removeContextData"),
    AtlasExploratory_setNotionId: apiEndpoint("mutation", "AtlasExploratory_setNotionId"),
    AtlasExploratory_setAdditionalGuidance: apiEndpoint("mutation", "AtlasExploratory_setAdditionalGuidance"),
    AtlasExploratory_replaceContextData: apiEndpoint("mutation", "AtlasExploratory_replaceContextData"),
    AtlasFeedbackIssues_createDocument: apiEndpoint("mutation", "AtlasFeedbackIssues_createDocument"),
    AtlasFeedbackIssues_createIssue: apiEndpoint("mutation", "AtlasFeedbackIssues_createIssue"),
    AtlasFeedbackIssues_deleteIssue: apiEndpoint("mutation", "AtlasFeedbackIssues_deleteIssue"),
    AtlasFeedbackIssues_addNotionId: apiEndpoint("mutation", "AtlasFeedbackIssues_addNotionId"),
    AtlasFeedbackIssues_removeNotionId: apiEndpoint("mutation", "AtlasFeedbackIssues_removeNotionId"),
    AtlasFeedbackIssues_createComment: apiEndpoint("mutation", "AtlasFeedbackIssues_createComment"),
    AtlasFeedbackIssues_deleteComment: apiEndpoint("mutation", "AtlasFeedbackIssues_deleteComment"),
    AtlasFeedbackIssues_editComment: apiEndpoint("mutation", "AtlasFeedbackIssues_editComment"),
    AtlasFoundation_createDocument: apiEndpoint("mutation", "AtlasFoundation_createDocument"),
    AtlasFoundation_setFoundationName: apiEndpoint("mutation", "AtlasFoundation_setFoundationName"),
    AtlasFoundation_setContent: apiEndpoint("mutation", "AtlasFoundation_setContent"),
    AtlasFoundation_setMasterStatus: apiEndpoint("mutation", "AtlasFoundation_setMasterStatus"),
    AtlasFoundation_setAtlasType: apiEndpoint("mutation", "AtlasFoundation_setAtlasType"),
    AtlasFoundation_setParent: apiEndpoint("mutation", "AtlasFoundation_setParent"),
    AtlasFoundation_setDocNumber: apiEndpoint("mutation", "AtlasFoundation_setDocNumber"),
    AtlasFoundation_addTags: apiEndpoint("mutation", "AtlasFoundation_addTags"),
    AtlasFoundation_removeTags: apiEndpoint("mutation", "AtlasFoundation_removeTags"),
    AtlasFoundation_addContextData: apiEndpoint("mutation", "AtlasFoundation_addContextData"),
    AtlasFoundation_removeContextData: apiEndpoint("mutation", "AtlasFoundation_removeContextData"),
    AtlasFoundation_setNotionId: apiEndpoint("mutation", "AtlasFoundation_setNotionId"),
    AtlasFoundation_replaceContextData: apiEndpoint("mutation", "AtlasFoundation_replaceContextData"),
    AtlasGrounding_createDocument: apiEndpoint("mutation", "AtlasGrounding_createDocument"),
    AtlasGrounding_setGroundingName: apiEndpoint("mutation", "AtlasGrounding_setGroundingName"),
    AtlasGrounding_setContent: apiEndpoint("mutation", "AtlasGrounding_setContent"),
    AtlasGrounding_setMasterStatus: apiEndpoint("mutation", "AtlasGrounding_setMasterStatus"),
    AtlasGrounding_setAtlasType: apiEndpoint("mutation", "AtlasGrounding_setAtlasType"),
    AtlasGrounding_setParent: apiEndpoint("mutation", "AtlasGrounding_setParent"),
    AtlasGrounding_setDocNumber: apiEndpoint("mutation", "AtlasGrounding_setDocNumber"),
    AtlasGrounding_addTags: apiEndpoint("mutation", "AtlasGrounding_addTags"),
    AtlasGrounding_removeTags: apiEndpoint("mutation", "AtlasGrounding_removeTags"),
    AtlasGrounding_addContextData: apiEndpoint("mutation", "AtlasGrounding_addContextData"),
    AtlasGrounding_removeContextData: apiEndpoint("mutation", "AtlasGrounding_removeContextData"),
    AtlasGrounding_setNotionId: apiEndpoint("mutation", "AtlasGrounding_setNotionId"),
    AtlasGrounding_replaceContextData: apiEndpoint("mutation", "AtlasGrounding_replaceContextData"),
    AtlasMultiParent_createDocument: apiEndpoint("mutation", "AtlasMultiParent_createDocument"),
    AtlasMultiParent_setExploratoryName: apiEndpoint("mutation", "AtlasMultiParent_setExploratoryName"),
    AtlasMultiParent_setContent: apiEndpoint("mutation", "AtlasMultiParent_setContent"),
    AtlasMultiParent_setMasterStatus: apiEndpoint("mutation", "AtlasMultiParent_setMasterStatus"),
    AtlasMultiParent_addParent: apiEndpoint("mutation", "AtlasMultiParent_addParent"),
    AtlasMultiParent_setAtlasType: apiEndpoint("mutation", "AtlasMultiParent_setAtlasType"),
    AtlasMultiParent_removeParent: apiEndpoint("mutation", "AtlasMultiParent_removeParent"),
    AtlasMultiParent_replaceParent: apiEndpoint("mutation", "AtlasMultiParent_replaceParent"),
    AtlasMultiParent_addTags: apiEndpoint("mutation", "AtlasMultiParent_addTags"),
    AtlasMultiParent_removeTags: apiEndpoint("mutation", "AtlasMultiParent_removeTags"),
    AtlasMultiParent_addContextData: apiEndpoint("mutation", "AtlasMultiParent_addContextData"),
    AtlasMultiParent_removeContextData: apiEndpoint("mutation", "AtlasMultiParent_removeContextData"),
    AtlasMultiParent_replaceContextData: apiEndpoint("mutation", "AtlasMultiParent_replaceContextData"),
    AtlasMultiParent_setNotionId: apiEndpoint("mutation", "AtlasMultiParent_setNotionId"),
    AtlasScope_createDocument: apiEndpoint("mutation", "AtlasScope_createDocument"),
    AtlasScope_setScopeName: apiEndpoint("mutation", "AtlasScope_setScopeName"),
    AtlasScope_setContent: apiEndpoint("mutation", "AtlasScope_setContent"),
    AtlasScope_setMasterStatus: apiEndpoint("mutation", "AtlasScope_setMasterStatus"),
    AtlasScope_setDocNumber: apiEndpoint("mutation", "AtlasScope_setDocNumber"),
    AtlasScope_addTags: apiEndpoint("mutation", "AtlasScope_addTags"),
    AtlasScope_removeTags: apiEndpoint("mutation", "AtlasScope_removeTags"),
    AtlasScope_addContextData: apiEndpoint("mutation", "AtlasScope_addContextData"),
    AtlasScope_removeContextData: apiEndpoint("mutation", "AtlasScope_removeContextData"),
    AtlasScope_setNotionId: apiEndpoint("mutation", "AtlasScope_setNotionId"),
    AtlasScope_replaceContextData: apiEndpoint("mutation", "AtlasScope_replaceContextData"),
    AtlasSet_createDocument: apiEndpoint("mutation", "AtlasSet_createDocument"),
    AtlasSet_setSetName: apiEndpoint("mutation", "AtlasSet_setSetName"),
    AtlasSet_setSetParent: apiEndpoint("mutation", "AtlasSet_setSetParent"),
    AtlasSet_setNotionId: apiEndpoint("mutation", "AtlasSet_setNotionId"),
    createChallenge: apiEndpoint("mutation", "createChallenge"),
    solveChallenge: apiEndpoint("mutation", "solveChallenge"),
    createSession: apiEndpoint("mutation", "createSession"),
    revokeSession: apiEndpoint("mutation", "revokeSession"),
    ForkAtlas: apiEndpoint("mutation", "ForkAtlas"),
    addDrive: apiEndpoint("mutation", "addDrive"),
    setDriveIcon: apiEndpoint("mutation", "setDriveIcon"),
    setDriveName: apiEndpoint("mutation", "setDriveName")
  }
};
var stdin_default = client;
