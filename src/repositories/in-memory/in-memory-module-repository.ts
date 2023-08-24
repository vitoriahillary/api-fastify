// import { Module, Prisma } from "@prisma/client"
// import { ModuleRepository } from "../module-repository"

// export class InMemoryModuleRepository implements ModuleRepository {
//     public items: Module[] = []
//     public moduleitems: Module[] = [
//         { id: 'module01', name: 'curso1', description: 'description', createdAt: new Date(), id_course: 'Course-1', status: 1 },
//         { id: 'module02', name: 'module2', description: 'description2', createdAt: new Date(), id_course: 'Course-1', status: 1 }
//     ]


//     async createModule(data: Prisma.ModuleUncheckedCreateInput): Promise<Module> {
//         const module = {
//             id: 'Module-1',
//             name: data.name,
//             description: data.description,
//             createdAt: new Date(),
//             id_course: 'Course-1',
//             status: 1
//         }

//         this.items.push(module)

//         return module
//     }

//     async getModuleById(id: string): Promise<Module | null> {
//         const module = this.items.find(module => module.id === id)

//         if (!module) {
//             return null
//         }

//         return module
//     }

//     // async getAllCourses(): Promise<Course[] | null> {
//     //     const course = this.courseitems

//     //     return course
//     // }

//     async editModule(id: string, name: string, description: string): Promise<Module | null> {
//         const module = this.items.find((module) => module.id === id)
//         const indexModule = this.items.findIndex((module) => module.id === id)

//         if(!module){
//             return null
//         }

//         const newModule = {
//             ...module,
//             name,
//             description,
//         }

//         const moduleArray = this.items[indexModule] = newModule

//         return moduleArray
//     }

//     async deleteModule(id: string): Promise<boolean> {
//         const modules = this.items

//         const indexModule = this.items.findIndex((module) => module.id === id)

//         let module = modules[indexModule]

//         module = {
//             ...module,
//             status: 0
//         }

//         this.items[indexModule] = module

//         return this.items[indexModule]
//     }
// }