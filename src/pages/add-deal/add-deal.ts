import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

//Provider
import { ApiServiceProvider } from '../../providers/api-service/api-service';

//Models
import {Deal} from '../../models/deal'


@IonicPage()
@Component({
  selector: 'page-add-deal',
  templateUrl: 'add-deal.html',
})
export class AddDealPage {
  dealForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService:ApiServiceProvider) {
    this.dealForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      condition: new FormControl('', Validators.required),
      dateStart: new FormControl(DateTime, Validators.required),
      dateEnd: new FormControl(DateTime, Validators.required),
    });
  }

  ionViewDidLoad() {
    
  }

  postDeal(){
    let deal = new Deal(this.dealForm.value.title.value, this.dealForm.value.description.value,this.dealForm.value.condition.value,)
  }
}
