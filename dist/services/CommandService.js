"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CommandService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const CommandFactory_1 = __importDefault(require("../commands/CommandFactory"));
const singleton_1 = __importDefault(require("../decorators/singleton"));
const ArgError_1 = __importDefault(require("../commands/ArgError"));
const DispatchService_1 = __importDefault(require("./DispatchService"));
let CommandService = CommandService_1 = class CommandService {
    constructor(dispatchService, factories) {
        // store command factories
        this.factories = new discord_js_1.Collection();
        for (let factory of factories) {
            const name = factory.name;
            this.factories.set(name, factory);
        }
        // register with dispatch service
        this.dispatchService = dispatchService;
        this.dispatchService.register(ctx => {
            this.execute(ctx);
        });
    }
    execute(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = this.factories.get(ctx.command);
            if (factory) {
                try {
                    const command = yield factory.create(ctx);
                    yield command.execute();
                }
                catch (e) {
                    if (e instanceof ArgError_1.default) {
                        if (e.showHelp) {
                            ctx.msg.reply(e.message, { embed: this.helpFor(ctx.command) });
                        }
                        else {
                            ctx.msg.reply(e.message);
                        }
                    }
                    else {
                        ctx.msg.reply("Erm, uh well something went wrong. Dunno what though.");
                        console.error(e);
                    }
                }
            }
        });
    }
    dispatch(msg) {
        this.dispatchService.dispatch(msg);
    }
    helpFor(commandName) {
        const factory = this.factories.get(commandName);
        if (factory) {
            return factory.helpService.getHelpEmbed();
        }
    }
    commandsEmbed() {
        const factories = this.factories.array();
        let embed = new discord_js_1.MessageEmbed();
        let documentedFactories = factories.filter(f => f.args.size > 0 || f.description);
        let undocumentedFactories = factories.filter(f => documentedFactories.indexOf(f) == -1);
        documentedFactories.forEach(f => {
            const desc = f.description === undefined ? "*No description.*" : f.description;
            embed = embed.addField(f.helpService.getUsage(), desc);
        });
        embed = embed.addField("Other commands:", undocumentedFactories.map(f => f.name).join(", "));
        return embed;
    }
};
CommandService = CommandService_1 = __decorate([
    singleton_1.default(CommandService_1),
    __param(0, inversify_1.inject(DispatchService_1.default)),
    __param(1, inversify_1.multiInject(CommandFactory_1.default)),
    __metadata("design:paramtypes", [DispatchService_1.default, Array])
], CommandService);
exports.default = CommandService;
//# sourceMappingURL=CommandService.js.map