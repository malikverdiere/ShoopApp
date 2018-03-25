import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

//Providers
import{AuthService} from '../../providers/auth-service/auth-service'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userForm : FormGroup;
  private isRunning:boolean = false;
  private formLoginVisible:boolean = true;
  private errorMessage: string;

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, private _authService:AuthService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        () =>console.log("isValable"),
        () => console.log('noValabe')
      );
    });
    this.userForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onConect(){
      this.formLoginVisible = false;
      this.isRunning = true;
      var user = this._authService.loginUser(this.userForm.value.email, this.userForm.value.password).subscribe(
      data => {
        if(data['access_token']){
          this.nativeStorage.setItem('user', JSON.stringify(data)).then(
            () =>{
              console.log('Stored item!');
              this.navCtrl.push(TabsPage);
            } ,
            error => console.error('Error storing item', error)
          );
        }
      },
      error => {
        this.isRunning = false;
        this.formLoginVisible = true;
        console.error(error);
        this.errorMessage = error.error;
      }
      );

  }

}
