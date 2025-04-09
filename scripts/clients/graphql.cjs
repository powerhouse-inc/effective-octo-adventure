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
  AtlasExploratory_EGlobalTag: () => AtlasExploratory_EGlobalTag,
  AtlasExploratory_EStatus: () => AtlasExploratory_EStatus,
  AtlasFoundation_FAtlasType: () => AtlasFoundation_FAtlasType,
  AtlasFoundation_FGlobalTag: () => AtlasFoundation_FGlobalTag,
  AtlasFoundation_FStatus: () => AtlasFoundation_FStatus,
  AtlasGrounding_GAtlasType: () => AtlasGrounding_GAtlasType,
  AtlasGrounding_GGlobalTag: () => AtlasGrounding_GGlobalTag,
  AtlasGrounding_GStatus: () => AtlasGrounding_GStatus,
  AtlasMultiParent_MAtlasType: () => AtlasMultiParent_MAtlasType,
  AtlasMultiParent_MGlobalTag: () => AtlasMultiParent_MGlobalTag,
  AtlasMultiParent_MStatus: () => AtlasMultiParent_MStatus,
  AtlasScope_GlobalTag: () => AtlasScope_GlobalTag,
  AtlasScope_Status: () => AtlasScope_Status,
  DocumentDrive_TransmitterType: () => DocumentDrive_TransmitterType,
  DocumentDrive_TriggerType: () => DocumentDrive_TriggerType,
  EAtlasType: () => EAtlasType,
  EGlobalTag: () => EGlobalTag,
  EStatus: () => EStatus,
  FAtlasType: () => FAtlasType,
  FGlobalTag: () => FGlobalTag,
  FStatus: () => FStatus,
  GAtlasType: () => GAtlasType,
  GGlobalTag: () => GGlobalTag,
  GStatus: () => GStatus,
  GlobalTag: () => GlobalTag,
  MAtlasType: () => MAtlasType,
  MGlobalTag: () => MGlobalTag,
  MStatus: () => MStatus,
  Status: () => Status,
  client: () => client,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_endpoint = require("graphql-ts-client/dist/endpoint");
