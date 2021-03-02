import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPage } from './accueil.page';

const routes: Routes = [
  {
    path: '',
    component: AccueilPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('../main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../transaction/transaction.module').then( m => m.TransactionPageModule)
      },
      {
        path: 'commission',
        loadChildren: () => import('../commission/commission.module').then( m => m.CommissionPageModule)
      },
      {
        path: 'calcul-frais',
        loadChildren: () => import('../calcul-frais/calcul-frais.module').then( m => m.CalculFraisPageModule)
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccueilPageRoutingModule {}
