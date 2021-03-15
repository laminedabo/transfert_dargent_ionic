import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';

import { IonicModule } from '@ionic/angular';

import { UserTransactionPageRoutingModule } from './user-transaction-routing.module';

import { UserTransactionPage } from './user-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    UserTransactionPageRoutingModule
  ],
  declarations: [UserTransactionPage]
})
export class UserTransactionPageModule {}
