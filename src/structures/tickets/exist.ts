import db from "#database";
import { findChannelById, res, t } from "#functions";
import { Config, Ticket } from "@prisma/client";
import { ChannelType, Guild, Locale, Message, OmitPartialGroupDMChannel, } from "discord.js";

interface ticketExistDataProps {
      message: OmitPartialGroupDMChannel<Message<boolean>>,
      ticket: Ticket,
      guild: Guild | null,
      configs: Config,
      locale: Locale | undefined
};

export default async function ticketExistStructure(data: ticketExistDataProps) {
     
     const { message, configs, ticket, locale, guild } = data;
     
     const { content } = message;
     
     if(!configs.guild) return;

     if(!guild) {
          message.reply(t("errors.serverNotFound", { lang: locale }));
          return;
     };

     const channel = await findChannelById(guild, ticket.channelId);

     if(!channel || channel.type !== ChannelType.GuildText){
          await db.tickets.delete(ticket.id);
          message.reply(res.danger(t("errors.channelNotFound", { lang: locale })));
          return;
     };
     
     const attachments = message.attachments.map(att => att.url);

     await channel.send({ 
          content,
          files: attachments.length ? attachments : undefined
     });
     
     await message.react("📨");
     
     return;
};
