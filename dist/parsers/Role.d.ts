/// <reference types="discord.js" />
import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import Parser from './Parser';
export default class RoleParser extends Parser {
    name: string;
    description: string;
    parse(arg: Argument, context: CommandContext): Promise<import("discord.js").Role>;
}
