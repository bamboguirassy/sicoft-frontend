import { Route } from "@angular/router";
import { TypeEntiteListComponent } from './type_entite-list/type_entite-list.component';
import { TypeEntiteNewComponent } from './type_entite-new/type_entite-new.component';
import { TypeEntiteEditComponent } from './type_entite-edit/type_entite-edit.component';
import { TypeEntiteCloneComponent } from './type_entite-clone/type_entite-clone.component';
import { TypeEntiteShowComponent } from './type_entite-show/type_entite-show.component';
import { MultipleTypeEntiteResolver } from './multiple-type_entite.resolver';
import { OneTypeEntiteResolver } from './one-type_entite.resolver';

const type_entiteRoutes: Route = {
    path: 'typeEntite', children: [
        { path: '', component: TypeEntiteListComponent, resolve: { type_entites: MultipleTypeEntiteResolver } },
        { path: 'new', component: TypeEntiteNewComponent },
        { path: ':id/edit', component: TypeEntiteEditComponent, resolve: { type_entite: OneTypeEntiteResolver } },
        { path: ':id/clone', component: TypeEntiteCloneComponent, resolve: { type_entite: OneTypeEntiteResolver } },
        { path: ':id', component: TypeEntiteShowComponent, resolve: { type_entite: OneTypeEntiteResolver } }
    ]

};

export { type_entiteRoutes }
