import { Route } from '@angular/router';
import { EntiteListComponent } from './entite-list/entite-list.component';
import { EntiteNewComponent } from './entite-new/entite-new.component';
import { EntiteEditComponent } from './entite-edit/entite-edit.component';
import { EntiteCloneComponent } from './entite-clone/entite-clone.component';
import { EntiteShowComponent } from './entite-show/entite-show.component';
import { MultipleEntiteResolver } from './multiple-entite.resolver';
import { OneEntiteResolver } from './one-entite.resolver';
import { MultipleTypeEntiteResolver } from '../type_entite/multiple-type_entite.resolver';
import { MultipleSousEntiteResolver } from './multiple-sous-entite.resolver';
import { MultipleUserResolver } from '../user/multiple-user.resolver';


const entiteRoutes: Route = {
    path: 'entite', children: [
        { path: '', component: EntiteListComponent,
         resolve: { entites: MultipleEntiteResolver, users: MultipleUserResolver, typeEntites: MultipleTypeEntiteResolver } },
        // tslint:disable-next-line:max-line-length
        { path: 'new', component: EntiteNewComponent,
         resolve: { entites: MultipleEntiteResolver, typeEntites: MultipleTypeEntiteResolver } },
        // tslint:disable-next-line:max-line-length
        { path: ':id/edit', component: EntiteEditComponent, resolve: { entite: OneEntiteResolver, entites: MultipleEntiteResolver, typeEntites: MultipleTypeEntiteResolver } },
        // tslint:disable-next-line:max-line-length
        { path: ':id/clone', component: EntiteCloneComponent, resolve: { entite: OneEntiteResolver, entites: MultipleEntiteResolver, typeEntites: MultipleTypeEntiteResolver } },
        // tslint:disable-next-line:max-line-length
        { path: ':id', component: EntiteShowComponent, resolve: { entite: OneEntiteResolver,
             types: MultipleTypeEntiteResolver, sousEntites: MultipleSousEntiteResolver, users: MultipleUserResolver } }
    ]

};

export { entiteRoutes }
