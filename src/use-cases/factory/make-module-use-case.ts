import { PrismaCourseRepository } from "../../repositories/prisma/prisma-course-repository"
import { PrismaModuleRepository } from "../../repositories/prisma/prisma-module-repository"
import { ModuleClass } from "../module"

export function makeModuleUseCase() {
    const moduleRepository = new PrismaModuleRepository
    const courseRepository = new PrismaCourseRepository
    const moduleUseCase = new ModuleClass(moduleRepository, courseRepository)

    return moduleUseCase

}