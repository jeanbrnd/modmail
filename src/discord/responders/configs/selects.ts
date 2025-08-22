import { createResponder, ResponderType } from "#base";
import db from "#database";
import menus from "#menus";

createResponder({
    customId: "configs/:action",
    types: [ResponderType.StringSelect, ResponderType.ChannelSelect, ResponderType.RoleSelect], cache: "cached",
    async run(interaction, { action }) {
        
        const { values, member, client, locale } = interaction;

        await interaction.deferUpdate({ });

        switch(action) {
             
            case "category": {                  
                const category = values[0];
                const configs = await db.configs.update({ category });
                interaction.editReply(menus.configs.main({ configs, member, client, locale }));
                return;
            };

            case "guild": {               
                const guild = values[0];
                const configs = await db.configs.update({ guild });
                interaction.editReply(menus.configs.main({ configs, member, client, locale }));
                return;
            };

            case "channel": {     
                const channelLogs = values[0];
                const configs = await db.configs.update({ channelLogs });
                interaction.editReply(menus.configs.main({ configs, member, client, locale }));
                return;
            };

            case "role": {   
                const rolePermission = values[0];
                const configs = await db.configs.update({ rolePermission });
                interaction.editReply(menus.configs.main({ configs, member, client, locale }));
                return;
            };

            default: { 
                return;
            }
        }
    },
});