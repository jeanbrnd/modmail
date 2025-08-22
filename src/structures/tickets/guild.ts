import { findUser, res, t } from "#functions";
import { Ticket } from "@prisma/client";
import { Locale, Message, OmitPartialGroupDMChannel } from "discord.js";

interface ticketGuildChannelDataProps {
      message: OmitPartialGroupDMChannel<Message<boolean>>,
      ticket: Ticket,
      locale: Locale | undefined
};

export default async function ticketGuildChannelStructure(data: ticketGuildChannelDataProps) {
     
     const { message, ticket, locale } = data;
     
     const { author, content, client } = message;
     
     const user = await findUser(client, ticket.userId);

     if(!user) {
        message.reply(res.danger(t("errors.userNotFound", { lang: locale })));
        return;
     };
     
      const attachments = message.attachments.map(att => att.url);

      user.send({
             content: `**${author.displayName}**: ${content}`,
             files: attachments.length ? attachments : undefined
      })
      
     return;
};
