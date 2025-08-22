import configService from "./services/config.js";
import TicketService from "./services/ticket.js";

const db = { 
  configs: configService,
  tickets: TicketService
};

export default db;