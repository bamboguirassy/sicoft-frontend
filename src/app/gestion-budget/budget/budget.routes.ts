import { Route } from "@angular/router";
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetNewComponent } from './budget-new/budget-new.component';
import { BudgetEditComponent } from './budget-edit/budget-edit.component';
import { BudgetCloneComponent } from './budget-clone/budget-clone.component';
import { BudgetShowComponent } from './budget-show/budget-show.component';
import { MultipleBudgetResolver } from './multiple-budget.resolver';
import { OneBudgetResolver } from './one-budget.resolver';
import { MultipleExerciceResolver } from 'app/parametrage/exercice/multiple-exercice.resolver';
import { MultipleEntiteResolver } from 'app/parametrage/entite/multiple-entite.resolver';
import { OneExerciceResolver } from 'app/parametrage/exercice/one-exercice.resolver';
import { OneEntiteResolver } from 'app/parametrage/entite/one-entite.resolver';

const budgetRoutes: Route = {
    path: 'budget', children: [
        { path: '', component: BudgetListComponent, resolve: { budgets: MultipleBudgetResolver, exercices: MultipleExerciceResolver, entites: MultipleEntiteResolver } },
        { path: 'new', component: BudgetNewComponent, resolve: {budgets: MultipleBudgetResolver, exercices: MultipleExerciceResolver, entites: MultipleEntiteResolver } },
        { path: ':id/edit', component: BudgetEditComponent, resolve: { budget: OneBudgetResolver, exercices: MultipleExerciceResolver, entites: MultipleEntiteResolver,
        exercice: OneExerciceResolver, entite: OneEntiteResolver } },
        { path: ':id/clone', component: BudgetCloneComponent, resolve: { budget: OneBudgetResolver, exercices: MultipleExerciceResolver, entites: MultipleEntiteResolver,
            exercice: OneExerciceResolver, entite: OneEntiteResolver } },
        { path: ':id', component: BudgetShowComponent, resolve: { budget: OneBudgetResolver } }
    ]

};

export { budgetRoutes }
