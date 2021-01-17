import { inject } from "inversify";

import { singleton } from "../decorators";
import HadesBotService from "./HadesBotService";
import HadesClient from "./HadesClient";


@singleton(EventService)
export default abstract class EventService {
    client: HadesClient;

    constructor(@inject(HadesClient) client: HadesClient) {
        this.client = client;
    }

    register(bot: HadesBotService) {
        this.client
            .on('debug', bot.onDebug.bind(bot))
            .on('error', bot.onError.bind(bot))
            .on('warn', bot.onWarn.bind(bot))
            .on('channelCreate', bot.onChannelCreate.bind(bot))
            .on('channelDelete', bot.onChannelDelete.bind(bot))
            .on('channelPinsUpdate', bot.onChannelPinsUpdate.bind(bot))
            .on('channelUpdate', bot.onChannelUpdate.bind(bot))
            .on('ready', bot.onReady.bind(bot))
            // .on('reconnecting', bot.onReconnecting.bind(bot))
            .on('disconnect', bot.onDisconnect.bind(bot))
            .on('emojiCreate', bot.onEmojiCreate.bind(bot))
            .on('emojiDelete', bot.onEmojiDelete.bind(bot))
            .on('emojiUpdate', bot.onEmojiUpdate.bind(bot))
            .on('guildBanAdd', bot.onGuildBanAdd.bind(bot))
            .on('guildBanRemove', bot.onGuildBanRemove.bind(bot))
            .on('guildCreate', bot.onGuildCreate.bind(bot))
            .on('guildDelete', bot.onGuildDelete.bind(bot))
            .on('guildUnavailable', bot.onGuildUnavailable.bind(bot))
            .on('guildMemberAdd', bot.onGuildMemberAdd.bind(bot))
            .on('guildMemberAvailable', bot.onGuildMemberAvailable.bind(bot))
            .on('guildMemberRemove', bot.onGuildMemberRemove.bind(bot))
            .on('guildMemberSpeaking', bot.onGuildMemberSpeaking.bind(bot))
            .on('guildMemberUpdate', bot.onGuildMemberUpdate.bind(bot))
            .on('guildMembersChunk', bot.onGuildMembersChunk.bind(bot))
            .on('guildUpdate', bot.onGuildUpdate.bind(bot))
            .on('message', bot.onMessage.bind(bot))
            .on('messageDelete', bot.onMessageDelete.bind(bot))
            .on('messageDeleteBulk', bot.onMessageDeleteBulk.bind(bot))
            .on('messageReactionAdd', bot.onMessageReactionAdd.bind(bot))
            .on('messageReactionRemove', bot.onMessageReactionRemove.bind(bot))
            .on('messageReactionRemoveAll', bot.onMessageReactionRemoveAll.bind(bot))
            .on('messageUpdate', bot.onMessageUpdate.bind(bot))
            .on('presenceUpdate', bot.onPresenceUpdate.bind(bot))
            .on('typingStart', bot.onTypingStart.bind(bot))
            // .on('typingStop', bot.onTypingStop.bind(bot))
            .on('roleCreate', bot.onRoleCreate.bind(bot))
            .on('roleDelete', bot.onRoleDelete.bind(bot))
            .on('roleUpdate', bot.onRoleUpdate.bind(bot))
            // .on('userNoteUpdate', bot.onUserNoteUpdate.bind(bot))
            .on('userUpdate', bot.onUserUpdate.bind(bot))
            .on('voiceStateUpdate', bot.onVoiceStateUpdate.bind(bot))
    }
}
