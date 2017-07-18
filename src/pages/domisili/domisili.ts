import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
let dataJson = 'assets/data/indonesia.json';


@Component({
  selector: 'page-domisili',
  templateUrl: 'domisili.html',
})
export class DomisiliPage {
  domisili:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
     this.http.get(dataJson)
        .map(res => this.domisili= res.json())
        .subscribe(domisili => {
            this.domisili = domisili['domisili'];
            console.log(this.domisili);
          });
  }

  ionViewDidLoad() {
  }

}
