import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service'
import { Store } from '../../models/store';

//pages
import { LoginPage } from '../login/login'

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

  private store: Store;
  private errorMessage: string;
  private message: string;
  private token: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform, public apiServiceProvider: ApiServiceProvider) {
    platform.ready().then(() => {
      //   // Okay, so the platform is ready and our plugins are available.
      //   // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          this.token = user['access_token'];
        },
        () => this.navCtrl.push(LoginPage)
      );
      this.nativeStorage.getItem('store').then(
        (data) => {
          let store = JSON.parse(data);
          this.getStoreInfo(store);
        },
        () => this.navCtrl.push(LoginPage)
      );
    });
  }

  getStoreInfo(data: any) {
    console.log(data);
    this.store = new Store(data.Id, data.IsValidateStore, data.StoreName, data.FirstNameDir, data.LastNameDir,
              data.IdCategorieStore, data.Address, data.Zip, data.City, data.Email, data.Phone);
  }
}
