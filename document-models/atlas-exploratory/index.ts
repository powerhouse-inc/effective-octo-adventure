/**
 * This is a scaffold file meant for customization.
 * Delete the file and run the code generator again to have it reset
 */

import { actions as BaseActions, DocumentModelModule } from "document-model";
import { actions as AtlasExploratoryActions } from "./gen";
import { reducer } from "./gen/reducer";
import { documentModel } from "./gen/document-model";
import genUtils from "./gen/utils";
import * as customUtils from "./src/utils";
import { AtlasExploratoryDocument } from "./gen/types";

const utils = { ...genUtils, ...customUtils };
const actions = { ...BaseActions, ...AtlasExploratoryActions };

export const module: DocumentModelModule<AtlasExploratoryDocument> = {
  reducer,
  actions,
  utils,
  documentModel,
};

export { reducer, actions, utils, documentModel };

export * from "./gen/types";
export * from "./src/utils";
