import { Collection } from 'discord.js';
import { multiInject } from 'inversify';

import { singleton } from '../decorators';
import Parser from '../parsers/Parser';
import { Constructor, Newable } from '../utils';


export type TypeMap = [Constructor, Newable<Parser>];

@singleton(InferenceService)
export default class InferenceService {

    private types = new Collection<Constructor, Newable<Parser>>();

    constructor(
        @multiInject('MappedTypes') types: TypeMap[],
    ) {
        for (let [from, to] of types) {
            this.types.set(from, to);
        }
    }

    infer(fromType: Constructor) {
        for (let [ctor, type] of this.types) {
            if (ctor.toString() === fromType.toString()) {
                return type;
            }
        }
    }
}
