export class Company {   
    private _id: number; 
    private _companyName: string;
    private _companyDescription: string;

    constructor(){
        this._id = 0;
        this._companyName = '';
        this._companyDescription = '';
    }

    get id(): number {
        return this._id;
    }

    get companyName(): string {
        return this._companyName;
    }

    get companyDescription(): string {
        return this._companyDescription;
    }
}