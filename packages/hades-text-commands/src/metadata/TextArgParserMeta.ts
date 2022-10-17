import { TextArgParser as TextParser } from "../parsers";
import { Newable } from "hades";


export class TextArgParserMeta {
    type: Newable<TextParser>;
    description?: string;
}
