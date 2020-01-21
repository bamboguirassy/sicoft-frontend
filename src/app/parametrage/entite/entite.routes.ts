import { Route } from "@angular/router";
import { EntiteListComponent } from './entite-list/entite-list.component';
import { EntiteNewComponent } from './entite-new/entite-new.component';
import { EntiteEditComponent } from './entite-edit/entite-edit.component';
import { EntiteCloneComponent } from './entite-clone/entite-clone.component';
import { EntiteShowComponent } from './entite-show/entite-show.component';
import { MultipleEntiteResolver } from './multiple-entite.resolver';
import { OneEntiteResolver } from './one-entite.resolver';

const entiteRoutes: Route = {
    path: 'entite', children: [
        { path: '', component: EntiteListComponent, resolve: { entites: MultipleEntiteResolver } },
        { path: 'new', component: EntiteNewComponent },
        { path: ':id/edit', component: EntiteEditComponent, resolve: { entite: OneEntiteResolver } },
        { path: ':id/clone', component: EntiteCloneComponent, resolve: { entite: OneEntiteResolver } },
        { path: ':id', component: EntiteShowComponent, resolve: { entite: OneEntiteResolver } }
    ]

};

export { entiteRoutes }
