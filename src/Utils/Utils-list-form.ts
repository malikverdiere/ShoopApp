import { Injectable } from '@angular/core';
@Injectable()
export class UtilsListForms{

    ListPriceTryFree = [
        {price: 0, duration: 1, text:'1 jour (essai gratuit)'},
        {price: 0, duration: 3, text:'3 jours (essai gratuit)'},
        {price: 0, duration: 7, text:'7 jours (essai gratuit)'},
        {price: 0, duration: 15, text:'15 jours (essai gratuit)'},
        {price: 0, duration: 30, text:'30 jours (essai gratuit)'},
        {price: 0, duration: 60, text:'60 jours (essai gratuit)'},
    ];
    ListPrice = [
        {price: 5.99,  duration: 1, text:'1 jour (5,99€ ht)'},
        {price: 12.99, duration: 3, text:'3 jours (12,99€ ht)'},
        {price: 19.99, duration: 7, text:'7 jours (19,99€ ht)'},
        {price: 29.99, duration: 15, text:'15 jours (29,99€ ht)'},
        {price: 49.99, duration: 30, text:'30 jours (49,99€ ht)'},
        {price: 79.99, duration: 60, text:'60 jours (essai gratuit)'},
    ];
    ListCategoryProduct = [
        {id: 1,  title:'Mode Femme'},
        {id: 2,  title:'Chaussures femmes'},
        {id: 3,  title:'Sacs femmes'},
        {id: 4,  title:'1 jour (5,99€ ht)'},
        {id: 5,  title:'1 jour (5,99€ ht)'},

    ];
}