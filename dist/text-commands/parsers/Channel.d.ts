import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { Parser } from './Parser';
export declare class ChannelParser extends Parser {
    name: string;
    description: string;
    parse(arg: TextArgumentInstaller, context: TextCommandContext): Promise<import("discord.js").AnyChannel>;
}
