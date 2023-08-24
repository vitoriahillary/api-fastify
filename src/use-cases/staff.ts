import { Staff } from "@prisma/client"
import { AppError } from "../errors/AppError"
import { hash } from "bcrypt"

interface CreateStaffRequest {
    cpf: string,
    email: string,
    username: string,
    password: string
}

interface EditStaffRequest {
    id: string,
    email: string,
    username: string,
}

interface StaffResponse {
    staff: Staff
}

export class StaffClass {
    constructor(private staffRepository: any) { }
    
    async executeCreateStaff({ cpf, email, username, password }: CreateStaffRequest): Promise<StaffResponse> {

        const staffWithSameEmail = await this.staffRepository.getStaffByEmail(email)
        const staffWithSameUsername = await this.staffRepository.getStaffByUsername(username)
        const staffWithSameCpf = await this.staffRepository.getStaffByCpf(cpf)

        if (staffWithSameEmail || staffWithSameUsername || staffWithSameCpf) {
            throw new AppError('User already exists.')
        }

        const hashPassword = await hash(password, 4)
        
        const staff: Staff = await this.staffRepository.create({ cpf, email, username, password: hashPassword })
        return { staff }
    }

    async executeGetStaffById(id: string): Promise<StaffResponse> {
        const staff = await this.staffRepository.getStaffById(id)

        return { staff }
    }

    async executeGetAllStaff(): Promise<Staff[]> {
        console.log('aa')
        const staffs = await this.staffRepository.getAllStaffs()
        return staffs
    }

    async executeEditStaff({id, email, username}: EditStaffRequest): Promise<StaffResponse | null> {
        const staffExist = await this.staffRepository.getStaffById(id)

        if (!staffExist) {
            throw new AppError('Staff not found')
        }

        const staffEmail = await this.staffRepository.getStaffByEmail(email)

        if (staffEmail) {
            if (!(staffEmail.id === id)) {
                throw new AppError('Email already exists')
            }
        }

        const staff = await this.staffRepository.editStaff(id, email, username)

        if (!staff) return null

        return { staff }
    }

    async executeDeleteStaff(id: string): Promise<Staff> {
        const staffId: Staff = await this.staffRepository.getStaffById(id)
        
        if (!staffId) {
            throw new AppError('staff dont exist', 404)
        }

        if (staffId.status === 0) {
            throw new AppError('staff already deleted', 400)
        }

        const staff: Staff = await this.staffRepository.deleteStaff(id)

        return staff
    }
}