import { Module, Prisma } from "@prisma/client";
import { ModuleRepository } from "../module-repository";
import prisma from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

export class PrismaModuleRepository implements ModuleRepository {
    async createModule(data: Prisma.ModuleUncheckedCreateInput): Promise<Module> {
        const moduleCreate = await prisma.module.create({
            data
        })

        return moduleCreate
    }

    async getModuleById(id: string): Promise<Module | null> {
        const moduleGet = await prisma.module.findUnique({
            where: {
                id
            }
        })

        if (!moduleGet) return null

        return moduleGet
    }

    async editModule(id: string, name: string, description: string): Promise<Module> {
        const moduleEdited = await prisma.module.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })

        return moduleEdited
    }

    async deleteModule(id_course: string) {
        const deleteModule = await prisma.module.updateMany({
            where: {
                id_course
            },
            data: {
                status: 0
            }
        })

        if(deleteModule){
            return true
        }

        return false
    }
}
