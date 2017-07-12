import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'screen.html',
  
})

export class ScreenPage {

    constructor(public navCtrl:NavController){
        
        setTimeout(() => {
            this.navCtrl.setRoot(LoginPage);
        }, 6000);


    }
}
