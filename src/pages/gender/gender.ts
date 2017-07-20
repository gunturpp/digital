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
    this.value = 'female';
    console.log(this.value);
<<<<<<< HEAD
    this.navCtrl.pop();
=======
    this.navCtrl.setRoot(RegisterPage,{
      gender: this.value})
>>>>>>> 073cd62edb1f08b64e809daa26ff36042abd8760
    return this.value;
  }
  functGender2(){
    this.value = 'male';
    console.log(this.value);
<<<<<<< HEAD
    this.navCtrl.pop();
=======
    
    this.navCtrl.setRoot(RegisterPage,{
      gender: this.value});

>>>>>>> 073cd62edb1f08b64e809daa26ff36042abd8760
    return this.value;

  }
}
