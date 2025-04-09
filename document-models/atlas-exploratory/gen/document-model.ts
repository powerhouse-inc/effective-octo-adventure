import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  id: "sky/atlas-exploratory",
  name: "Atlas Exploratory",
  extension: ".axp",
  description: "Exploratory document type (Scenario, ScenarioVariation)",
  author: {
    name: "Sky",
    website: "https://sky.money/",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            'type AtlasExploratoryState {\n  \n  """\n  Full name of the Grounding document entity.  \n  """\n  \n  name: String\n  """\n  Unique document number assigned to the Grounding document within Atlas.  \n  """\n  docNo: String\n  """\n  Parent entity that this Grounding document belongs to.  \n  This is a reference to another Atlas document.\n  """\n  parent: PHID!\n  """\n  The type of the Grounding document within Atlas.  \n  Example: Tenet, Original Context Data, Active Data.\n  """\n  atlasType: EAtlasType!\n  """Entire content body of the Grounding document within Atlas.  """\n  content: String\n  """\n  Master status of the Grounding document as managed by the Atlas Axis facilitator group.  \n  """\n  masterStatus: EStatus!\n  """\n  Document tags managed by the Atlas Axis facilitator group for classification.  \n  """\n  globalTags: [EGlobalTag!]!\n  """\n  References to other Atlas entities that are linked to this Grounding document.  \n  """\n  references: [PHID!]!\n  """\n  List of Atlas documents that were relevant for the creation of this Grounding document.  \n  """\n  originalContextData: [DocumentInfo!]!\n  """\n  Link to the original P0hub Notion environment where this document was first created or referenced.\n  """\n  provenance: URL\n  """\n  Original Notion document ID of the Grounding document.  \n  Used for cross-system referencing and linking back to the original Notion source.\n  """\n  notionId: String\n\n"""\nAlignmnet boolean findings. \n"""\n\nfindings: Finding! \n\n\n"""\nAdditional commentary and context for guidance. \n"""\n\nadditionalGuidance: String!\n  \n}\n\n"""\nReference to a document within Atlas with optional name and document number for display reasons. \n"""\ntype Finding {\n  isAligned: Boolean!\n  comment: String\n}\n\ntype DocumentInfo {\n  id: PHID!\n  name: OLabel\n  docNo: String\n}\n\n\n"""\nDomain (i.e., Atlas) specific document types with the same document model global schema.  \n"""\nenum EAtlasType {\n  SCENARIO\n  SCENARIO_VARIATION\n}\n\n"""Defines the lifecycle stage of the Grounding document within Atlas.  """\nenum EStatus {\n  PLACEHOLDER\n  PROVISIONAL\n  APPROVED\n  DEFERRED\n  ARCHIVED\n}\n\n"""\nThese global tags are used for classification in Grounding documents.  \n"""\nenum EGlobalTag {\n  SCOPE_ADVISOR\n  AVC\n  CAIS\n  ML_LOW_PRIORITY\n  EXTERNAL_REFERENCE\n  DAO_TOOLKIT\n  ML_DEFER\n  PURPOSE_SYSTEM\n  NEWCHAIN\n  ML_SUPPORT_DOCS_NEEDED\n  TWO_STAGE_BRIDGE\n  ECOSYSTEM_INTELLIGENCE\n  RECURSIVE_IMPROVEMENT\n  LEGACY_TERM_USE_APPROVED\n}',
          initialValue:
            '"{\\n  \\"name\\": \\"\\",\\n  \\"docNo\\": \\"\\",\\n  \\"parent\\": \\"\\",\\n  \\"atlasType\\": \\"SCENARIO\\",\\n  \\"content\\": \\"\\",\\n  \\"masterStatus\\": \\"PLACEHOLDER\\",\\n  \\"globalTags\\": [],\\n  \\"references\\": [],\\n  \\"originalContextData\\": [],\\n  \\"provenance\\": \\"\\",\\n  \\"notionId\\": \\"\\",\\n  \\"findings\\": {\\n    \\"isAligned\\": false,\\n    \\"comment\\": \\"\\"\\n  },\\n  \\"additionalGuidance\\": \\"\\"\\n}"',
          examples: [],
        },
        local: {
          schema: "",
          initialValue: '""',
          examples: [],
        },
      },
      modules: [
        {
          id: "Z4wFwR7FOy+pjbIc4oK+bA2dQjc=",
          name: "general",
          description: "",
          operations: [
            {
              id: "pbTnKZf0S+fzRub/1pWrD5zbNsk=",
              name: "SET_EXPLORATORY_NAME",
              description: "",
              schema:
                'input SetExploratoryNameInput {\n  "Add your inputs here"\n  name: String!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "VyLF4PhtTbRi/adkmeHIo700dzE=",
              name: "SET_DOC_NUMBER",
              description: "",
              schema:
                'input SetDocNumberInput {\n  "Add your inputs here"\n  docNo: String! \n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "/kGF0lna2d/9PuAjxhcQMBuIY1g=",
              name: "SET_CONTENT",
              description: "",
              schema:
                'input SetContentInput {\n  "Add your inputs here"\n  content: String! \n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "yy3qFG0k67tzM1+klvVsOBe21H0=",
              name: "SET_MASTER_STATUS",
              description: "",
              schema:
                'input SetMasterStatusInput {\n  "Add your inputs here"\n  masterStatus: EStatus!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "2geMGCOayC7itdwOTxZlgxWy8qc=",
              name: "SET_PARENT",
              description: "",
              schema:
                'input SetParentInput {\n  "Add your inputs here"\n  parent: [PHID!]\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "bseBDZDxycEMsg1Ox2sD8TC7GWU=",
              name: "REMOVE_PARENT",
              description: "",
              schema:
                'input RemoveParentInput {\n  "Add your inputs here"\n  parent: [PHID!]\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "W/uD6K8Z9rqjGOtnQnkk6dWGpn4=",
              name: "SET_ATLAS_TYPE",
              description: "",
              schema:
                'input SetAtlasTypeInput {\n  "Add your inputs here"\n  atlasType: EAtlasType! \n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "Av5Jb9DN++xE6z3RVpLPn2yEV3g=",
              name: "SET_FINDINGS",
              description: "",
              schema:
                'input SetFindingsInput {\n  "Add your inputs here"\n  isAligned: Boolean!\n  comment: String!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "KK6fGHQHMJ+lV+kWARy5KRoYjfE=",
              name: "SET_REFERENCE",
              description: "",
              schema:
                'input SetReferenceInput {\n  "Add your inputs here"\n  newReference: PHID\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "TStncORsC/ZFTJTI2slSpHi4avk=",
              name: "REMOVE_REFERENCE",
              description: "",
              schema:
                'input RemoveReferenceInput {\n  "Add your inputs here"\n  reference: PHID \n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "vpQLv7KGVNUx30F6sValLa7BBdM=",
          name: "tags",
          description: "",
          operations: [
            {
              id: "G1qGUhuNhTQ0YYNKbhlTO4sa8K8=",
              name: "ADD_TAGS",
              description: "",
              schema:
                'input AddTagsInput {\n  "Add your inputs here"\n  newTags: [EGlobalTag!]!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "AuFU3WJ/oSjB1gFiKY/jRWeORRI=",
              name: "REMOVE_TAGS",
              description: "",
              schema:
                'input RemoveTagsInput {\n  "Add your inputs here"\n  tags: [EGlobalTag!]!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "hYLyB00jZOGkgOYlzIK4CQyetAc=",
          name: "context",
          description: "",
          operations: [
            {
              id: "kJ18avk8GZfFSCDB9nc3Q/IW/YM=",
              name: "ADD_CONTEXT_DATA",
              description: "",
              schema:
                'input AddContextDataInput {\n  "Add your inputs here"\n  id: PHID!\n  name: String\n  docNo: String\n  \n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "/US9/Z+DslnShdktk4kXSPk+5mQ=",
              name: "REMOVE_CONTEXT_DATA",
              description: "",
              schema:
                'input RemoveContextDataInput {\n  "Add your inputs here"\n  id: PHID!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "T9esDJaav0Urn7+xzXMG06+IvyI=",
              name: "SET_PROVENANCE",
              description: "",
              schema:
                'input SetProvenanceInput {\n  "Add your inputs here"\n  provenance: URL\n  \n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "sC5gxkpmz59EDlC1AG5kyfCR/u8=",
              name: "SET_NOTION_ID",
              description: "",
              schema:
                'input SetNotionIdInput {\n  "Add your inputs here"\n  notionID: String\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "ceBCIgyjUX1fJuBlQ8G+CnRs5uY=",
              name: "ADD_ADDITIONAL_GUIDANCE",
              description: "",
              schema:
                'input AddAdditionalGuidanceInput {\n  "Add your inputs here"\n  additionalGuidance: String!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "UUdJT6pyPYTgaTSbZvk897jwMw4=",
              name: "REMOVE_ADDITIONAL_GUIDANCE",
              description: "",
              schema:
                'input RemoveAdditionalGuidanceInput {\n  "Add your inputs here"\n  additionalGuidance: String!\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
    },
  ],
};
