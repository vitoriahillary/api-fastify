import { Course, Prisma } from "@prisma/client";

export interface CourseRepository {
    create(data: Prisma.CourseCreateInput): Promise<Course>
    getCourseById(id: string): Promise<Course | null>
    getAllCourses(): Promise<Course[] | null>
    editCourse(id: string, name: string, description: string, image: string, price: number): Promise<Course | null>
    deleteCourse(id: string): Promise<Course | null>
}