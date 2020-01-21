import { Route } from "@angular/router";
import { CompteListComponent } from './compte-list/compte-list.component';
import { CompteNewComponent } from './compte-new/compte-new.component';
import { CompteEditComponent } from './compte-edit/compte-edit.component';
import { CompteCloneComponent } from './compte-clone/compte-clone.component';
import { CompteShowComponent } from './compte-show/compte-show.component';
import { MultipleCompteResolver } from './multiple-compte.resolver';
import { OneCompteResolver } from './one-compte.resolver';

const compteRoutes: Route = {
    path: 'compte', children: [
        { path: '', component: CompteListComponent, resolve: { comptes: MultipleCompteResolver } },
        { path: 'new', component: CompteNewComponent },
        { path: ':id/edit', component: CompteEditComponent, resolve: { compte: OneCompteResolver } },
        { path: ':id/clone', component: CompteCloneComponent, resolve: { compte: OneCompteResolver } },
        { path: ':id', component: CompteShowComponent, resolve: { compte: OneCompteResolver } }
    ]

};

export { compteRoutes }
