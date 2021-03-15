import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserTransactionPage } from './user-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: UserTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTransactionPageRoutingModule {}
