import { EditorProps } from "document-model/document";
import {
  DocumentDriveState,
  DocumentDriveAction,
  DocumentDriveLocalState,
  useDriveActions,
  useDriveContext,
} from "@powerhousedao/common";
import { actions } from "@powerhousedao/common/document-drive";
import { Button } from "@powerhousedao/design-system";
import { Input } from "@powerhousedao/design-system/scalars";
import { useState } from "react";
import { generateId } from "document-model/utils";

import "../atlas.css";

export type IProps = EditorProps<
  DocumentDriveState,
  DocumentDriveAction,
  DocumentDriveLocalState
>;

export default function Editor(props: IProps) {
  const { document, dispatch } = props;

  // useDriveContext returns state and methods provided by the host app (Connect)
  // - documentModels, showCreateDocumentModal, etc
  const context = useDriveContext();

  // useDriveActions provides methods to dispatch drive actions
  // - `addFolder(...)` is a wrapper around `dispatch(actions.addFolder(...))`
  const { addFolder } = useDriveActions(document, dispatch, context);

  const [name, setName] = useState("");

  const handleAddFolder = () => {
    if (!name) return;
    setName("");
    return addFolder(name);
    /* This is the equivalent of:
      dispatch(
        actions.addFolder({
          name,
          id: generateId(),
        }),
      );
     */
  };

  return (
    <div>
      <div
        className="flex gap-2 items-center mb-2"
        style={{ maxWidth: "400px" }}
      >
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <Button onClick={handleAddFolder} style={{ flexShrink: 0 }}>
          Add Folder
        </Button>
      </div>
      <pre>{JSON.stringify(document.state.global.nodes, null, 2)}</pre>
    </div>
  );
}
