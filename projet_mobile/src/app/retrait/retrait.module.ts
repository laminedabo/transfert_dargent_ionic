import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { RetraitPageRoutingModule } from './retrait-routing.module';

import { RetraitPage } from './retrait.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetraitPageRoutingModule,
    MaterialModule
  ],
  declarations: [RetraitPage]
})
export class RetraitPageModule {}
