import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import {IonicStorageModule } from '@ionic/storage';

import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { DataProvider} from '../providers/data/data';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Locations } from '../providers/locations';
import { MyApp } from './app.component';

import { ScreenPage } from '../pages/screen/screen';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { FeedbackPage } from '../pages/feedback/feedback';
import { InboxPage } from '../pages/inbox/inbox';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ReviewsDetailPage } from '../pages/reviews-detail/reviews-detail';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuPage,
    FeedbackPage,
    InboxPage,
    AboutPage,
    SettingPage,
    MyprofilePage,
    ProductDetailPage,
    ReviewsDetailPage,
    LocationSelectPage,
    ScreenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuPage,
    FeedbackPage,
    InboxPage,
    AboutPage,
    SettingPage,
    MyprofilePage,
    ProductDetailPage,
    ReviewsDetailPage,
    LocationSelectPage,
    ScreenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    DataProvider,
    Network,
    Locations,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider 
  ]
})
export class AppModule {}
