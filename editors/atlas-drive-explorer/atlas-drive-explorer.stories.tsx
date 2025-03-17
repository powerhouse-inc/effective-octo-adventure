import Editor from "./editor";
import { createDocumentStory } from "@powerhousedao/builder-tools/editor-utils";

import * as AtlasScopeModule from "../../document-models/atlas-scope";
const { meta, CreateDocumentStory: AtlasScope } = createDocumentStory(
  Editor,
  AtlasScopeModule.reducer,
  AtlasScopeModule.utils.createDocument(),
);
export { AtlasScope };

export default { ...meta, title: "Atlas Drive Explorer" };
