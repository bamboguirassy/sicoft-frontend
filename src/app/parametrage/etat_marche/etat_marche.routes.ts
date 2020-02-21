import { Route } from "@angular/router";
import { EtatMarcheListComponent } from './etat_marche-list/etat_marche-list.component';
import { EtatMarcheNewComponent } from './etat_marche-new/etat_marche-new.component';
import { EtatMarcheEditComponent } from './etat_marche-edit/etat_marche-edit.component';
import { EtatMarcheCloneComponent } from './etat_marche-clone/etat_marche-clone.component';
import { EtatMarcheShowComponent } from './etat_marche-show/etat_marche-show.component';
import { MultipleEtatMarcheResolver } from './multiple-etat_marche.resolver';
import { OneEtatMarcheResolver } from './one-etat_marche.resolver';
import { MultipleTypePassationResolver } from '../type_passation/multiple-type_passation.resolver';

const etat_marcheRoutes: Route = {
    path: 'etatMarche', children: [
        { path: '', component: EtatMarcheListComponent, resolve: { etat_marches: MultipleEtatMarcheResolver, typePassations: MultipleTypePassationResolver } },
        { path: 'new', component: EtatMarcheNewComponent, resolve: { etats: MultipleEtatMarcheResolver, typePassations: MultipleTypePassationResolver } },
        { path: ':id/edit', component: EtatMarcheEditComponent, resolve: { etat_marche: OneEtatMarcheResolver, etats: MultipleEtatMarcheResolver } },
        { path: ':id/clone', component: EtatMarcheCloneComponent, resolve: { etat_marche: OneEtatMarcheResolver, etats: MultipleEtatMarcheResolver } },
        { path: ':id', component: EtatMarcheShowComponent, resolve: { etat_marche: OneEtatMarcheResolver } }
    ]

};

export { etat_marcheRoutes }
