import { program } from '@commander-js/extra-typings';
import { buildCommand } from './import-example/index.js';

program.addCommand(buildCommand(program.opts()));
program.parse();
