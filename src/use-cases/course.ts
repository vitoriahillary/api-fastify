import { Course, Prisma } from "@prisma/client"
import { AppError } from "../errors/AppError"

interface CreateCourseRequest {
    name: string,
    description: string,
    image: string,
    price: number
}

interface EditCourseRequest {
    id: string,
    name: string,
    description: string,
    image: string,
    price: number
}

interface CourseResponse {
    course: Course
}

export class CourseClass {
    constructor(private courseRepository: any) { }
    
    async executeCreateCourse({ name, description, image, price }: CreateCourseRequest): Promise<CourseResponse> {
        const course: Course = await this.courseRepository.create({ name, description, image, price })
        return { course }
    }

    async executeGetCourseById(id: string): Promise<CourseResponse> {
        const course: Course = await this.courseRepository.getCourseById(id)
        return { course }
    }

    async executeGetAllCourses(): Promise<Course[]> {
        const courses: Course[] = await this.courseRepository.getAllCourses()

        return courses
    }

    async executeEditCourse({id, name, description, image, price}: EditCourseRequest): Promise<CourseResponse | null> {
        const courseExist = await this.courseRepository.getCourseById(id)

        if (!courseExist) {
            throw new AppError('Course not found')
        }

        const course = await this.courseRepository.editCourse(id, name, description, image, price)

        if (!course) return null

        return { course }

    }

    async executeDeleteCourse(id: string): Promise<Course> {
        const courseId: Course = await this.courseRepository.getCourseById(id)
        
        if (!courseId) {
            throw new AppError('course dont exist', 404)
        }

        if (courseId.status === 0) {
            throw new AppError('course already deleted', 400)
        }

        const course: Course = await this.courseRepository.deleteCourse(id)

        return course
    }

}

