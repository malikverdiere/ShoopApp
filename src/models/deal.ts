import { DateTime } from "ionic-angular/components/datetime/datetime";

export class Deal{
    public id:number;
    constructor(public title:string = "", public description:string = "",public condition:string = "", public dateStart:DateTime = null,
     public dateFinish:DateTime = null ){

    }
}