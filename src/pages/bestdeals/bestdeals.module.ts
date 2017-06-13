import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BestdealsPage } from './bestdeals';

@NgModule({
  declarations: [
    BestdealsPage,
  ],
  imports: [
    IonicPageModule.forChild(BestdealsPage),
  ],
  exports: [
    BestdealsPage
  ]
})
export class BestdealsPageModule {}
