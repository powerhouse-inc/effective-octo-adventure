import { Command, type CommandOptions } from '@commander-js/extra-typings';
import { run } from './run.js';

export const buildCommand = (opts: CommandOptions) => {
    return new Command()
        .command('import-example', opts)
        .argument('<api-key>', 'Alchemy API key')
        .argument('<addresses...>', 'List of addresses to be imported')
        .action(async (apiKey, addresses) => {
            await run({ apiKey, addresses });
        });
};
