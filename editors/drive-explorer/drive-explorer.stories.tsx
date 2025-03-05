import { createDriveStory } from "@powerhousedao/common/editors/utils/storybook";
import Editor from "./editor";

const { meta, CreateDocumentStory: DocumentDrive } = createDriveStory(Editor);
export { DocumentDrive };

export default { ...meta, title: "Drive Explorer" };
