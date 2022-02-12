export default class Employee {
    private _id: number;
    private _companyId: number;
    private _firstName: string;
    private _lastName: string;

    constructor() {
        this._id = 0;
        this._companyId = 0;
        this._firstName = '';
        this._lastName = '';
    }

    get id(): number {
        return this._id;
    }

    get companyId(): number {
        return this._companyId
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }
}