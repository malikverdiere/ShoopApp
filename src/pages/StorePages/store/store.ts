import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {ApiServiceProvider} from '../../providers/api-service/api-service'
import {Store} from '../../models/store';

//pages
import {LoginPage} from '../login/login'

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  private store:Store;
  private errorMessage:string;
  private message:string;
  private token:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform,public  apiServiceProvider:ApiServiceProvider) {
     platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) =>{
          let user =  JSON.parse(data);
          this.token = user['access_token'];
          this.nativeStorage.getItem('store').then(
            (data)
          )
        },
        () => this.navCtrl.push(LoginPage)
      );
    });
  }

  getStoreInfo(){
      if(this.token){
          this.message = this.token;
          this.apiServiceProvider.getStoreForCurrentUser(this.token).subscribe(
            data =>{  
              this.store = new Store(data[0]['Id'], data[0]['IsValidateStore'], data[0]['StoreName'], data[0]['FirstNameDir'], data[0]['LastNameDir'],
              data[0]['IdCategorieStore'], data[0]['Address'], data[0]['Zip'], data[0]['City'], data[0]['Email'], data[0]['Phone']);
              this.message = this.store.email;      
            }, 
            error =>{
              this.errorMessage = error.error['Message'];
            }
          );
        }else{
          this.errorMessage = "Une erreur c'est produite ";
        }
  }


}
