import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HereMapPage } from './here-map.page';

const routes: Routes = [
  {
    path: '',
    component: HereMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HereMapPageRoutingModule {}
