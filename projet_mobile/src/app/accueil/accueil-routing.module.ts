import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service'

import { AccueilPage } from './accueil.page';

const routes: Routes = [
  {
    path: '',
    component: AccueilPage,
    children: [
      {
        path: 'main',
        canActivate: [AuthGuard],
        loadChildren: () => import('../main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'transaction',
        canActivate: [AuthGuard],
        loadChildren: () => import('../transaction/transaction.module').then( m => m.TransactionPageModule)
      },
      {
        path: 'commission',
        canActivate: [AuthGuard],
        loadChildren: () => import('../commission/commission.module').then( m => m.CommissionPageModule)
      },
      {
        path: 'calcul-frais',
        canActivate: [AuthGuard],
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
