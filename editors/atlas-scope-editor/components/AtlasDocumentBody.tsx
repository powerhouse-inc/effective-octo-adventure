 import { Form } from "@powerhousedao/document-engineering/scalars";

type Props = {};

export function AtlasDocumentBody(props: Props) {
  return (
    <Form onSubmit={() => {}}>
      <div className="flex-examples">
        <div className="flex-group-1">
          <div className="flex-item flex-item-A">A</div>
          <div className="flex-item flex-item-B">B</div>
          <div className="flex-item flex-item-C">C</div>
          <div className="flex-item flex-item-D">D</div>
        </div>
        <div className="flex-group-2">
          <div className="flex-item flex-item-E">E</div>
          <div className="flex-item flex-item-F">F</div>
          <div className="flex-item flex-item-G">G</div>
          <div className="flex-item flex-item-H">H</div>
        </div>
        <div className="flex-group-3">
          <div className="flex-item flex-item-I">I</div>
          <div className="flex-item flex-item-J">J</div>
          <div className="flex-item flex-item-K">K</div>
          <div className="flex-item flex-item-L">L</div>
        </div>
      </div>
      <div className="grid-examples">
        <div className="grid-item grid-item-A">A</div>
        <div className="grid-item grid-item-B">B</div>
        <div className="grid-item grid-item-C">C</div>
        <div className="grid-item grid-item-D">D</div>
        <div className="grid-item grid-item-E">E</div>
        <div className="grid-item grid-item-F">F</div>
        <div className="grid-item grid-item-G">G</div>
        <div className="grid-item grid-item-H">H</div>
        <div className="grid-item grid-item-I">I</div>
        <div className="grid-item grid-item-J">J</div>
        <div className="grid-item grid-item-K">K</div>
        <div className="grid-item grid-item-L">L</div>
      </div>
    </Form>
  );
}
