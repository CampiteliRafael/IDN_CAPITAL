export interface PortfolioProps {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Portfolio {
    private _id: string;
    private _userId: string;
    private _name: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: PortfolioProps) {
        this._id = props.id;
        this._userId = props.userId;
        this._name = props.name;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {
        if (!this._id || this._id.trim().length === 0) {
            throw new Error('Portfolio ID is required.');
        }
        if (!this._userId || this._userId.trim().length === 0) {
            throw new Error('User ID is required.');
        }
        if (!this._name || this._name.trim().length < 2) {
            throw new Error('Portfolio name must have at least 2 characters');
        }
    }

    get id(): string {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get name(): string {
        return this._name;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    public rename(newName: string) {
        if (!newName || newName.trim().length < 2) {
            throw new Error('Portfolio name must have at least 2 characters');
        }
        this._name = newName;
        this._updatedAt = new Date();
    }

    public toObject(): PortfolioProps {
        return {
            id: this._id,
            userId: this._userId,
            name: this._name,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }

}