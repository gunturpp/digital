import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewsDetailPage } from './reviews-detail';

@NgModule({
  declarations: [
    ReviewsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewsDetailPage),
  ],
  exports: [
    ReviewsDetailPage
  ]
})
export class ReviewsDetailPageModule {}
