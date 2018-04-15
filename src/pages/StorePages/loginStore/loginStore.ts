import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

//Providers
import { AuthService } from '../../providers/auth-service/auth-service';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userForm: FormGroup;
  private isRunning: boolean = false;
  private formLoginVisible: boolean = true;
  private errorMessage: string;

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    private _authService: AuthService, public apiService: ApiServiceProvider) {
    
        

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        () => console.log("isValable"),
        () => console.log('noValabe')
      );
    });
    this.userForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onConect() {
    this.navCtrl.push(TabsPage);
    this.formLoginVisible = false;
    this.isRunning = true;
    var user = this._authService.loginUser(this.userForm.value.email, this.userForm.value.password).subscribe(
      data => {
        if (data['access_token']) {
          this.apiService.getStoreForCurrentUser(data['access_token']).subscribe(
            data => {
              if (data[0]['Id']) {
                this.nativeStorage.setItem('store', JSON.stringify(data[0])).then(
                  () => {
                    console.log('Stored id Store!');
                  },
                  error => {
                    console.error('Error storing idstore', error);
                    this.errorMessage = "Une erreur c'est produite";
                  }
                );
              }
              else {
                this.errorMessage = "Vous n'êtes pas titulaire d'un compte Pro, contactez nous pour plus de renseignement";
              }
            },
            error => {
              console.error(error);
              this.errorMessage = "Une error c'est produite";
            }
          )
          this.nativeStorage.setItem('user', JSON.stringify(data)).then(
            () => {
              console.log('Stored item!');
              this.navCtrl.push(TabsPage);
            },
            error => console.error('Error storing item', error)
          );
        } else {
          this.errorMessage = "Une erreur c'est produite";
        }
      },
      error => {
        this.isRunning = false;
        this.formLoginVisible = true;
        console.error(error);
        this.errorMessage = error.error['Message'];
      }
    );

  }

}
