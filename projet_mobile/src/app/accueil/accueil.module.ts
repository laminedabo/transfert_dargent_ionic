import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';
import { MaterialModule } from '../material.module';

import { AccueilPage } from './accueil.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule,
    MaterialModule
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule {}
