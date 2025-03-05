import Editor from "./editor";
import { createDocumentStory } from "@powerhousedao/builder-tools/editor-utils";

import * as AtlasGroundingModule from "../../document-models/atlas-grounding";

const { meta, CreateDocumentStory: AtlasGrounding } = createDocumentStory(
  Editor,
  AtlasGroundingModule.reducer,
  AtlasGroundingModule.utils.createDocument(),
);
export { AtlasGrounding };

export default { ...meta, title: "Atlas Grounding Editor" };
