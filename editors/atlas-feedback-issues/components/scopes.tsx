import { type ViewNode } from "../types/view-nodes.js";
import { Node } from "./node.js";
import { type ComponentProps } from "react";

type Props = {
  readonly scopes: ViewNode[];
} & Omit<ComponentProps<typeof Node>, "viewNode" | "level">;

export function Scopes(props: Props) {
  const { scopes } = props;
  return (
    <ul>
      {scopes.map((scope) => (
        <Node key={scope.slugSuffix} {...props} viewNode={scope} />
      ))}
    </ul>
  );
}
