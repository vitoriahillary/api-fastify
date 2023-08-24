import { Prisma, Staff } from "@prisma/client"
import { StaffRepository } from "../staff-repository"

export class InMemoryStaffRepository implements StaffRepository {
    public items: Staff[] = []
    public staffitems: Staff[] = [
        {id: 'staff01', cpf: '12345678899', email: 'staff1@gmail.com', username: 'staff', password: '1234567', status: 1},
        {id: 'staff02', cpf: '12345678900', email: 'staff2@gmail.com', username: 'staff2', password: '12345677', status: 1}
    ]

    async create(data: Prisma.StaffCreateInput): Promise<Staff> {
        const staff = {
            id: 'Staff-1',
            cpf: data.cpf,
            email: data.email,
            username: data.username,
            password: data.password,
            status: 1
        }

        this.items.push(staff)

        return staff
    }

    async getStaffByCpf(cpf: string): Promise<Staff | null> {
        const staff = this.items.find(item => item.cpf === cpf)

        if (!staff) {
            return null
        }

        return staff
    }

    async getStaffByEmail(email: string): Promise<Staff | null> {
        const staff = this.items.find(item => item.email === email)

        if (!staff) {
            return null
        }

        return staff
    }

    async getStaffByUsername(username: string): Promise<Staff | null> {
        const staff = this.items.find(item => item.username === username)

        if (!staff) {
            return null
        }

        return staff
    }

    async getStaffById(id: string): Promise<Staff | null> {
        const staff = this.items.find(items => items.id === id)

        if (!staff) {
            return null
        }

        return staff
    }

    async getAllStaffs(): Promise<Staff[] | null> {
        const staff = this.staffitems

        return staff
    }

    async editStaff(id: string, email: string, username: string): Promise<Staff | null> {
        const staff = this.items.find((staff) => staff.id === id)
        const indexStaff = this.items.findIndex((staff) => staff.id === id)

        if(!staff){
            return null
        }

        const newStaff = {
            ...staff,
            email,
            username
        }

        const staffArray = this.items[indexStaff] = newStaff

        return staffArray
    }

    async deleteStaff(id: string): Promise<Staff> {
        const staffs = this.items

        const indexStaff = this.items.findIndex((staff) => staff.id === id)

        let staff = staffs[indexStaff]

        staff = {
            ...staff,
            status: 0
        }

        this.items[indexStaff] = staff

        return this.items[indexStaff]
    }
}