import { pullAlchemyData } from "./utils/pullAlchemyData.js";

export type ImportExampleParams = {
    apiKey: string,
    addresses: string[],
}

export const run = async (params: ImportExampleParams) => {
    const results = await pullAlchemyData(params.addresses, params.apiKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    console.log(results.map(r => r.result.transfers));
    console.log("Done.");
};
