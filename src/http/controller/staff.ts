import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { AppError } from "../../errors/AppError"
import { makeStaffUseCase } from "../../use-cases/factory/make-staff-use-case"

export const createStaffController = async (request: FastifyRequest, reply: FastifyReply) => {

    const staffSchema = z.object({
        cpf: z.string().length(11),
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(6)
    })

    const { cpf, email, username, password } = staffSchema.parse(request.body)

    const createStaff = makeStaffUseCase()

    try {
        await createStaff.executeCreateStaff({ cpf, email, username, password })
    } catch (e) {
        throw new AppError(`${e}`, 409)
    }
    return reply.status(201).send('created')
}

export const getStaffByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const userSchema = z.object({
        id: z.string()
    })

    const { id } = userSchema.parse(req.params)

    const getStaffById = makeStaffUseCase()

    let staff
    try {
        staff = await getStaffById.executeGetStaffById(id)
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }
    return rep.status(200).send(staff)
}

export const getAllStaffsController = async (req: FastifyRequest, rep: FastifyReply) => {
    const getAllStaffs = makeStaffUseCase()

    let staffs
    try {
        staffs = await getAllStaffs.executeGetAllStaff()
    } catch (e) {
        throw new AppError(`${e}`, 409)
    }

    return rep.status(200).send(staffs)
}

export const editStaffController = async (req: FastifyRequest, rep: FastifyReply) => {
    const staffSchema = z.object({
        email: z.string().email(),
        username: z.string()
    })

    const idSchema = z.object({
        id: z.string()
    })

    const { email, username } = staffSchema.parse(req.body)
    const { id } = idSchema.parse(req.params)

    const editStaff = makeStaffUseCase()

    let staff

    try {
        staff = await editStaff.executeEditStaff({ id, email, username })
    } catch (e) {
        throw new AppError(`${e}`, 400)
    }

    return rep.status(200).send(staff)
}

export const deleteStaffController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(req.params)

    const deleteStaff = makeStaffUseCase()

    let staff
    try {
        staff = await deleteStaff.executeDeleteStaff(id)
    } catch (e) {
        throw new AppError('Something went wront', 400)
    }

    return rep.status(200).send({ staff, message: "deleted" })
}