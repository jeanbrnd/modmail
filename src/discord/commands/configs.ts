import { createCommand } from "#base";
import db from "#database";
import { res, t } from "#functions";
import menus from "#menus";
import { ApplicationCommandType } from "discord.js";
import { env } from "process";


createCommand({
    name: "settings",
    nameLocalizations: { 
        "pt-BR": "configuracoes"
    },
    description: "[⚙️ Settings] - Change modmail settings",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        
        const { member, client, locale } = interaction;
        
        await interaction.deferReply({ flags: "Ephemeral" });

        const configs = await db.configs.get();
        
        const rolePermissionId = configs?.rolePermission;

        if(member.id !== env.OWNER_ID && rolePermissionId && !member.roles.cache.has(rolePermissionId)) {
            await interaction.editReply(res.danger(t("errors.notPermission", { lang: locale })));
            return;
        };

        await interaction.editReply(menus.configs.main({ configs, member, client, locale }));

        return;
    }
});