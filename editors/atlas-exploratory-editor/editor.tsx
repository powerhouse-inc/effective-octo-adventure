import { type EditorProps } from "document-model";
import {
  actions,
  type AtlasExploratoryDocument,
  type EStatus,
  type EGlobalTag,
} from "../../document-models/atlas-exploratory/index.js";
import { BooleanField, EnumField, Form, PHIDField, StringField, UrlField } from "@powerhousedao/design-system/scalars";
import type { IdAutocompleteOption } from "../atlas-scope-editor/components/SetPHIDForm.js";
import docsIndex from "../../scripts/apply-changes/data/index.json" with { type: "json" };

export type IProps = EditorProps<AtlasExploratoryDocument>;

export default function Editor(props: IProps) {
  const { dispatch } = props;
  const documentState = props.document.state.global;

  const onSubmit = (data: Record<string, any>) => {
    if (data['docNo'] !== undefined) {
      dispatch(actions.setDocNumber({docNo: data['docNo'] as string}));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setExploratoryName({name: data['name'] as string}));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({masterStatus: data['masterStatus'] as EStatus}));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({content: data['content'] as string}));
    }
    if (data['parent'] !== undefined) {
      dispatch(actions.setParent({parent: [data['parent'] as string]}));
    }

    // TODO: save other fields
    
    if (data['tags'] !== undefined) {
      dispatch(actions.addTags({newTags: [data['tags'] as EGlobalTag]}));
    }
  }

  const cb = async (phid: string): Promise<IdAutocompleteOption[]> =>
    (docsIndex as IdAutocompleteOption[]).filter(
      (entry) =>
        entry.value.includes(phid) || (entry.title || "").includes(phid),
    );

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <h1 className="atlas-header">Exploratory Document</h1>

      {/* TODO: remove form components for this editor */}
      <div className="my-[2em] mx-[5%]">
        <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{...documentState}}>
          {({ triggerSubmit }) => (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-2">
                <div className="flex-0.5">
                  <StringField name="docNo" label="Doc №" placeholder="A." onBlur={triggerSubmit}/>
                </div>
                <div className="flex-2">
                  <StringField name="name" label="Name" placeholder="Exploratory Document" onBlur={triggerSubmit}/>
                </div>
                <div className="flex-1">
                  <EnumField 
                    label="Status"
                    name="masterStatus"
                    onChange={triggerSubmit}
                    options={[
                      { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                      { value: "PROVISIONAL", label: "PROVISIONAL" },
                      { value: "APPROVED", label: "APPROVED " },
                      { value: "DEFERRED", label: "DEFERRED" },
                      { value: "ARCHIVED", label: "ARCHIVED" },
                    ]}
                    required
                    variant="Select"
                  />
                </div>
              </div>
              <StringField name="content" multiline={true} label="Content" placeholder="Content" onBlur={triggerSubmit}/>
              <PHIDField
                name="parent"
                label="Parent Document" 
                placeholder="PHID" 
                onBlur={triggerSubmit}
                fetchOptionsCallback={cb}
                fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                variant="withValueTitleAndDescription"
                allowUris={true}
              />
              <BooleanField name="aligned" label="Aligned" isToggle onChange={triggerSubmit}/>
              <StringField name="findings" multiline={true} label="Findings" placeholder="Findings" onBlur={triggerSubmit}/>
              <StringField name="additionalGuidance" multiline={true} label="Additional Guidance" placeholder="Additional Guidance" onBlur={triggerSubmit}/>
              <UrlField name="provenance" label="Provenance" placeholder="Provenance" onBlur={triggerSubmit}/>
              <EnumField
                label="Tags"
                multiple
                name="globalTags"
                onBlur={triggerSubmit}
                options={[
                  {
                    label: "RECURSIVE_IMPROVEMENT",
                    value: "RECURSIVE_IMPROVEMENT",
                  },
                  { label: "SCOPE_ADVISOR", value: "SCOPE_ADVISOR" },
                  { label: "DAO_TOOLKIT", value: "DAO_TOOLKIT" },
                  { label: "PURPOSE_SYSTEM", value: "PURPOSE_SYSTEM" },
                  { label: "ML_LOW_PRIORITY", value: "ML_LOW_PRIORITY" },
                  { label: "EXTERNAL_REFERENCE", value: "EXTERNAL_REFERENCE" },
                  { label: "ML_DEFER", value: "ML_DEFER" },
                  { label: "SUBDAO_INCUBATION", value: "SUBDAO_INCUBATION" },
                  { label: "V1_MIP", value: "V1_MIP" },
                  { label: "ML_HIGH_PRIORITY", value: "ML_HIGH_PRIORITY" },
                  {
                    label: "ECOSYSTEM_INTELLIGENCE",
                    value: "ECOSYSTEM_INTELLIGENCE",
                  },
                  {
                    label: "LEGACY_TERM_USE_APPROVED",
                    value: "LEGACY_TERM_USE_APPROVED",
                  },
                  { label: "CAIS", value: "CAIS" },
                  { label: "INTERNAL_REFERENCE", value: "INTERNAL_REFERENCE" },
                  { label: "FACILITATORDAO", value: "FACILITATORDAO" },
                  { label: "ML_MED_PRIORITY", value: "ML_MED_PRIORITY" },
                  { label: "AVC", value: "AVC" },
                  { label: "P0_HUB_ENTRY_NEEDED", value: "P0_HUB_ENTRY_NEEDED" },
                  { label: "ANON_WORKFORCE", value: "ANON_WORKFORCE" },
                  { label: "NEWCHAIN", value: "NEWCHAIN" },
                  {
                    label: "ML_SUPPORT_DOCS_NEEDED",
                    value: "ML_SUPPORT_DOCS_NEEDED",
                  },
                  { label: "SUBDAO_REWARDS", value: "SUBDAO_REWARDS" },
                  { label: "TWO_STAGE_BRIDGE", value: "TWO_STAGE_BRIDGE" },
                ]}
              />
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
