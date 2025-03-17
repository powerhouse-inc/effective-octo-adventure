import { Manifest } from "document-model";
import * as documentModelsExports from "./document-models";
import * as editorsExports from "./editors";

export const documentModels = Object.values(documentModelsExports);
export const editors = Object.values(editorsExports);

import manifestJson from "./powerhouse.manifest.json" with { type: "json" };

export const manifest: Manifest = manifestJson;
