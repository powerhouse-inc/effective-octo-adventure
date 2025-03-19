import { ViewNode } from "@powerhousedao/mips-parser";
import { Node } from "./node";
import { ComponentProps } from "react";

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
