import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCourseRepository } from '../repositories/in-memory/in-memory-course-repository'
import { CourseClass } from './course'

let courseRepository: InMemoryCourseRepository
let courseUseCase: CourseClass

describe('Should test course components', () => {
    beforeEach(() => {
        courseRepository = new InMemoryCourseRepository
        courseUseCase = new CourseClass(courseRepository)
    })
    it('should create a course', async () => {
        const { course } = await courseUseCase.executeCreateCourse({
            name: 'nome course',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        expect(course.id).toEqual(expect.any(String))
    })

    it('should get a course by id', async () => {
        const { course } = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const getCourse = await courseUseCase.executeGetCourseById(course.id)

        expect(getCourse.course.id).toEqual(expect.any(String))
    })

    it('should not get a course by id', async () => {
        const { course } = await courseUseCase.executeGetCourseById('not-valid-id')

        expect(course).toBe(null)
    })

    it('should get all couses', async () => {
        const getCourse = await courseUseCase.executeGetAllCourses()

        expect(getCourse).toEqual([
            {id: 'curso01', name: 'curso1', description: 'description', rating: 0, image: 'image1', price: 123, status: 1},
            {id: 'curso02', name: 'curso2', description: 'description2', rating: 0, image: 'image2', price: 123, status: 1}
        ])
    })

    it('should edit a staff', async () => {
        const { course } = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const edit = await courseUseCase.executeEditCourse({
            id: course.id,
            name: 'edit curso',
            description: 'descrição edit',
            image: 'abcedit',
            price: 109.99
        })
        
        expect(edit).toEqual({course: {id: 'Course-1', name: 'edit curso', description: 'descrição edit', rating: 0, image: 'abcedit', price: 109.99, status: 1}})
    })
})