const formatGraphQL = (query) => query;
const AtlasExploratory_EAtlasType = {
  scenario: "SCENARIO",
  scenarioVariation: "SCENARIO_VARIATION"
};
const AtlasExploratory_EGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
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
const AtlasFoundation_FGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
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
const AtlasGrounding_GGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
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
const AtlasMultiParent_MGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
};
const AtlasMultiParent_MStatus = {
  approved: "APPROVED",
  archived: "ARCHIVED",
  deferred: "DEFERRED",
  placeholder: "PLACEHOLDER",
  provisional: "PROVISIONAL"
};
const AtlasScope_GlobalTag = {
  anonWorkforce: "ANON_WORKFORCE",
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  facilitatordao: "FACILITATORDAO",
  internalReference: "INTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlHighPriority: "ML_HIGH_PRIORITY",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlMedPriority: "ML_MED_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  p0HubEntryNeeded: "P0_HUB_ENTRY_NEEDED",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  subdaoIncubation: "SUBDAO_INCUBATION",
  subdaoRewards: "SUBDAO_REWARDS",
  twoStageBridge: "TWO_STAGE_BRIDGE",
  v1Mip: "V1_MIP"
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
const EGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
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
const FGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
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
const GGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
};
const GlobalTag = {
  anonWorkforce: "ANON_WORKFORCE",
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  facilitatordao: "FACILITATORDAO",
  internalReference: "INTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlHighPriority: "ML_HIGH_PRIORITY",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlMedPriority: "ML_MED_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  p0HubEntryNeeded: "P0_HUB_ENTRY_NEEDED",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  subdaoIncubation: "SUBDAO_INCUBATION",
  subdaoRewards: "SUBDAO_REWARDS",
  twoStageBridge: "TWO_STAGE_BRIDGE",
  v1Mip: "V1_MIP"
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
const MGlobalTag = {
  avc: "AVC",
  cais: "CAIS",
  daoToolkit: "DAO_TOOLKIT",
  ecosystemIntelligence: "ECOSYSTEM_INTELLIGENCE",
  externalReference: "EXTERNAL_REFERENCE",
  legacyTermUseApproved: "LEGACY_TERM_USE_APPROVED",
  mlDefer: "ML_DEFER",
  mlLowPriority: "ML_LOW_PRIORITY",
  mlSupportDocsNeeded: "ML_SUPPORT_DOCS_NEEDED",
  newchain: "NEWCHAIN",
  purposeSystem: "PURPOSE_SYSTEM",
  recursiveImprovement: "RECURSIVE_IMPROVEMENT",
  scopeAdvisor: "SCOPE_ADVISOR",
  twoStageBridge: "TWO_STAGE_BRIDGE"
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
    get AtlasExploratory_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetDocNumberInput"
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
    get AtlasExploratory_removeParent() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_RemoveParentInput"
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
    get AtlasExploratory_setProvenance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_SetProvenanceInput"
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
    get AtlasExploratory_addAdditionalGuidance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_AddAdditionalGuidanceInput"
        }
      };
    },
    get AtlasExploratory_removeAdditionalGuidance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasExploratory_RemoveAdditionalGuidanceInput"
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
    get AtlasFoundation_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetDocNumberInput"
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
    get AtlasFoundation_addReference() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_AddReferenceInput"
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
    get AtlasFoundation_removeReference() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_RemoveReferenceInput"
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
    get AtlasFoundation_setProvenance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasFoundation_SetProvenanceInput"
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
    get AtlasGrounding_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetDocNumberInput"
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
    get AtlasGrounding_setProvenance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_SetProvenanceInput"
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
    get AtlasGrounding_addReference() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_AddReferenceInput"
        }
      };
    },
    get AtlasGrounding_removeReference() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasGrounding_RemoveReferenceInput"
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
    get AtlasMultiParent_setMultiparentName() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetMultiparentNameInput"
        }
      };
    },
    get AtlasMultiParent_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetDocNumberInput"
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
    get AtlasMultiParent_setProvenance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_SetProvenanceInput"
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
    get AtlasMultiParent_addReference() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_AddReferenceInput"
        }
      };
    },
    get AtlasMultiParent_removeReference() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasMultiParent_RemoveReferenceInput"
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
    get AtlasScope_setDocNumber() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetDocNumberInput"
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
    get AtlasScope_setProvenance() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID",
          input: "AtlasScope_SetProvenanceInput"
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
    get ForkAtlas() {
      return {
        __args: {
          driveId: "String",
          docId: "PHID"
        }
      };
    }
  },
  AtlasExploratory_AtlasExploratoryState: {
    globalTags: {},
    references: {},
    originalContextData: {},
    findings: {}
  },
  AtlasExploratoryState: {
    globalTags: {},
    references: {},
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
    references: {},
    originalContextData: {},
    provenance: {}
  },
  AtlasFoundationState: {
    parent: {},
    globalTags: {},
    references: {},
    originalContextData: {},
    provenance: {}
  },
  AtlasGrounding_AtlasGroundingState: {
    parent: {},
    globalTags: {},
    references: {},
    originalContextData: {},
    provenance: {}
  },
  AtlasGroundingState: {
    parent: {},
    globalTags: {},
    references: {},
    originalContextData: {},
    provenance: {}
  },
  AtlasMultiParent_AtlasMultiParentState: {
    parents: {},
    globalTags: {},
    references: {},
    originalContextData: {},
    provenance: {}
  },
  AtlasMultiParentState: {
    parents: {},
    globalTags: {},
    references: {},
    originalContextData: {},
    provenance: {}
  },
  AtlasScope_AtlasScopeState: {
    globalTags: {},
    originalContextData: {}
  },
  AtlasScopeState: {
    globalTags: {},
    originalContextData: {}
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
  Query: {
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
    AtlasExploratory: apiEndpoint("query", "AtlasExploratory"),
    AtlasFeedbackIssues: apiEndpoint("query", "AtlasFeedbackIssues"),
    AtlasFoundation: apiEndpoint("query", "AtlasFoundation"),
    AtlasGrounding: apiEndpoint("query", "AtlasGrounding"),
    AtlasMultiParent: apiEndpoint("query", "AtlasMultiParent"),
    AtlasScope: apiEndpoint("query", "AtlasScope")
  },
  mutations: {
    AtlasExploratory_createDocument: apiEndpoint("mutation", "AtlasExploratory_createDocument"),
    AtlasExploratory_setExploratoryName: apiEndpoint("mutation", "AtlasExploratory_setExploratoryName"),
    AtlasExploratory_setDocNumber: apiEndpoint("mutation", "AtlasExploratory_setDocNumber"),
    AtlasExploratory_setContent: apiEndpoint("mutation", "AtlasExploratory_setContent"),
    AtlasExploratory_setMasterStatus: apiEndpoint("mutation", "AtlasExploratory_setMasterStatus"),
    AtlasExploratory_setParent: apiEndpoint("mutation", "AtlasExploratory_setParent"),
    AtlasExploratory_removeParent: apiEndpoint("mutation", "AtlasExploratory_removeParent"),
    AtlasExploratory_setAtlasType: apiEndpoint("mutation", "AtlasExploratory_setAtlasType"),
    AtlasExploratory_setFindings: apiEndpoint("mutation", "AtlasExploratory_setFindings"),
    AtlasExploratory_addTags: apiEndpoint("mutation", "AtlasExploratory_addTags"),
    AtlasExploratory_removeTags: apiEndpoint("mutation", "AtlasExploratory_removeTags"),
    AtlasExploratory_addContextData: apiEndpoint("mutation", "AtlasExploratory_addContextData"),
    AtlasExploratory_removeContextData: apiEndpoint("mutation", "AtlasExploratory_removeContextData"),
    AtlasExploratory_setProvenance: apiEndpoint("mutation", "AtlasExploratory_setProvenance"),
    AtlasExploratory_setNotionId: apiEndpoint("mutation", "AtlasExploratory_setNotionId"),
    AtlasExploratory_addAdditionalGuidance: apiEndpoint("mutation", "AtlasExploratory_addAdditionalGuidance"),
    AtlasExploratory_removeAdditionalGuidance: apiEndpoint("mutation", "AtlasExploratory_removeAdditionalGuidance"),
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
    AtlasFoundation_setDocNumber: apiEndpoint("mutation", "AtlasFoundation_setDocNumber"),
    AtlasFoundation_setContent: apiEndpoint("mutation", "AtlasFoundation_setContent"),
    AtlasFoundation_setMasterStatus: apiEndpoint("mutation", "AtlasFoundation_setMasterStatus"),
    AtlasFoundation_addReference: apiEndpoint("mutation", "AtlasFoundation_addReference"),
    AtlasFoundation_setAtlasType: apiEndpoint("mutation", "AtlasFoundation_setAtlasType"),
    AtlasFoundation_removeReference: apiEndpoint("mutation", "AtlasFoundation_removeReference"),
    AtlasFoundation_setParent: apiEndpoint("mutation", "AtlasFoundation_setParent"),
    AtlasFoundation_addTags: apiEndpoint("mutation", "AtlasFoundation_addTags"),
    AtlasFoundation_removeTags: apiEndpoint("mutation", "AtlasFoundation_removeTags"),
    AtlasFoundation_addContextData: apiEndpoint("mutation", "AtlasFoundation_addContextData"),
    AtlasFoundation_removeContextData: apiEndpoint("mutation", "AtlasFoundation_removeContextData"),
    AtlasFoundation_setProvenance: apiEndpoint("mutation", "AtlasFoundation_setProvenance"),
    AtlasFoundation_setNotionId: apiEndpoint("mutation", "AtlasFoundation_setNotionId"),
    AtlasGrounding_createDocument: apiEndpoint("mutation", "AtlasGrounding_createDocument"),
    AtlasGrounding_setGroundingName: apiEndpoint("mutation", "AtlasGrounding_setGroundingName"),
    AtlasGrounding_setDocNumber: apiEndpoint("mutation", "AtlasGrounding_setDocNumber"),
    AtlasGrounding_setContent: apiEndpoint("mutation", "AtlasGrounding_setContent"),
    AtlasGrounding_setMasterStatus: apiEndpoint("mutation", "AtlasGrounding_setMasterStatus"),
    AtlasGrounding_setAtlasType: apiEndpoint("mutation", "AtlasGrounding_setAtlasType"),
    AtlasGrounding_setParent: apiEndpoint("mutation", "AtlasGrounding_setParent"),
    AtlasGrounding_addTags: apiEndpoint("mutation", "AtlasGrounding_addTags"),
    AtlasGrounding_removeTags: apiEndpoint("mutation", "AtlasGrounding_removeTags"),
    AtlasGrounding_addContextData: apiEndpoint("mutation", "AtlasGrounding_addContextData"),
    AtlasGrounding_removeContextData: apiEndpoint("mutation", "AtlasGrounding_removeContextData"),
    AtlasGrounding_setProvenance: apiEndpoint("mutation", "AtlasGrounding_setProvenance"),
    AtlasGrounding_setNotionId: apiEndpoint("mutation", "AtlasGrounding_setNotionId"),
    AtlasGrounding_addReference: apiEndpoint("mutation", "AtlasGrounding_addReference"),
    AtlasGrounding_removeReference: apiEndpoint("mutation", "AtlasGrounding_removeReference"),
    AtlasMultiParent_createDocument: apiEndpoint("mutation", "AtlasMultiParent_createDocument"),
    AtlasMultiParent_setMultiparentName: apiEndpoint("mutation", "AtlasMultiParent_setMultiparentName"),
    AtlasMultiParent_setDocNumber: apiEndpoint("mutation", "AtlasMultiParent_setDocNumber"),
    AtlasMultiParent_setContent: apiEndpoint("mutation", "AtlasMultiParent_setContent"),
    AtlasMultiParent_setMasterStatus: apiEndpoint("mutation", "AtlasMultiParent_setMasterStatus"),
    AtlasMultiParent_addParent: apiEndpoint("mutation", "AtlasMultiParent_addParent"),
    AtlasMultiParent_setAtlasType: apiEndpoint("mutation", "AtlasMultiParent_setAtlasType"),
    AtlasMultiParent_removeParent: apiEndpoint("mutation", "AtlasMultiParent_removeParent"),
    AtlasMultiParent_addTags: apiEndpoint("mutation", "AtlasMultiParent_addTags"),
    AtlasMultiParent_removeTags: apiEndpoint("mutation", "AtlasMultiParent_removeTags"),
    AtlasMultiParent_addContextData: apiEndpoint("mutation", "AtlasMultiParent_addContextData"),
    AtlasMultiParent_removeContextData: apiEndpoint("mutation", "AtlasMultiParent_removeContextData"),
    AtlasMultiParent_setProvenance: apiEndpoint("mutation", "AtlasMultiParent_setProvenance"),
    AtlasMultiParent_setNotionId: apiEndpoint("mutation", "AtlasMultiParent_setNotionId"),
    AtlasMultiParent_addReference: apiEndpoint("mutation", "AtlasMultiParent_addReference"),
    AtlasMultiParent_removeReference: apiEndpoint("mutation", "AtlasMultiParent_removeReference"),
    AtlasScope_createDocument: apiEndpoint("mutation", "AtlasScope_createDocument"),
    AtlasScope_setScopeName: apiEndpoint("mutation", "AtlasScope_setScopeName"),
    AtlasScope_setDocNumber: apiEndpoint("mutation", "AtlasScope_setDocNumber"),
    AtlasScope_setContent: apiEndpoint("mutation", "AtlasScope_setContent"),
    AtlasScope_setMasterStatus: apiEndpoint("mutation", "AtlasScope_setMasterStatus"),
    AtlasScope_addTags: apiEndpoint("mutation", "AtlasScope_addTags"),
    AtlasScope_removeTags: apiEndpoint("mutation", "AtlasScope_removeTags"),
    AtlasScope_addContextData: apiEndpoint("mutation", "AtlasScope_addContextData"),
    AtlasScope_removeContextData: apiEndpoint("mutation", "AtlasScope_removeContextData"),
    AtlasScope_setProvenance: apiEndpoint("mutation", "AtlasScope_setProvenance"),
    AtlasScope_setNotionId: apiEndpoint("mutation", "AtlasScope_setNotionId"),
    ForkAtlas: apiEndpoint("mutation", "ForkAtlas")
  }
};
var stdin_default = client;
