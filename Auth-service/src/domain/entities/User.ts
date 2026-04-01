export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface UserProps {
    id: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private _id: string;
    private _email: string;
    private _password: string;
    private _name: string;
    private _role: Role;
    private _isActive: boolean;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: UserProps) {
        this._id = props.id;
        this._email = props.email;
        this._password = props.password;
        this._name = props.name;
        this._role = props.role;
        this._isActive = props.isActive;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {
      if (!this._id || this._id.trim().length === 0) {
            throw new Error("User ID is required.");
        }
      if (!this._email || !this.isValidEmail(this._email)) {
        throw new Error('Valid email is required');
      }

      if (!this._password || this._password.trim().length === 0) {
        throw new Error('Password hash is required');
      }

      if (!this._name || this._name.trim().length < 2) {
        throw new Error('Name must have at least 2 characters');
      }
    }

    private isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    public equals(other: User): boolean {
      if (!(other instanceof User)) {
        return false;
      }
      return this._id === other._id;
    }

    public isUserActive(): boolean {
      return this._isActive;
    }

     public isAdmin(): boolean {
      return this._role === Role.ADMIN;
    }

    public activate(): void {
      this._isActive = true;
      this._updatedAt = new Date();
    }

    public deactivate(): void {
      this._isActive = false;
      this._updatedAt = new Date();
    }

    public updateName(name: string): void {
      if (!name || name.trim().length < 2) {
        throw new Error('Name must have at least 2 characters');
      }
      this._name = name;
      this._updatedAt = new Date();
    }

    public updatePassword(passwordHash: string): void {
      if (!passwordHash || passwordHash.trim().length === 0) {
        throw new Error('Password hash is required');
      }
      this._password = passwordHash;
      this._updatedAt = new Date();
    }

    public promoteToAdmin(): void {
      this._role = Role.ADMIN;
      this._updatedAt = new Date();
    }

    public demoteToUser(): void {
      this._role = Role.USER;
      this._updatedAt = new Date();
    }

    public get id(): string {
      return this._id;
    }

    public get email(): string {
      return this._email;
    }

    public get password(): string {
      return this._password;
    }

    public get name(): string {
      return this._name;
    }

    public get role(): Role {
      return this._role;
    }

    public get isActive(): boolean {
      return this._isActive;
    }

    public get createdAt(): Date {
      return this._createdAt;
    }

    public get updatedAt(): Date {
      return this._updatedAt;
    }

    public toObject(): UserProps {
      return {
        id: this._id,
        email: this._email,
        password: this._password,
        name: this._name,
        role: this._role,
        isActive: this._isActive,
        createdAt: this._createdAt,
        updatedAt: this._updatedAt,
      };
    }
}