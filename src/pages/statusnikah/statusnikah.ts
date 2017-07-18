import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from "../register/register";


@Component({
  selector: 'page-statusnikah',
  templateUrl: 'statusnikah.html',
})
export class StatusnikahPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusnikahPage');
  }

  functNikah(statusNikahnya){
    console.log(statusNikahnya);
    this.navCtrl.setRoot(RegisterPage);
  }
}
