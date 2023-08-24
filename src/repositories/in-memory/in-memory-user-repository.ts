import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
    public items: User[] = []
    public useritems: User[] = [
        {id: 'user01', email: 'user1@gmail.com', username: 'user', password: '1234567', status: 1},
        {id: 'user02', email: 'user2@gmail.com', username: 'user2', password: '12345677', status: 1}
    ]

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = this.items.find(item => item.username === username)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: `${this.items.length}`,
            username: data.username,
            email: data.email,
            password: data.password,
            status: 1
        }

        this.items.push(user)

        return user
    }

    async getUserById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async getAllUsers(): Promise<User[] | null> {
        const user = this.useritems
        
        return user
    }

    async editUser(id: string, email: string, username: string): Promise<User | null> {
        const user = this.items.find((user) => user.id === id)
        const indexUser = this.items.findIndex((user) => user.id === id)

        if(!user){
            return null
        }

        const newUser = {
            ...user,
            email,
            username
        }

        const userArray = this.items[indexUser] = newUser

        return userArray
    }

    async deleteUser(id: string): Promise<User> {
        const users = this.items

        const indexUser = this.items.findIndex((user) => user.id === id)

        let user = users[indexUser]

        user = {
            ...user,
            status: 0
        }

        this.items[indexUser] = user

        return this.items[indexUser]
    }
}