import { createResponder, ResponderType } from "#base";
import db from "#database";
import { findChannelById, findUser, res, t } from "#functions";
import { createContainer, createFile } from "@magicyan/discord";
import { AttachmentBuilder, ChannelType } from "discord.js";

createResponder({
    customId: "ticket/:action/:id",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { action, id }) {
         
        const { channel, client, locale, guild } = interaction;

        switch(action) {

            case "close": {
                await interaction.reply(res.primary("Finalizando Ticket...",));
                
                const ticket = await db.tickets.delete(id);
                
                if(!ticket) {
                    await interaction.editReply(res.danger(t("errors.ticketNotFound", { lang: locale })));
                    return;
                };

                const user = await findUser(client, ticket.userId);

                if(user) {
                   await user.send(res.danger(t("messages.ticketClosedBy", { user: user.id, lang: locale })));
                }; 

                const messages = await channel?.messages.fetch({ limit: 100 }); 

                await channel?.delete();
                
                const configs = await db.configs.get();
               
                if(configs.channelLogs) {
                  
                  const channelLogs = await findChannelById(guild, configs?.channelLogs);

                  if(!channelLogs || channelLogs.type !== ChannelType.GuildText) return;

                   const sorted = [...(messages ?? []).values()].sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                   const transcript = sorted.map(m => `[${new Date(m.createdTimestamp).toLocaleString()}] ${m.author.tag}: ${m.content || "[anexo]"}`).join("\n");
                   const buffer = Buffer.from(transcript, "utf-8");
                   const attachmentFile = new AttachmentBuilder(buffer, { name: `transcript-${ticket.userId}.txt` });
                   
                   
                   const container = createContainer(constants.colors.default,
                      `📑 Transcript do ticket **${user?.username}** fechado por <@${interaction.user.id}>`,
                      createFile(`attachment://transcript-${ticket.userId}.txt`)
                   );

                   await channelLogs.send({ files: [attachmentFile], components: [container], flags: ["IsComponentsV2"]});

                }
                return;
            };

            default: { 
                return;
            }
        }
    },
});