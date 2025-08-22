import { Prisma, Ticket } from "@prisma/client";
import prisma from "../prisma.js";

class TicketService { 
   public async getByUser(userId: string): Promise<Ticket | null> {
       return await prisma.ticket.findUnique({ where: { userId }});
   };

   public async getByChannel(channelId: string): Promise<Ticket | null> {
       return await prisma.ticket.findUnique({ where:{ channelId }});
   }
   
   public async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
      return await prisma.ticket.create({ data });
   }

   public async delete(id: string): Promise<Ticket> {
       return await prisma.ticket.delete({ where: { id }});
   };
};

export default new TicketService();