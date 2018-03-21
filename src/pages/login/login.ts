import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,) {
    this.userForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onConect(){
    // this.nativeStorage.setItem('user', this.userForm.value.email).then(
    //   () =>{
    //     console.log('Stored item!');
    //   } ,
    //   error => console.error('Error storing item', error)
    // );
    this.navCtrl.push(TabsPage);
    
  }



}
