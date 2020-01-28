import { Route } from "@angular/router";
import { CategorieClasseListComponent } from './categorie_classe-list/categorie_classe-list.component';
import { CategorieClasseNewComponent } from './categorie_classe-new/categorie_classe-new.component';
import { CategorieClasseEditComponent } from './categorie_classe-edit/categorie_classe-edit.component';
import { CategorieClasseCloneComponent } from './categorie_classe-clone/categorie_classe-clone.component';
import { CategorieClasseShowComponent } from './categorie_classe-show/categorie_classe-show.component';
import { MultipleCategorieClasseResolver } from './multiple-categorie_classe.resolver';
import { OneCategorieClasseResolver } from './one-categorie_classe.resolver';

const categorie_classeRoutes: Route = {
    path: 'categorieClasse', children: [
        { path: '', component: CategorieClasseListComponent, resolve: { categorie_classes: MultipleCategorieClasseResolver } },
        { path: 'new', component: CategorieClasseNewComponent },
        { path: ':id/edit', component: CategorieClasseEditComponent, resolve: { categorie_classe: OneCategorieClasseResolver } },
        { path: ':id/clone', component: CategorieClasseCloneComponent, resolve: { categorie_classe: OneCategorieClasseResolver } },
        { path: ':id', component: CategorieClasseShowComponent, resolve: { categorie_classe: OneCategorieClasseResolver } }
    ]

};

export { categorie_classeRoutes }
