import { Course, Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { CourseRepository } from "../course-repository";

export class PrismaCourseRepository implements CourseRepository {
    async create(data: Prisma.CourseUncheckedCreateInput) {
        const course = await prisma.course.create({
            data
        })
        return course
    }

    async getCourseById(id: string){
        const course = await prisma.course.findUnique({
            where: {
                id
            }
        })
        return course
    }

    async getAllCourses() {
        const course = await prisma.course.findMany({
            include: {
                modules: {
                    // orderBy: {
                    //     createdAt: 'asc'
                    // },
                    // include: {
                        //     tasks: true
                        // }
                    }
                }
            })
            console.log('aa')

        return course
    }

    async editCourse(id: string, name: string, description: string, image: string, price: number){
        const course = await prisma.course.update({
            where: {
                id
            },
            data: {
                name,
                description,
                image,
                price
            }
        })

        return course
    }

    async deleteCourse(id: string): Promise<Course> {
        const course = await prisma.course.update({
            where: {
                id
            },
            data: {
                status: 0
            }
        })

        return course
    }

}