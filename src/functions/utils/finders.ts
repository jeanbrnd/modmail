import { Channel, Client, Guild, GuildMember, Role, User } from "discord.js";

export async function findChannelById(guild: Guild, id: string): Promise<Channel | null> {
   return await guild.channels.fetch(id).catch(() => null);
}

export async function findGuild(client: Guild["client"], id: string): Promise<Guild | null> {
  return await client.guilds.fetch(id).catch(() => null);
};

export async function findMemberById(guild: Guild, memberId: string): Promise<GuildMember | null> {
  return await guild.members.fetch(memberId).catch(() => null);
};

export async function findRoleById(guild: Guild, roleId: string): Promise<Role | null> {
  return await guild.roles.fetch(roleId).catch(() => null);
};

export async function findUser(client: Client, userId: string): Promise<User | null> {
  return await client.users.fetch(userId).catch(() => null);
};