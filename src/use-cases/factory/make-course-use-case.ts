import { PrismaCourseRepository } from "../../repositories/prisma/prisma-course-repository"
import { CourseClass } from "../course"

export function makeCourseUseCase() {
    const courseRepository = new PrismaCourseRepository
    const createCourse = new CourseClass(courseRepository)

    return createCourse
}