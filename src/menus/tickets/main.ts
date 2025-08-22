import { t } from "#functions";
import { brBuilder, createContainer, createSeparator } from "@magicyan/discord";
import { Ticket } from "@prisma/client";
import { ButtonBuilder, ButtonStyle, Locale, Message, MessageCreateOptions, MessageFlags } from "discord.js";

interface ticketMainDataProps {
     message: Message,
     ticket: Ticket,
     guildLocale: Locale | undefined
};

export default function ticketMainMenu<R>(data: ticketMainDataProps): R {
      
      const { message, ticket, guildLocale } = data;

      const container = createContainer(constants.colors.success,
              brBuilder(
                `## ${t("menus.ticket.main.title", { userDisplay: message.author.displayName, lang: guildLocale })}`,
                `> ${t("menus.ticket.main.createdBy", { username: message.author.username, id: message.author.id, lang: guildLocale })}`,
                `> ${t("menus.ticket.main.subject", { content: message.content, lang: guildLocale })}`,
                `> ${t("menus.ticket.main.creationDate", { timestamp: Math.floor(message.createdTimestamp / 1000), lang: guildLocale })}`, 
              ),
              createSeparator({divider: true}),
              new ButtonBuilder({
                  custom_id: `ticket/close/${ticket.id}`,
                  label:  t("menus.ticket.main.closeButton", { lang: guildLocale }),
                  style: ButtonStyle.Secondary
              }),

      );

      return {
           components: [container],
           flags: [MessageFlags.IsComponentsV2]
      } satisfies MessageCreateOptions as R;
}