import "../atlas.css";
import { EditorProps } from "document-model/document";
import {
  AtlasExploratoryState,
  AtlasExploratoryAction,
  AtlasExploratoryLocalState,
  actions,
} from "../../document-models/atlas-exploratory";
import { utils as documentModelUtils } from "document-model/document";
import { Button } from "@powerhousedao/design-system";

export type IProps = EditorProps<
  AtlasExploratoryState,
  AtlasExploratoryAction,
  AtlasExploratoryLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  return (
    <>
      <h1 className="atlas-header">Exploratory Document</h1>
    </>
  );
}
