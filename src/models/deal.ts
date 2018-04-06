import { DateTime } from "ionic-angular/components/datetime/datetime";

export class Deal{
    public id:number;
    public urlPicture:string;
    constructor(public titleDeal:string = "", public descriptionDeal:string = "",public conditionDeal:string = "", public startDeal:DateTime = null,
     public FinishDeal:DateTime = null, public idStore:number = null){

    }
}