// import { describe, it, beforeEach, expect } from "vitest"
// import { InMemoryModuleRepository } from "../repositories/in-memory/in-memory-module-repository"
// import { ModuleClass } from "./module"

// let moduleRepository: InMemoryModuleRepository
// let moduleUseCase: ModuleClass

// describe('Should test module components', () => {
//     beforeEach(() => {
//         moduleRepository = new InMemoryModuleRepository
//         moduleUseCase = new ModuleClass(moduleRepository)
//     })
//     it('should create a module', async () => {
//         const { module } = await moduleUseCase.executeCreateModule({
//             name: 'nome module',
//             description: 'descrição do curso',
//             id_course: 'Course-1'
//         })

//         expect(module.id).toEqual(expect.any(String))
//     })

//     it('should get a module by id', async () => {
//         const { module } = await moduleUseCase.executeCreateCourse({
//             name: 'nome curso',
//             description: 'descrição do curso',
//             image: 'abc',
//             price: 109.90
//         })

//         const getCourse = await courseUseCase.executeGetCourseById(course.id)

//         expect(getCourse.course.id).toEqual(expect.any(String))
//     })

//     it('should not get a course by id', async () => {
//         const { course } = await courseUseCase.executeGetCourseById('not-valid-id')

//         expect(course).toBe(null)
//     })

//     it('should get all couses', async () => {
//         const getCourse = await courseUseCase.executeGetAllCourses()

//         expect(getCourse).toEqual([
//             {id: 'curso01', name: 'curso1', description: 'description', rating: 0, image: 'image1', price: 123, status: 1},
//             {id: 'curso02', name: 'curso2', description: 'description2', rating: 0, image: 'image2', price: 123, status: 1}
//         ])
//     })

//     it('should edit a staff', async () => {
//         const { course } = await courseUseCase.executeCreateCourse({
//             name: 'nome curso',
//             description: 'descrição do curso',
//             image: 'abc',
//             price: 109.90
//         })

//         const edit = await courseUseCase.executeEditCourse({
//             id: course.id,
//             name: 'edit curso',
//             description: 'descrição edit',
//             image: 'abcedit',
//             price: 109.99
//         })
        
//         expect(edit).toEqual({course: {id: 'Course-1', name: 'edit curso', description: 'descrição edit', rating: 0, image: 'abcedit', price: 109.99, status: 1}})
//     })
// })