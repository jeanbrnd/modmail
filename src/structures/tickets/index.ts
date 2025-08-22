import ticketCreateStructure from "./create.js";
import ticketExistStructure from "./exist.js";
import ticketGuildChannelStructure from "./guild.js";

const ticketStructures = {
  create: ticketCreateStructure,
  exist: ticketExistStructure,
  guildChannel: ticketGuildChannelStructure
};

export default ticketStructures;