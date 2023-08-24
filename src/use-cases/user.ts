import { hash } from "bcrypt"
import { AppError } from "../errors/AppError"
import { User } from "@prisma/client"

interface CreateUserRequest {
    email: string,
    username: string,
    password: string
}

interface EditUserRequest {
    id: string
    email: string,
    username: string,
}

interface UserResponse {
    user: User
}

export class UserClass {
    constructor(private userRepository: any) { }

    async executeCreateUser({ email, username, password }: CreateUserRequest): Promise<UserResponse> {

        const userWithSameEmail = await this.userRepository.getUserByEmail(email)
        const userWithSameUsername = await this.userRepository.getUserByUsername(username)

        if (userWithSameEmail || userWithSameUsername) {
            throw new AppError('User already exists.')
        }

        const hashPassword = await hash(password, 4)

        const userCreated = await this.userRepository.create({ email, username, password: hashPassword })
        return { user: userCreated }
    }

    async executeGetUserById(id: string): Promise<UserResponse> {
        const userGet = await this.userRepository.getUserById(id)

        return { user: userGet }
    }

    async executeGetAllUsers(): Promise<User[] | null> {
        const users = await this.userRepository.getAllUsers()
        return users
    }


    async executeEditUser({id, email, username}: EditUserRequest): Promise<UserResponse | null> {
        const userExist = await this.userRepository.getUserById(id)

        if (!userExist) {
            throw new AppError('User not found')
        }

        const userEmail = await this.userRepository.getUserByEmail(email)

        if (userEmail) {
            if (!(userEmail.id === id)) {
                throw new AppError('Email already exists')
            }
        }

        const user = await this.userRepository.editUser(id, email, username)

        if (!user) return null

        return { user }
    }

    async executeDeleteUser(id: string): Promise<User> {
        const userId = await this.userRepository.getUserById(id)

        if (!userId) {
            throw new AppError('User dont exist')
        }

        if (userId.status === 0) {
            throw new AppError('User already deleted')
        }

        const user = await this.userRepository.deleteUser(id)

        return user
    }

}