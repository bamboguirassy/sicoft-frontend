import { Route } from "@angular/router";
import { ExerciceListComponent } from './exercice-list/exercice-list.component';
import { ExerciceNewComponent } from './exercice-new/exercice-new.component';
import { ExerciceEditComponent } from './exercice-edit/exercice-edit.component';
import { ExerciceCloneComponent } from './exercice-clone/exercice-clone.component';
import { ExerciceShowComponent } from './exercice-show/exercice-show.component';
import { MultipleExerciceResolver } from './multiple-exercice.resolver';
import { OneExerciceResolver } from './one-exercice.resolver';

const exerciceRoutes: Route = {
    path: 'exercice', children: [
        { path: '', component: ExerciceListComponent, resolve: { exercices: MultipleExerciceResolver } },
        { path: 'new', component: ExerciceNewComponent },
        { path: ':id/edit', component: ExerciceEditComponent, resolve: { exercice: OneExerciceResolver } },
        { path: ':id/clone', component: ExerciceCloneComponent, resolve: { exercice: OneExerciceResolver } },
        { path: ':id', component: ExerciceShowComponent, resolve: { exercice: OneExerciceResolver } }
    ]

};

export { exerciceRoutes }
