import { Module, Prisma } from "@prisma/client";
export interface ModuleRepository {
    createModule(data: Prisma.ModuleUncheckedCreateInput): Promise<Module>
    getModuleById(id: string): Promise<Module | null>
    editModule(id: string, name: string, description: string): Promise<Module | null>
    deleteModule(id_course: string): Promise<boolean>
}