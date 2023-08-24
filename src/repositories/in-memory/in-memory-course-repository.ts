import { Course, Prisma, } from "@prisma/client";
import { CourseRepository } from "../course-repository";

export class InMemoryCourseRepository implements CourseRepository {
    public items: Course[] = []
    public courseitems: Course[] = [
        { id: 'curso01', name: 'curso1', description: 'description', rating: 0, image: 'image1', price: 123, status: 1 },
        { id: 'curso02', name: 'curso2', description: 'description2', rating: 0, image: 'image2', price: 123, status: 1 }
    ]


    async create(data: Prisma.CourseCreateInput): Promise<Course> {
        const course = {
            id: 'Course-1',
            name: data.name,
            description: data.description,
            rating: 0,
            image: data.image,
            price: data.price,
            status: 1
        }

        this.items.push(course)

        return course
    }

    async getCourseById(id: string): Promise<Course | null> {
        const course = this.items.find(course => course.id === id)

        if (!course) {
            return null
        }

        return course
    }

    async getAllCourses(): Promise<Course[] | null> {
        const course = this.courseitems

        return course
    }

    async editCourse(id: string, name: string, description: string, image: string, price: number): Promise<Course | null> {
        const course = this.items.find((course) => course.id === id)
        const indexCourse = this.items.findIndex((course) => course.id === id)

        if(!course){
            return null
        }

        const newCourse = {
            ...course,
            name,
            description,
            image,
            price
        }

        const courseArray = this.items[indexCourse] = newCourse

        return courseArray
    }

    async deleteCourse(id: string): Promise<Course | null> {
        const course = this.items.find((course) => course.id === id)

        const indexCourse = this.items.findIndex((course) => course.id === id)

        if (course) {
            return course
        }

        return null
    }
}