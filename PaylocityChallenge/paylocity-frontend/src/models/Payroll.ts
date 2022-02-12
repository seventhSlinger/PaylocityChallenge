export default class Payroll {
    private _id: number;
    private _employeePayPerPeriod: number;
    private _numberOfPayPeriodsPerYear: number;

    constructor() {
        this._id = 0;
        this._employeePayPerPeriod = 0;
        this._numberOfPayPeriodsPerYear = 0;
    }

    get id(): number {
        return this._id;
    }

    get employeePayPerPeriod(): number {
        return this._employeePayPerPeriod;
    }

    get numberOfPayPeriodsPerYear(): number {
        return this._numberOfPayPeriodsPerYear;
    }
}       
