import { Command, type CommandOptions } from '@commander-js/extra-typings';

export const buildCommand = (opts: CommandOptions) => {
    return new Command()
        .command('import-example', opts)
        .argument('<file>')
        .option('--double-sided')
        .action((targetFile, options) => {
            console.log(targetFile, options);
        });
};
