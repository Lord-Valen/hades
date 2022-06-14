import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { Constructable } from '../../utils';
import { TextCommandContext } from '../models/TextCommandContext';
export declare class Validator {
    validate(arg: TextArgInstaller, ctx: TextCommandContext, value: any): Promise<any>;
    static check(): ({ constructor }: Constructable, key: string) => void;
}
