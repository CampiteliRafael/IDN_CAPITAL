import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';

export class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? this.toDomain(user) : null;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? this.toDomain(user) : null;
    }

    async create(user: User): Promise<User> {
        const data = this.toPrisma(user);
        const createdUser = await this.prisma.user.create({ data });
        return this.toDomain(createdUser);
    }

    async update(user: User): Promise<User> {
        const data = this.toPrisma(user);
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data,
        });
        return this.toDomain(updatedUser);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }

    async findMany(skip: number = 0, take: number = 10): Promise<User[]> {
        const users = await this.prisma.user.findMany({ skip, take });
        return users.map(user => this.toDomain(user));
    }

    private toDomain(prismaUser: any): User {
      return new User({
          id: prismaUser.id,
          email: prismaUser.email,
          password: prismaUser.password,
          name: prismaUser.name,
          role: prismaUser.role,
          isActive: prismaUser.isActive,
          createdAt: prismaUser.createdAt,
          updatedAt: prismaUser.updatedAt,
      });
    }

    private toPrisma(user: User) {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}