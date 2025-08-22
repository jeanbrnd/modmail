import db from "#database";
import { res, t } from "#functions";
import menus from "#menus";
import { Config } from "@prisma/client";
import { ChannelType, Guild, Locale, Message, OmitPartialGroupDMChannel, PermissionFlagsBits } from "discord.js";

interface ticketCreateDataProps {
      message: OmitPartialGroupDMChannel<Message<boolean>>,
      configs: Config,
      guild: Guild | null,
      locale: Locale | undefined
};

export default async function ticketCreateStructure(data: ticketCreateDataProps) {
     
     const { message, configs, locale, guild} = data;
     
     const { author } = message;
          
     if(!guild) {
        message.reply(res.danger(t("errors.serverNotFound", { lang: locale })));
        return;
     };
     

     const channel = await guild?.channels.create({ 
         name: `📭・ticket-${author.displayName}`,
         ...(configs.category ? { parent: configs.category } : { }),
         permissionOverwrites: [
            {
                id: guild.roles.everyone,
                deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.SendMessages],
            },
           
            ...(configs.rolePermission ? [{
                id: configs.rolePermission,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.SendMessages]
            }] : [])
         ]
     }).catch(() => null);

     if(!channel || channel.type !== ChannelType.GuildText) {
        message.reply(res.danger(t("errors.ticketCreate", { lang: locale })));
        return;
     };

     const ticket = await db.tickets.create({ userId: author.id, channelId: channel.id, reason: message.content, });
     
     message.reply(res.success(t("messages.ticketCreate", { author: author.id, lang: locale })));
     
     channel.send(menus.tickets.main({ message, ticket, guildLocale: guild.preferredLocale }));
   
     return;
};
