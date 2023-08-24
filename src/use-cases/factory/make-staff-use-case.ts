import { PrismaStaffRepository } from "../../repositories/prisma/prisma-staff-repository"
import { StaffClass } from "../staff"

export function makeStaffUseCase(){
    const staffRepository = new PrismaStaffRepository
    const createStaff = new StaffClass(staffRepository)
    
    return createStaff
}