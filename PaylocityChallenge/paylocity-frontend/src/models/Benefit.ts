export default class Benefit {
    private _id: number;
    private _costPerEmployeePerYear: number;
    private _costPerDependentPerYear: number;

    constructor() {
        this._id = 0;
        this._costPerEmployeePerYear = 0;
        this._costPerDependentPerYear = 0;
    }

    get id(): number {
        return this._id;
    }

    get costPerEmployeePerYear(): number {
        return this._costPerEmployeePerYear;
    }

    get costPerDependentPerYear(): number {
        return this._costPerDependentPerYear;
    }
}