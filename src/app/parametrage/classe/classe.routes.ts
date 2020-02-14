import { Route } from '@angular/router';
import { ClasseListComponent } from './classe-list/classe-list.component';
import { ClasseNewComponent } from './classe-new/classe-new.component';
import { ClasseEditComponent } from './classe-edit/classe-edit.component';
import { ClasseCloneComponent } from './classe-clone/classe-clone.component';
import { ClasseShowComponent } from './classe-show/classe-show.component';
import { MultipleClasseResolver } from './multiple-classe.resolver';
import { OneClasseResolver } from './one-classe.resolver';
import { MultipleTypeClasseResolver } from '../type_classe/multiple-type_classe.resolver';
import { MultipleCategorieClasseResolver } from '../categorie_classe/multiple-categorie_classe.resolver';

const classeRoutes: Route = {
    path: 'classe', children: [
        { path: '', component: ClasseListComponent, resolve: { classes: MultipleClasseResolver, categorieClasses: MultipleCategorieClasseResolver, typeClasses: MultipleTypeClasseResolver } },
        // tslint:disable-next-line: max-line-length
        { path: 'new', component: ClasseNewComponent, resolve: { categorieClasses: MultipleCategorieClasseResolver, typeClasses: MultipleTypeClasseResolver } },
        // tslint:disable-next-line: max-line-length
        { path: ':id/edit', component: ClasseEditComponent, resolve: { classe: OneClasseResolver, categorieClasses: MultipleCategorieClasseResolver, typeClasses: MultipleTypeClasseResolver } },
        // tslint:disable-next-line: max-line-length
        { path: ':id/clone', component: ClasseCloneComponent, resolve: { classe: OneClasseResolver, categorieClasses: MultipleCategorieClasseResolver, typeClasses: MultipleTypeClasseResolver } },
        { path: ':id', component: ClasseShowComponent, resolve: { classe: OneClasseResolver } }
    ]

};

export { classeRoutes }
