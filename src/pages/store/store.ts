import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {ApiServiceProvider} from '../../providers/api-service/api-service'
import {Store} from '../../models/store';

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform,public  apiServiceProvider:ApiServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        () =>this.getStoreInfo(),
        () => console.log('noValabe')
      );
    });
  }

  getStoreInfo(){
    this.nativeStorage.getItem('user').then(
      (data) =>{
        let user =  JSON.parse(data);
        let token = user['access_token'];
        if(token){
          this.apiServiceProvider.getStoreForCurrentUser(token).subscribe(
            data =>{
              this.message = data;
              this.store = new Store(data['id'], data['isValidateStore'], data['storeName'], data['firstNameDir'], data['lastNameDir'],  data['idCategorieStore'], data['address'], 
              data['zip'], data['city'], data['email'], data['zip'])
            }, 
            error =>{
              this.errorMessage = error.error;
            }
          );
        }else{
          this.errorMessage = "Une erreur c'est produite ";
        }
    
      },
      () => console.log('noValabe')
    );
  }


}
