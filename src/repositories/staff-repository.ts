import { Staff, Prisma } from "@prisma/client";

export interface StaffRepository {
    create(data: Prisma.StaffCreateInput): Promise<Staff>
    getStaffByCpf(cpf: string): Promise<Staff | null>
    getStaffByEmail(email: string): Promise<Staff | null>
    getStaffByUsername(username: string): Promise<Staff | null>
    getStaffById(id: string): Promise<Staff | null>
    getAllStaffs(): Promise<Staff[] | null>
    editStaff(id: string, email: string, username: string): Promise<Staff | null>
    deleteStaff(id: string): Promise<Staff>
}