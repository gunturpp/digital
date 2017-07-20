import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { RegisterPage } from "../register/register";
let dataJson = 'assets/data/indonesia.json';


@Component({
  selector: 'page-domisili',
  templateUrl: 'domisili.html',
})
export class DomisiliPage {
  value: string;
  domisili: any;
  dimana ='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
     this.http.get(dataJson)
        .map(res => this.domisili= res.json())
        .subscribe(domisili => {
            this.domisili = domisili['domisili'];
            for(let i=0; i<this.domisili.length;i++){
            console.log(this.domisili[i]);

            }
          });
  }
  
  takeDomisili(city:any){
   this.navCtrl.push(RegisterPage, {
      kota: city
    });
  }
  ionViewDidLoad() {
  }

}
