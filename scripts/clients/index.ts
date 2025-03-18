import AtlasScope from "./atlas-scope.cjs";
import AtlasFoundation from "./atlas-foundation.cjs";
import SystemClient from "./system.cjs";

const { client: atlasScopeClient } = AtlasScope;
const { client: atlasFoundationClient } = AtlasFoundation;
const { client: systemClient } = SystemClient;

console.log("Atlas Scope Client", SystemClient);

export { atlasScopeClient, atlasFoundationClient, systemClient };
