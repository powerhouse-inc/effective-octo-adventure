import { type EditorProps } from "document-model";
import Layout, { LayoutContent, LayoutHeader, LayoutMain } from "../shared/components/Layout.js";
import ToggleSwitch from "../shared/components/toggle-switch.js";
import { useState } from "react";
import { cn, EnumField, Form, PHIDField, StringField, UrlField } from "@powerhousedao/design-system/scalars";
import { fetchPHIDOptions, fetchSelectedPHIDOption } from "../shared/utils/utils.js";
import { actions, type AtlasGroundingDocument, type GGlobalTag, type GStatus } from "../../document-models/atlas-grounding/index.js";

export type IProps = EditorProps<AtlasGroundingDocument>;

export default function Editor(props: IProps) {
  const [isUnifiedMode, setIsUnifiedMode] = useState(true);
  const [isEditMode, setIsEditMode] = useState(true);

  const { dispatch } = props;
  const documentState = props.document.state.global;

  const onSubmit = (data: Record<string, any>) => {
    if (data['docNo'] !== undefined) {
      dispatch(actions.setDocNumber({docNo: data['docNo'] as string}));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setGroundingName({name: data['name'] as string}));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({masterStatus: data['masterStatus'] as GStatus}));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({content: data['content'] as string}));
    }
    if (data['parent'] !== undefined) {
      dispatch(actions.setParent({id: data['parent'] as string}));
    }

    // TODO: save other possible fields
    
    if (data['globalTags'] !== undefined) {
      dispatch(actions.addTags({tags: [data['globalTags'] as GGlobalTag]}));
    }
  }

  const headerActions = (
    <>
      <button
        onClick={() => setIsUnifiedMode(true)}
        className={cn(
          "flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit",
          "font-medium text-sm cursor-pointer transition-all duration-200 outline-none",
          "bg-white text-gray-900 shadow-sm",
          isUnifiedMode ? "bg-gray-100 text-gray-900" : "bg-white text-gray-900"
        )}
      >
        Unified
      </button>
      <button
        onClick={() => setIsEditMode(true)}
        className={cn(
          "flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit",
          "font-medium text-sm cursor-pointer transition-all duration-200 outline-none",
          "bg-white text-gray-900 shadow-sm",
          isEditMode ? "bg-gray-100 text-gray-900" : "bg-white text-gray-900"
        )}
      >
        Edit
      </button>
      <ToggleSwitch
        className={cn("hidden")}
        options={["Unified", "Split"]}
        defaultSelected={0}
        onChange={(selectedIndex) => setIsUnifiedMode(selectedIndex === 0)}
      />
      <ToggleSwitch
        className={cn("hidden")}
        options={["Read Only", "Edit"]}
        defaultSelected={1}
        onChange={(selectedIndex) => setIsEditMode(selectedIndex === 1)}
      />
    </>
  );

  return (
    <div className={cn("h-screen flex flex-col overflow-x-hidden overflow-y-auto")}>
      <Layout>
        <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{...documentState}}>
        {({ triggerSubmit }) => (
          <>
            <LayoutHeader>
              <div>
                <h1 className={cn("text-xl font-semibold")}>Grounding Document</h1>
              </div>
              <div className={cn("flex items-center gap-2")}>
                <div className={cn("atlas-cell-notionId")}>
                  <span className={cn("atlas-cell-notionId-label")}>Notion ID</span>
                  <span className={cn("atlas-cell-notionId-value")}>
                    {documentState.notionId || "-"}
                  </span>
                </div>
              </div>
            </LayoutHeader>

            <LayoutContent>
              <h2 className={cn("text-gray-700")}>A.5 / A.5.3 - Brand Identity and Difference</h2>
              <div className={cn("flex items-center gap-4")}>{headerActions}</div>
            </LayoutContent>

            <div className={cn("flex-1 overflow-y-auto")}>
              <LayoutMain tagText="Official Atlas" variant="gray">
                <div className={cn("flex flex-col gap-6 p-6")}>
                  <div className={cn("flex flex-row justify-between gap-2")}>
                    <div className={cn("flex-1")}>
                      <StringField name="docNo" label="Doc №" placeholder="A." onBlur={triggerSubmit} />
                    </div>
                    <div className={cn("flex-1")}>
                      <StringField name="name" label="Name" placeholder="Document name" onBlur={triggerSubmit} />
                    </div>
                    <div className={cn("flex-1")}>
                      <EnumField
                        name="masterStatus"
                        label="Status"
                        options={[
                          { value: "APPROVED", label: "APPROVED " },
                          { value: "ARCHIVED", label: "ARCHIVED" },
                          { value: "DEFERRED", label: "DEFERRED" },
                          { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                          { value: "PROVISIONAL", label: "PROVISIONAL" },
                        ]}
                        required
                        variant="Select"
                        onChange={triggerSubmit}
                      />
                    </div>
                  </div>

                  <div className={cn("flex-1")}>
                    <StringField name="content" label="Content" placeholder="Content" onBlur={triggerSubmit} multiline />
                  </div>

                  <div className={cn("flex flex-col gap-4 w-1/2")}>
                    <div className={cn("flex flex-col gap-2 flex-1")}>
                      <PHIDField
                        name="parent"
                        label="Parent Document"
                        placeholder="phd:"
                        variant="withValueTitleAndDescription"
                        allowUris
                        fetchOptionsCallback={fetchPHIDOptions}
                        fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                        onBlur={triggerSubmit}
                      />
                    </div>
                    <div className={cn("flex flex-col gap-2 flex-1")}>
                      <UrlField name="provenance" label="Provenance" placeholder="Provenance" onBlur={triggerSubmit} />
                    </div>
                    <div className={cn("flex flex-col gap-2 flex-1")}>
                      <PHIDField
                        name="originalContextData"
                        label="Original Context Data"
                        placeholder="phd:"
                        variant="withValueTitleAndDescription"
                        allowUris
                        fetchOptionsCallback={fetchPHIDOptions}
                        fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                        onBlur={triggerSubmit}
                      />
                    </div>
                    <div className={cn("flex flex-col gap-2 flex-1")}>
                      <PHIDField
                        name="references"
                        label="Atlas References"
                        placeholder="phd:"
                        variant="withValueTitleAndDescription"
                        allowUris
                        fetchOptionsCallback={fetchPHIDOptions}
                        fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                        onBlur={triggerSubmit}
                      />
                    </div>
                    <div className={cn("flex flex-col gap-2 flex-1")}>
                      <EnumField
                        name="globalTags"
                        label="Tags"
                        options={[
                          { value: "AVC", label: "AVC" },
                          { value: "CAIS", label: "CAIS" },
                          { value: "DAO_TOOLKIT", label: "DAO_TOOLKIT" },
                          { value: "ECOSYSTEM_INTELLIGENCE", label: "ECOSYSTEM_INTELLIGENCE" },
                          { value: "EXTERNAL_REFERENCE", label: "EXTERNAL_REFERENCE" },
                          { value: "LEGACY_TERM_USE_APPROVED", label: "LEGACY_TERM_USE_APPROVED" },
                          { value: "ML_DEFER", label: "ML_DEFER" },
                          { value: "ML_LOW_PRIORITY", label: "ML_LOW_PRIORITY" },
                          { value: "ML_SUPPORT_DOCS_NEEDED", label: "ML_SUPPORT_DOCS_NEEDED" },
                          { value: "NEWCHAIN", label: "NEWCHAIN" },
                          { value: "PURPOSE_SYSTEM", label: "PURPOSE_SYSTEM" },
                          { value: "RECURSIVE_IMPROVEMENT", label: "RECURSIVE_IMPROVEMENT" },
                          { value: "SCOPE_ADVISOR", label: "SCOPE_ADVISOR" },
                          { value: "TWO_STAGE_BRIDGE", label: "TWO_STAGE_BRIDGE" },
                        ]}
                        variant="Select"
                        multiple
                        onChange={triggerSubmit}
                      />
                    </div>
                  </div>
                </div>
              </LayoutMain>
            </div>
          </>
        )}
        </Form>
      </Layout>
    </div>
  );
}
