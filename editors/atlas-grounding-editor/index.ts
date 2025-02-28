import { ExtendedEditor, EditorContextProps } from "document-model-libs";
import Editor from "./editor";
import {
  AtlasGroundingState,
  AtlasGroundingAction,
  AtlasGroundingLocalState,
} from "../../document-models/atlas-grounding";

export const module: ExtendedEditor<
  AtlasGroundingState,
  AtlasGroundingAction,
  AtlasGroundingLocalState,
  EditorContextProps
> = {
  Component: Editor,
  documentTypes: ["sky/atlas-grounding"],
  config: {
    id: "AtlasGrounding",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
