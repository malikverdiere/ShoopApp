import { Injectable } from '@angular/core';
@Injectable()
export class UtilsListForms{

    ListPriceTryFree = [
        {price: 0.01, text:'1 jour (essai gratuit)'},
        {price: 0.03, text:'3 jours (essai gratuit)'},
        {price: 0.07, text:'7 jours (essai gratuit)'},
        {price: 0.15, text:'15 jours (essai gratuit)'},
        {price: 0.30, text:'30 jours (essai gratuit)'},
        {price: 0.60, text:'60 jours (essai gratuit)'},
    ];
    ListPrice = [
        {price: 5.99 , text:'1 jour (5,99€ ht)'},
        {price: 12.99, text:'3 jours (12,99€ ht)'},
        {price: 19.99, text:'7 jours (19,99€ ht)'},
        {price: 29.99, text:'15 jours (29,99€ ht)'},
        {price: 49.99, text:'30 jours (49,99€ ht)'},
        {price: 79.99, text:'60 jours (essai gratuit)'},
    ];
}