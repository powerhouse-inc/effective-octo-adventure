import { cn } from "@powerhousedao/design-system/scalars";
import { actions } from "../../../document-models/atlas-set/index.js";
import ContentCard from "../../shared/components/content-card.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { type EditorMode } from "../../shared/types.js";
import { getFlexLayoutClassName } from "../../shared/utils/styles.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getStringValue,
  getTagText,
} from "../../shared/utils/utils.js";
import { type IProps } from "../editor.js";
import type { PHIDOption } from "@powerhousedao/design-system/ui";

interface SetFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function SetForm({
  document,
  dispatch,
  mode,
  isSplitMode,
}: SetFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);
  const parentId = document.state.global.parent?.id
    ? `phd:${document.state.global.parent.id}`
    : "";
  const parentTitle = document.state.global.parent?.title ?? "";
  const documentState = {
    ...document.state.global,
    parent: parentId,
  };

  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: parentTitle,
    value: parentId,
  };

  const originalNodeState = {
    name: "",
    parent: "",
  };

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant} className="mt-4">
        <div className="flex flex-col gap-4">
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
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
                baselineValue={originalNodeState.parent ?? ""}
                onSave={(value) => {
                  if (value === null || value === "") {
                    dispatch(
                      actions.setSetParent({
                        id: "",
                        title: "",
                      }),
                    );
                  } else {
                    const newParentId = value.split(":")[1];
                    const newParentData = fetchSelectedPHIDOption(value);
                    dispatch(
                      actions.setSetParent({
                        id: newParentId,
                        title: newParentData?.title ?? "",
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
