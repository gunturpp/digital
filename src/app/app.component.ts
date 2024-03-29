import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { MenuPage } from '../pages/menu/menu';
// import { HomePage } from '../pages/home/home';
// import { InboxPage } from '../pages/inbox/inbox';
// import { LoginPage } from '../pages/login/login';
// import { MyprofilePage } from '../pages/myprofile/myprofile';
// import { RegisterPage } from '../pages/register/register';
// import { FeedbackPage } from '../pages/feedback/feedback';
import { ScreenPage } from '../pages/screen/screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ScreenPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

