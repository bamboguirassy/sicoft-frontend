import { Route } from "@angular/router";
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetNewComponent } from './budget-new/budget-new.component';
import { BudgetEditComponent } from './budget-edit/budget-edit.component';
import { BudgetCloneComponent } from './budget-clone/budget-clone.component';
import { BudgetShowComponent } from './budget-show/budget-show.component';
import { MultipleBudgetResolver } from './multiple-budget.resolver';
import { OneBudgetResolver } from './one-budget.resolver';

const budgetRoutes: Route = {
    path: 'budget', children: [
        { path: '', component: BudgetListComponent, resolve: { budgets: MultipleBudgetResolver } },
        { path: 'new', component: BudgetNewComponent },
        { path: ':id/edit', component: BudgetEditComponent, resolve: { budget: OneBudgetResolver } },
        { path: ':id/clone', component: BudgetCloneComponent, resolve: { budget: OneBudgetResolver } },
        { path: ':id', component: BudgetShowComponent, resolve: { budget: OneBudgetResolver } }
    ]

};

export { budgetRoutes }
