import { Channel, Client, Guild, GuildMember, Role, User } from "discord.js";

export async function findChannelById(guild: Guild, id: string): Promise<Channel | null> {
   return guild.channels.cache.get(id) ?? await guild.channels.fetch(id).catch(() => null);
}

export async function findGuild(client: Guild["client"], id: string): Promise<Guild | null> {
  return client.guilds.cache.get(id) ?? await client.guilds.fetch(id).catch(() => null);
};

export async function findMemberById(guild: Guild, memberId: string): Promise<GuildMember | null> {
  return guild.members.cache.get(memberId) ?? await guild.members.fetch(memberId).catch(() => null);
};

export async function findRoleById(guild: Guild, roleId: string): Promise<Role | null> {
  return guild.roles.cache.get(roleId) ?? await guild.roles.fetch(roleId).catch(() => null);
};

export async function findUser(client: Client, userId: string): Promise<User | null> {
  return client.users.cache.get(userId) ?? await client.users.fetch(userId).catch(() => null);
};