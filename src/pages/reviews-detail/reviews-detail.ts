import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReviewsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reviews-detail',
  templateUrl: 'reviews-detail.html',
})
export class ReviewsDetailPage {
  review:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.review = this.navParams.data.review;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsDetailPage');
  }

}
