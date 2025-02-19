import Editor from "./editor";
import { createDriveStory } from "@powerhousedao/common/storybook";

const { meta, CreateDocumentStory: DocumentDrive } = createDriveStory(Editor);
export { DocumentDrive };

export default { ...meta, title: "Drive Explorer" };
