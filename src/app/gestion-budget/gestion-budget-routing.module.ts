import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { budgetRoutes } from './budget/budget.routes';

const routes: Routes = [
  budgetRoutes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionBudgetRoutingModule { }
