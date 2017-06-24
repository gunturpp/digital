import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';

import { MyApp } from './app.component';

import { CobascrollPage } from '../pages/cobascroll/cobascroll';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { BestdealsPage } from '../pages/bestdeals/bestdeals';
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
    BestdealsPage,
    MenuPage,
    FeedbackPage,
    InboxPage,
    AboutPage,
    SettingPage,
    MyprofilePage,
    CobascrollPage,
    ProductDetailPage,
    ReviewsDetailPage
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
    BestdealsPage,
    MenuPage,
    FeedbackPage,
    InboxPage,
    AboutPage,
    SettingPage,
    MyprofilePage,
    CobascrollPage,
    ProductDetailPage,
    ReviewsDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    Network,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider 
  ]
})
export class AppModule {}
