import { type Manifest } from "document-model";
import * as documentModelsExports from "./document-models/index.js";
import * as editorsExports from "./editors/index.js";

export const documentModels = Object.values(documentModelsExports);
export const editors = Object.values(editorsExports);

import manifestJson from "./powerhouse.manifest.json" with { type: "json" };

export const manifest: Manifest = manifestJson;
