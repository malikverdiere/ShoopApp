import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage';
import {HttpClientModule} from '@angular/common/http'
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DatePicker } from '@ionic-native/date-picker';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddDealPage } from '../pages/StorePages/add-deal/add-deal';
import { LoginStorePage } from '../pages/StorePages/loginStore/LoginStore';
import { StorePage } from '../pages/StorePages/store/store';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiServiceProvider } from '../providers/api-service/api-service';
import{AuthService} from '../providers/auth-service/auth-service'
import {ConfigUrlApi} from '../Utils/ConfigUrlApi';
import {UtilsListForms} from '../Utils/Utils-list-form';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddDealPage,
    LoginStorePage,
    StorePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Janvier', 'Fevrier', 'Mars','Avril','Mail', 'Juin', 'Juillet', 'aout', 'septembre', 'Octobre', 'Novemvre', 'Décembre' ],
      monthShortNames: ['jan', 'fev', 'mar', 'avr', 'mai','jui', 'juil', 'aou', 'sep','oct', 'nov', 'dec' ],
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddDealPage,
    LoginStorePage,
    StorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    Camera,
    FileTransfer,
    FileTransferObject,
    PhotoLibrary,
    ApiServiceProvider,
    HttpClientModule,
    AuthService,
    ConfigUrlApi,
    UtilsListForms,
    DatePicker
  ]
})
export class AppModule {}
