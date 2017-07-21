import { Injectable , Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from "../register/register";

@Injectable()
@Component({
  selector: 'page-gender',
  templateUrl: 'gender.html',
})
export class GenderPage {
  value:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenderPage');
  }
  
  functGender(){
    this.value = 'WANITA';
    console.log(this.value);
    this.navCtrl.push(RegisterPage,{
      gender: this.value})
    return this.value;
  }
  functGender2(){
    this.value = 'PRIA';
    console.log(this.value);
    
    this.navCtrl.push(RegisterPage,{
      gender: this.value});

    return this.value;

  }
}
