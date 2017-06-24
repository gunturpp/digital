import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CobascrollPage } from './cobascroll';

@NgModule({
  declarations: [
    CobascrollPage,
  ],
  imports: [
    IonicPageModule.forChild(CobascrollPage),
  ],
  exports: [
    CobascrollPage
  ]
})
export class CobascrollPageModule {}
