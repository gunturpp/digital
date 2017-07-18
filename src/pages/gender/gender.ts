import { Injectable , Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from "../register/register";

@Injectable()
@Component({
  selector: 'page-gender',
  templateUrl: 'gender.html',
})
export class GenderPage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenderPage');
  }
  
  functGender(gendernya){
    console.log(gendernya);
    this.navCtrl.setRoot(RegisterPage);
  }
}
