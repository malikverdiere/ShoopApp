import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatePicker } from '@ionic-native/date-picker';

//page
import {LoginPage} from '../login/login'

import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//Provider
import { ApiServiceProvider } from '../../providers/api-service/api-service';

//Models
import { Deal } from '../../models/deal'

//Utils
import {UtilsListForms} from '../../Utils/Utils-list-form';

@IonicPage()
@Component({
  selector: 'page-add-deal',
  templateUrl: 'add-deal.html',
})
export class AddDealPage {

  DateIsoString: string;
  CurrentDate: Date;
  minDateFinishDeal:Date;
  minDateFinishDealIsoString:string;
  listPrice:any = [];
  dealForm: FormGroup;
  errorMessage: string;
  idStore:number;
  pictureURI: any;
  token: string;
  pictureDisplay: string;
  imageTitle: any;
  options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiServiceProvider, private photoLibrary: PhotoLibrary,
    private camera: Camera, private alertCtrl: AlertController, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController,
     platform: Platform, private utilsListForms: UtilsListForms, private datePicker: DatePicker) {

      this.getDate();
      
      platform.ready().then(() => {
      //   // Okay, so the platform is ready and our plugins are available.
      //   // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          this.token = user['access_token'];
        },
         () => console.log("dde")
        //this.navCtrl.push(LoginPage)
      );
      this.nativeStorage.getItem('idStore').then(
        (data) => {
          this.idStore = data
          console.log(data);
        },
        () => console.log('noValabe')
      );
    });
    this.listPrice = this.utilsListForms.ListPriceTryFree;
     
    this.dealForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      condition: new FormControl('', Validators.required),
      dateStart: new FormControl(this.CurrentDate, Validators.required),
      durationDeal: new FormControl(this.listPrice[3])
    });
    console.log(this.dealForm.value.dateStart);
    
    
  }

  addPicture() {
    let alert = this.alertCtrl.create({
      title: 'Choix ce l\'image',
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Choisir une Photo',

          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Prendre une photo',
          handler: () => {
            this.takePic();
          }
        }
      ]
    });
    alert.present();
  }

  takePic() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      allowEdit: true,
      targetWidth: 350,
      targetHeight: 350,
    }).then((imageData) => {
      this.pictureDisplay = 'data:image/jpeg;base64,' + imageData;
      this.pictureURI = imageData;

    },
      (err) => {
        console.log(err);
      });
  }
  openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      allowEdit: true,
      quality: 100,
      targetWidth: 350,
      targetHeight:350,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }).then((imageData) => {
      this.pictureURI = imageData;
      this.pictureDisplay = 'data:image/jpeg;base64,' + imageData;


    },
      (err) => {
        console.log(err);
      });
  }
  deletePicture() {
    this.pictureURI = null;
  }

  getDate(){
    this.CurrentDate = new Date();
    this.CurrentDate.setDate(this.CurrentDate.getDate() + 1);
    this.DateIsoString = this.CurrentDate.toISOString();
  }

  postDeal() {
    console.log(this.dealForm.value.dateStart);
    
    let pictureName = "";
    let loading = this.loadingCtrl.create({
      content: 'Patientez...'
    });


    if (this.dealForm.valid) {
      loading.present();
      let deal = new Deal(this.dealForm.value.title, this.dealForm.value.description, this.dealForm.value.condition,
        this.dealForm.value.dateStart, this.dealForm.value.duration, this.idStore);
      this.apiService.postDeal(deal, this.token).subscribe(
        data => {
          console.log(data);
          deal.id = data['Id'];
          pictureName = "picture_Deal_" + data['Id'] + "_" + data['NumberOfChanges'] + ".jpeg";
          this.apiService.doImageUpload(this.pictureURI, pictureName).then((data) => {
            console.log(data);
            deal.urlPicture = pictureName;
            this.apiService.PutDeal(deal, this.token).subscribe(
              data => {
                console.log(data);
                loading.dismiss();
              },
              error => {
                console.error(error);
                loading.dismiss();
              }
            )
            loading.dismiss();
          }, (error) => {
            loading.dismiss();
            console.log(error);
          });
        },
        error => {
          loading.dismiss();
          console.error(error);
        }
      );


    } else {

      this.errorMessage = "Verifier le formulaire";
      let alert = this.alertCtrl.create({
        title: 'Erreur',
        subTitle: this.errorMessage,
        buttons: ['Ok']
      });
      alert.present();
    }

  }
}
