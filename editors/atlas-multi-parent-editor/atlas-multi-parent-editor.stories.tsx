import Editor from "./editor";
import { createDocumentStory } from "@powerhousedao/builder-tools/editor-utils";

import * as AtlasMultiParentModule from "../../document-models/atlas-multi-parent";

const { meta, CreateDocumentStory: AtlasMultiParent } = createDocumentStory(
  Editor,
  AtlasMultiParentModule.reducer,
  AtlasMultiParentModule.utils.createDocument(),
);
export { AtlasMultiParent };

export default { ...meta, title: "Atlas Multi Parent Editor" };
