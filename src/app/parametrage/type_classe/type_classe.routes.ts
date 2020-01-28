import { Route } from "@angular/router";
import { TypeClasseListComponent } from './type_classe-list/type_classe-list.component';
import { TypeClasseNewComponent } from './type_classe-new/type_classe-new.component';
import { TypeClasseEditComponent } from './type_classe-edit/type_classe-edit.component';
import { TypeClasseCloneComponent } from './type_classe-clone/type_classe-clone.component';
import { TypeClasseShowComponent } from './type_classe-show/type_classe-show.component';
import { MultipleTypeClasseResolver } from './multiple-type_classe.resolver';
import { OneTypeClasseResolver } from './one-type_classe.resolver';

const type_classeRoutes: Route = {
    path: 'typeClasse', children: [
        { path: '', component: TypeClasseListComponent, resolve: { type_classes: MultipleTypeClasseResolver } },
        { path: 'new', component: TypeClasseNewComponent },
        { path: ':id/edit', component: TypeClasseEditComponent, resolve: { type_classe: OneTypeClasseResolver } },
        { path: ':id/clone', component: TypeClasseCloneComponent, resolve: { type_classe: OneTypeClasseResolver } },
        { path: ':id', component: TypeClasseShowComponent, resolve: { type_classe: OneTypeClasseResolver } }
    ]

};

export { type_classeRoutes }
