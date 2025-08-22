


import { t } from "#functions";
import { createContainer, Separator } from "@magicyan/discord";
import { Config } from "@prisma/client";
import { ChannelSelectMenuBuilder, ChannelType, Client, GuildMember, Locale, RoleSelectMenuBuilder, SelectMenuDefaultValueType, StringSelectMenuBuilder, type InteractionReplyOptions } from "discord.js";

interface configMainDataProps { 
  configs: Config,
  client: Client,
  member: GuildMember,
  locale: Locale | undefined
};

export default function configsMainMenu<R>(data: configMainDataProps): R {
    
    const { configs, member, client, locale } = data;
    
    const container = createContainer(constants.colors.default,      
        `## ${t("menus.config.main.title", { lang: locale})}`,
        `> ${t("menus.config.main.greeting", { member: member.id, lang: locale })}`,
        Separator.Default,
        
        `### ${t("menus.config.main.sections.guild.title", { lang: locale })}`,
        `> ${t("menus.config.main.sections.guild.description", { lang: locale })}`,
        new StringSelectMenuBuilder({ customId: "configs/guild", placeholder: `${t("menus.config.main.sections.guild.placeholder", { lang: locale })}`, options: client.guilds.cache.map(({ name, description, id }) => ({ label: name, description: description ?? "", value: id }))}),
        Separator.Hidden,

        `### ${t("menus.config.main.sections.category.title", { lang: locale })}`,
        `> ${t("menus.config.main.sections.category.description", { lang: locale })}`,
        new ChannelSelectMenuBuilder({ channelTypes: [ChannelType.GuildCategory], customId: "configs/category", placeholder: `${t("menus.config.main.sections.category.placeholder", { lang: locale })}`, ...configs.category ? { defaultValues: [{ id: configs.category, type: SelectMenuDefaultValueType.Channel }]} : []}),
        Separator.Hidden,

        `### ${t("menus.config.main.sections.channel.title", { lang: locale })}`,
        `> ${t("menus.config.main.sections.channel.description", { lang: locale })}`,
        new ChannelSelectMenuBuilder({ channelTypes: [ChannelType.GuildText], customId: "configs/channel", placeholder: `${t("menus.config.main.sections.channel.placeholder", { lang: locale })}`, ...configs.channelLogs ? { defaultValues: [{ id: configs.channelLogs, type: SelectMenuDefaultValueType.Channel }]} : []}),
        Separator.Hidden,

        `### ${t("menus.config.main.sections.role.title", { lang: locale })}`,
        `> ${t("menus.config.main.sections.role.description", { lang: locale })}`,
        new RoleSelectMenuBuilder({ customId: "configs/role", placeholder: `${t("menus.config.main.sections.role.placeholder", { lang: locale })}`, ...configs.rolePermission ? {  defaultValues: [{ id: configs.rolePermission, type: SelectMenuDefaultValueType.Role }]} : [] }),
        Separator.Hidden,
    );
    
    return ({
        flags: ["Ephemeral", "IsComponentsV2"],
        components: [container]
    } satisfies InteractionReplyOptions) as R;
}