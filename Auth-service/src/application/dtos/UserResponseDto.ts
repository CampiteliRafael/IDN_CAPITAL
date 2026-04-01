import { User, Role } from '../../domain/entities/User';

  export class UserResponseDto {
    id: string;
    email: string;
    name: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: {
      id: string;
      email: string;
      name: string;
      role: Role;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }) {
      this.id = data.id;
      this.email = data.email;
      this.name = data.name;
      this.role = data.role;
      this.isActive = data.isActive;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }

    static fromUser(user: User): UserResponseDto {
      return new UserResponseDto({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }

    toJSON() {
      return {
        id: this.id,
        email: this.email,
        name: this.name,
        role: this.role,
        isActive: this.isActive,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  }