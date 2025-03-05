import Editor from "./editor";
import { createDocumentStory } from "@powerhousedao/builder-tools/editor-utils";

import * as AtlasExploratoryModule from "../../document-models/atlas-exploratory";

const { meta, CreateDocumentStory: AtlasExploratory } = createDocumentStory(
  Editor,
  AtlasExploratoryModule.reducer,
  AtlasExploratoryModule.utils.createDocument(),
);
export { AtlasExploratory };

export default { ...meta, title: "Atlas Exploratory Editor" };
