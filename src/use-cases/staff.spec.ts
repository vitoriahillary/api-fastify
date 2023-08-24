import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryStaffRepository } from "../repositories/in-memory/in-memory-staff-repository"
import { StaffClass } from "./staff"
import { AppError } from "../errors/AppError"
import { compare } from "bcrypt"

let staffRepository: InMemoryStaffRepository
let staffUseCase: StaffClass

describe('Should test staff components', () => {
    beforeEach(() => {
        staffRepository = new InMemoryStaffRepository
        staffUseCase = new StaffClass(staffRepository)
    })

    it('should create a staff', async () => {
        const { staff } = await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        expect(staff.id).toEqual(expect.any(String))
    })

    it('should check if the cpf has been created', async () => {
        await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        await expect(() => staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email2@gmail.com',
            username: 'username2',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should check if the email has been created', async () => {
        await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        await expect(() => staffUseCase.executeCreateStaff({
            cpf: '12345678901',
            email: 'email@gmail.com',
            username: 'username2',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should check if the username has been created', async () => {
        await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        await expect(() => staffUseCase.executeCreateStaff({
            cpf: '12345678901',
            email: 'email2@gmail.com',
            username: 'username',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should check if the password is been hashed', async () => {
        const { staff } = await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        const isPasswordCorrect = await compare('1234567', staff.password)

        expect(isPasswordCorrect).toBe(true)
    })

    it('should get a staff by id', async () => {
        const { staff } = await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        const staffObj = await staffUseCase.executeGetStaffById(staff.id)

        expect(staffObj.staff.id).toEqual(expect.any(String))
    })

    it('should not get a staff by id', async () => {
        const { staff } = await staffUseCase.executeGetStaffById('not-valid-id')

        expect(staff).toBe(null)
    })

    it('should get all staffs', async () => {
        const getStaff = await staffUseCase.executeGetAllStaff()

        expect(getStaff).toEqual([
            {id: 'staff01', cpf: '12345678899', email: 'staff1@gmail.com', username: 'staff', password: '1234567', status: 1},
            {id: 'staff02', cpf: '12345678900', email: 'staff2@gmail.com', username: 'staff2', password: '12345677', status: 1}
        ])
    })

    it('should edit a staff', async () => {
        const { staff } = await staffUseCase.executeCreateStaff({
            cpf: '12345678900',
            email: 'email@gmail.com',
            username: 'username',
            password: '1234567'
        })

        const edit = await staffUseCase.executeEditStaff({
            id: staff.id,
            email: 'edit@gmail.com',
            username: 'edit',
        })
        
        let password = edit?.staff.password
        let cpf = edit?.staff.cpf
        
        expect(edit).toEqual({staff: {id: 'Staff-1', cpf: cpf, email: 'edit@gmail.com', username: 'edit', password: password, status: 1}})
    })
})