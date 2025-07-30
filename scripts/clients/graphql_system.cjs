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
  client: () => client,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_endpoint = require("graphql-ts-client/dist/endpoint");
const formatGraphQL = (query) => query;
const DocumentDrive_TransmitterType = {
  internal: "Internal",
  matrixConnect: "MatrixConnect",
  pullResponder: "PullResponder",
  rESTWebhook: "RESTWebhook",
  secureConnect: "SecureConnect",
  switchboardPush: "SwitchboardPush"
};
const DocumentDrive_TriggerType = { pullResponder: "PullResponder" };
const AtlasScope_Status = {
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
  section: "SECTION",
  typeSpecification: "TYPE_SPECIFICATION"
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
const typesTree = {
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
  Query: {
    get driveIdBySlug() {
      return {
        __args: {
          slug: "String!"
        }
      };
    },
    drives: {},
    _service: {}
  },
  Mutation: {
    get addDrive() {
      return {
        __args: {
          name: "String!",
          icon: "String",
          id: "String",
          slug: "String",
          preferredEditor: "String"
        }
      };
    },
    get deleteDrive() {
      return {
        __args: {
          id: "String!"
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
  },
  Operation: {
    get context() {
      return {
        __fields: typesTree.PHOperationContext
      };
    }
  },
  DocumentDrive_FileNode: {
    synchronizationUnits: {}
  },
  DocumentDrive_DocumentDriveState: {
    nodes: {}
  },
  DocumentDrive_ListenerFilter: {
    documentType: {},
    documentId: {},
    scope: {},
    branch: {}
  },
  DocumentDrive_Listener: {
    get filter() {
      return {
        __fields: typesTree.DocumentDrive_ListenerFilter
      };
    },
    callInfo: {}
  },
  DocumentDriveLocalState: {
    get listeners() {
      return {
        __fields: typesTree.DocumentDrive_Listener
      };
    },
    triggers: {}
  },
  AtlasScope_AtlasScopeState: {
    globalTags: {},
    originalContextData: {}
  },
  AtlasMultiParent_AtlasMultiParentState: {
    parents: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasExploratory_AtlasExploratoryState: {
    parent: {},
    globalTags: {},
    originalContextData: {},
    findings: {}
  },
  AtlasFoundation_AtlasFoundationState: {
    parent: {},
    globalTags: {},
    originalContextData: {}
  },
  AtlasGrounding_AtlasGroundingState: {
    parent: {},
    globalTags: {},
    originalContextData: {}
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
  AtlasSet_AtlasSetState: {
    parent: {}
  }
};
let verbose = false;
let headers = {};
let url = "http://localhost:4001/graphql/system";
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
    drives: apiEndpoint("query", "drives"),
    driveIdBySlug: apiEndpoint("query", "driveIdBySlug"),
    _service: apiEndpoint("query", "_service")
  },
  mutations: {
    addDrive: apiEndpoint("mutation", "addDrive"),
    deleteDrive: apiEndpoint("mutation", "deleteDrive"),
    setDriveIcon: apiEndpoint("mutation", "setDriveIcon"),
    setDriveName: apiEndpoint("mutation", "setDriveName")
  }
};
var stdin_default = client;
