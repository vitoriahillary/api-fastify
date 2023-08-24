import { Prisma, Staff } from "@prisma/client"
import prisma from "../../lib/prisma"
import { StaffRepository } from "../staff-repository"

export class PrismaStaffRepository implements StaffRepository {
    async create(data: Prisma.StaffCreateInput) {
        const staff = await prisma.staff.create({
            data
        })
        return staff
    }

    async getStaffByCpf(cpf: string) {
        const staff = await prisma.staff.findUnique({
            where: {
                cpf
            }
        })
        return staff
    }

    async getStaffByEmail(email: string) {
        const staff = await prisma.staff.findUnique({
            where: {
                email
            }
        })
        return staff
    }

    async getStaffByUsername(username: string) {
        const staff = await prisma.staff.findUnique({
            where: {
                username
            }
        })
        return staff
    }

    async getStaffById(id: string) {
        const staff = await prisma.staff.findUnique({
            where: {
                id
            }
        })
        return staff
    }

    async getAllStaffs() {
        const staffs = await prisma.staff.findMany()

        return staffs
    }

    async editStaff(id: string, email: string, username: string){
        const staff = await prisma.staff.update({
            where: {
                id
            },
            data: {
                email,
                username
            }
        })

        return staff
    }

    async deleteStaff(id: string): Promise<Staff> {
        const staff = await prisma.staff.update({
            where: {
                id
            },
            data: {
                status: 0
            }
        })

        return staff
    }
}