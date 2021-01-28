import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import Parser from './Parser';
export default class IntegerParser extends Parser {
    name: string;
    description: string;
    parse(arg: Argument, context: CommandContext): Promise<number>;
}
