export class Company {    
    private _companyName: string;
    private _companyDescription: string;

    constructor(){
        this._companyName = '';
        this._companyDescription = '';
    }

    get companyName(): string {
        return this._companyName;
    }

    get companyDescription(): string {
        return this._companyDescription;
    }
}