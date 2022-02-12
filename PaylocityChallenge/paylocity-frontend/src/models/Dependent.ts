export default class Dependent {
    private _id: number;
    private _employeeId: number;
    private _firstName: string;
    private _lastName: string;
    private _isSpouse: boolean;

    constructor() {
        this._id = 0;
        this._employeeId = 0;
        this._firstName = '';
        this._lastName = '';
        this._isSpouse = false;
    }

    get id(): number {
        return this._id;
    }

    get employeeId(): number {
        return this._employeeId
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

    get isSpouse():boolean {
        return this._isSpouse;
    }

    set isSpouse(value: boolean) {
        this._isSpouse = value;
    }
}