import { Route } from '@angular/router';
import { SousClasseListComponent } from './sous_classe-list/sous_classe-list.component';
import { SousClasseNewComponent } from './sous_classe-new/sous_classe-new.component';
import { SousClasseEditComponent } from './sous_classe-edit/sous_classe-edit.component';
import { SousClasseCloneComponent } from './sous_classe-clone/sous_classe-clone.component';
import { SousClasseShowComponent } from './sous_classe-show/sous_classe-show.component';
import { MultipleSousClasseResolver } from './multiple-sous_classe.resolver';
import { OneSousClasseResolver } from './one-sous_classe.resolver';
import { MultipleClasseResolver } from '../classe/multiple-classe.resolver';

const sous_classeRoutes: Route = {
    path: 'sousClasse', children: [
        { path: '', component: SousClasseListComponent, resolve: { sous_classes: MultipleSousClasseResolver } },
        { path: 'new', component: SousClasseNewComponent, resolve: { classes: MultipleClasseResolver}},
        // tslint:disable-next-line:max-line-length
        { path: ':id/edit', component: SousClasseEditComponent, resolve: { sous_classe: OneSousClasseResolver, classes: MultipleClasseResolver } },
        // tslint:disable-next-line:max-line-length
        { path: ':id/clone', component: SousClasseCloneComponent, resolve: { sous_classe: OneSousClasseResolver, classes: MultipleClasseResolver} },
        { path: ':id', component: SousClasseShowComponent, resolve: { sous_classe: OneSousClasseResolver } }
    ]

};

export { sous_classeRoutes }
