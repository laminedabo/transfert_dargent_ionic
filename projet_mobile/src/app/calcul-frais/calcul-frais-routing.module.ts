import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculFraisPage } from './calcul-frais.page';

const routes: Routes = [
  {
    path: '',
    component: CalculFraisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculFraisPageRoutingModule {}
