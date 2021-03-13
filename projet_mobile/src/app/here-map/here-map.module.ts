import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HereMapPageRoutingModule } from './here-map-routing.module';

import { HereMapPage } from './here-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HereMapPageRoutingModule
  ],
  declarations: [HereMapPage]
})
export class HereMapPageModule {}
