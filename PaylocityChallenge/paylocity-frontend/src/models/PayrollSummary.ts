export default class PayrollSummary {
    private _totalEmployees: number;
    private _totalPayrollGross: number;
    private _totalBenefitsCost: number;
    private _totalPayrollWithBenefits: number;

    constructor() {
        this._totalEmployees = 0;
        this._totalPayrollGross = 0;
        this._totalBenefitsCost = 0;
        this._totalPayrollWithBenefits = 0;
    }

    get totalEmployees(): number {
        return this._totalEmployees;
    }

    get totalPayrollGross(): number {
        return this._totalPayrollGross;
    }

    get totalBenefitsCost(): number {
        return this._totalBenefitsCost;
    }

    get totalPayrollWithBenefits(): number {
        return this._totalPayrollWithBenefits;
    }
}