import { createEvent } from "#base";
import db from "#database";
import { findGuild } from "#functions";
import structures from "#structures";
import { ChannelType } from "discord.js";

createEvent({
    name: "ticket",
    event: "messageCreate",
    async run(message) {
        const { channel, author, client, guild } = message;

        if(author.bot) return;
        
        switch(channel.type) {
            
            case ChannelType.DM: {               
                const ticket = await db.tickets.getByUser(author.id);
                const configs = await db.configs.get();
                
                if(!configs.guild) return;
                 
                const guild = await findGuild(client, configs.guild);

                if(ticket) {
                    return await structures.tickets.exist({ configs, message, ticket, locale: guild?.preferredLocale, guild }); 
                } else {
                    await channel.sendTyping();
                    return await structures.tickets.create({ configs, message, locale: guild?.preferredLocale, guild });
                };
            };

            case ChannelType.GuildText: { 
                 
                const ticket = await db.tickets.getByChannel(channel.id);

                if(ticket) {
                   return await structures.tickets.guildChannel({ message, ticket, locale: guild?.preferredLocale });
                };
                
                return;
            };

            default: {
                return;
            }
        };
    },
});