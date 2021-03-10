import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';

import { IonicModule } from '@ionic/angular';

import { CalculFraisPageRoutingModule } from './calcul-frais-routing.module';

import { CalculFraisPage } from './calcul-frais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    CalculFraisPageRoutingModule
  ],
  declarations: [CalculFraisPage]
})
export class CalculFraisPageModule {}
