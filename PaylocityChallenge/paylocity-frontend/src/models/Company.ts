export default class Company {   
    private _id: number; 
    private _benefitId: number;
    private _payrollId: number;
    private _companyName: string;
    private _companyDescription: string;

    constructor(){
        this._id = 0;
        this._benefitId = 0;
        this._payrollId = 0;
        this._companyName = '';
        this._companyDescription = '';
    }

    get id(): number {
        return this._id;
    }

    get benefitId(): number {
        return this._benefitId;
    }

    get payrollId(): number {
        return this._payrollId;
    }

    get companyName(): string {
        return this._companyName;
    }

    get companyDescription(): string {
        return this._companyDescription;
    }
}