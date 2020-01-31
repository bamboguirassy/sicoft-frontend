import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userRoutes } from './user/user.routes';
import { groupRoutes } from './group/group.routes';
import { entiteRoutes } from './entite/entite.routes';
import { type_entiteRoutes } from './type_entite/type_entite.routes';
import { exerciceRoutes } from './exercice/exercice.routes';
import { classeRoutes } from './classe/classe.routes';
import { compteRoutes } from './compte/compte.routes';
import { type_documentRoutes } from './type_document/type_document.routes';
import { type_passationRoutes } from './type_passation/type_passation.routes';
import { etat_marcheRoutes } from './etat_marche/etat_marche.routes';
import { secteurRoutes } from './secteur/secteur.routes';
import { fournisseurRoutes } from './fournisseur/fournisseur.routes';
import { type_source_financementRoutes } from './type_source_financement/type_source_financement.routes';
import { source_financementRoutes } from './source_financement/source_financement.routes';
import { categorie_classeRoutes } from './categorie_classe/categorie_classe.routes';
import { type_classeRoutes } from './type_classe/type_classe.routes';
import { compte_divisionnaireRoutes } from './compte_divisionnaire/compte_divisionnaire.routes';
import { sous_classeRoutes } from './sous_classe/sous_classe.routes';
import { exercice_source_financementRoutes } from './exercice_source_financement/exercice_source_financement.routes';

const routes: Routes = [
  userRoutes,
  groupRoutes,
  entiteRoutes,
  type_entiteRoutes,
  exerciceRoutes,
  classeRoutes,
  compteRoutes,
  type_documentRoutes,
  type_passationRoutes,
  etat_marcheRoutes,
  secteurRoutes,
  fournisseurRoutes,
  type_source_financementRoutes,
  source_financementRoutes,
  categorie_classeRoutes,
  type_classeRoutes,
  compte_divisionnaireRoutes,
  sous_classeRoutes,
  exercice_source_financementRoutes,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { }
