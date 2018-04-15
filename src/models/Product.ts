export class Product
{
    public id:number;
    public hasPaie:boolean;
    constructor(public tittle:string = "", public description:string = "", public idCategory:number = null, public price:number = null, public quantity:number = null,
    public urlPicture1:string = "", public urlPicture2:string = "", public urlPicture3:string = ""){

    }
}