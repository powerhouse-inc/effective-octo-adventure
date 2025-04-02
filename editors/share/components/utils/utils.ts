import { IdAutocompleteOption } from "../../../atlas-scope-editor/components/SetPHIDForm.js";
import docsIndex from "../../../../scripts/apply-changes/data/index.json" with { type: "json" };
export const cb = async (phid: string): Promise<IdAutocompleteOption[]> =>
    (docsIndex as IdAutocompleteOption[]).filter(
      (entry) =>
        entry.value.includes(phid) || (entry.title || "").includes(phid),
    );