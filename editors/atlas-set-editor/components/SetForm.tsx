import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import { actions } from "../../../document-models/atlas-set/index.js";
import ContentCard from "../../shared/components/content-card.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { getFlexLayoutClassName } from "../../shared/utils/styles.js";
import {
  getCardVariant,
  getStringValue,
  getTagText,
} from "../../shared/utils/utils.js";
import { type IProps } from "../editor.js";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import { useParentOptions } from "../../shared/hooks/useParentOptions.js";
import { useBaseDocument } from "../../shared/hooks/useBaseDocument.js";

interface SetFormProps
  extends Pick<IProps, "context" | "document" | "dispatch"> {
  mode: ViewMode;
  isSplitMode?: boolean;
}

export function SetForm({
  context,
  document,
  dispatch,
  mode,
  isSplitMode,
}: SetFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const fetchOptionsCallback = useParentOptions("sky/atlas-set");

  const parentId = document.state.global.parent?.id
    ? `phd:${document.state.global.parent.id}`
    : "";
  const parentTitle = document.state.global.parent?.title ?? "";
  const parentType = document.state.global.parent?.documentType ?? "";

  const documentState = {
    ...document.state.global,
    parent: parentId,
  };

  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: parentTitle,
    path: parentType,
    value: parentId,
  };

  const baseDocument = useBaseDocument(document, context);

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className="flex flex-col gap-4">
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={baseDocument.state.global.name}
                onSave={(value) => {
                  dispatch(actions.setSetName({ name: getStringValue(value) }));
                }}
                placeholder="The Governance Scope"
              />
            </div>

            <div className={cn("flex-1")}>
              <SinglePhIdForm
                label="Parent Document"
                value={documentState.parent}
                fetchOptionsCallback={fetchOptionsCallback}
                baselineValue={
                  baseDocument.state.global.parent?.id
                    ? `phd:${baseDocument.state.global.parent.id}`
                    : ""
                }
                baselineIcon={baseDocument.state.global.parent?.icon ?? ""}
                baselineTitle={baseDocument.state.global.parent?.title ?? ""}
                baselineType={
                  baseDocument.state.global.parent?.documentType ?? ""
                }
                onSave={(value) => {
                  if (value === null || value === "") {
                    dispatch(
                      actions.setSetParent({
                        id: "",
                      }),
                    );
                  } else {
                    const newParentId = value.split(":")[1];
                    const newParentData = fetchOptionsCallback(value)[0];
                    const documentType =
                      typeof newParentData?.path === "object"
                        ? newParentData.path.text
                        : newParentData?.path;
                    dispatch(
                      actions.setSetParent({
                        id: newParentId,
                        title: newParentData?.title ?? "",
                        documentType: documentType ?? "",
                      }),
                    );
                  }
                }}
                initialOptions={[parentPHIDInitialOption]}
              />
            </div>
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
