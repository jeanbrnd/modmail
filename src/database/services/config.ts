import { Config } from "@prisma/client";
import prisma from "../prisma.js";

class configService { 
    public async get(): Promise<Config> {
        return await prisma.config.findFirst() ?? await prisma.config.create({ });
    };
    
    public async update(data: Partial<Omit<Config, "id">>): Promise<Config> {
        return await prisma.config.update({ where: { id: "default" }, data });
    };
};

export default new configService();