import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'changelog',
    loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangeLogModule)
  },
  {
    path: '',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('../../parametrage/parametrage.module').then(m => m.ParametrageModule)
  },
  {
    path: '',
    loadChildren: () => import('../../gestion-budget/gestion-budget.module').then(m => m.GestionBudgetModule)
  }
];
