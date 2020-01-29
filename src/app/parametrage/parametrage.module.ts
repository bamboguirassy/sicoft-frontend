import { OrgChartModule } from '@mondal/org-chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ParametrageRoutingModule } from './parametrage-routing.module';
import { UserCloneComponent } from './user/user-clone/user-clone.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserShowComponent } from './user/user-show/user-show.component';

import { TableModule } from 'primeng/table';
import {
  ContextMenuModule,
  MenuModule, ButtonModule,
  CardModule, FieldsetModule,
  ToolbarModule, TabViewModule,
  AccordionModule, BreadcrumbModule
} from 'primeng';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { ChipsModule } from 'primeng/chips';
import { NgSelectModule } from '@ng-select/ng-select';

import { GroupCloneComponent } from './group/group-clone/group-clone.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupNewComponent } from './group/group-new/group-new.component';
import { GroupShowComponent } from './group/group-show/group-show.component';
import { EntiteCloneComponent } from './entite/entite-clone/entite-clone.component';
import { EntiteEditComponent } from './entite/entite-edit/entite-edit.component';
import { EntiteListComponent } from './entite/entite-list/entite-list.component';
import { EntiteNewComponent } from './entite/entite-new/entite-new.component';
import { EntiteShowComponent } from './entite/entite-show/entite-show.component';
import { TypeEntiteCloneComponent } from './type_entite/type_entite-clone/type_entite-clone.component';
import { TypeEntiteEditComponent } from './type_entite/type_entite-edit/type_entite-edit.component';
import { TypeEntiteListComponent } from './type_entite/type_entite-list/type_entite-list.component';
import { TypeEntiteNewComponent } from './type_entite/type_entite-new/type_entite-new.component';
import { TypeEntiteShowComponent } from './type_entite/type_entite-show/type_entite-show.component';
import { ExerciceCloneComponent } from './exercice/exercice-clone/exercice-clone.component';
import { ExerciceEditComponent } from './exercice/exercice-edit/exercice-edit.component';
import { ExerciceListComponent } from './exercice/exercice-list/exercice-list.component';
import { ExerciceNewComponent } from './exercice/exercice-new/exercice-new.component';
import { ExerciceShowComponent } from './exercice/exercice-show/exercice-show.component';
import { ClasseCloneComponent } from './classe/classe-clone/classe-clone.component';
import { ClasseEditComponent } from './classe/classe-edit/classe-edit.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { ClasseNewComponent } from './classe/classe-new/classe-new.component';
import { ClasseShowComponent } from './classe/classe-show/classe-show.component';
import { CompteCloneComponent } from './compte/compte-clone/compte-clone.component';
import { CompteEditComponent } from './compte/compte-edit/compte-edit.component';
import { CompteListComponent } from './compte/compte-list/compte-list.component';
import { CompteNewComponent } from './compte/compte-new/compte-new.component';
import { CompteShowComponent } from './compte/compte-show/compte-show.component';
import { TypeDocumentCloneComponent } from './type_document/type_document-clone/type_document-clone.component';
import { TypeDocumentEditComponent } from './type_document/type_document-edit/type_document-edit.component';
import { TypeDocumentListComponent } from './type_document/type_document-list/type_document-list.component';
import { TypeDocumentNewComponent } from './type_document/type_document-new/type_document-new.component';
import { TypeDocumentShowComponent } from './type_document/type_document-show/type_document-show.component';
import { TypePassationCloneComponent } from './type_passation/type_passation-clone/type_passation-clone.component';
import { TypePassationEditComponent } from './type_passation/type_passation-edit/type_passation-edit.component';
import { TypePassationListComponent } from './type_passation/type_passation-list/type_passation-list.component';
import { TypePassationNewComponent } from './type_passation/type_passation-new/type_passation-new.component';
import { TypePassationShowComponent } from './type_passation/type_passation-show/type_passation-show.component';
import { EtatMarcheCloneComponent } from './etat_marche/etat_marche-clone/etat_marche-clone.component';
import { EtatMarcheEditComponent } from './etat_marche/etat_marche-edit/etat_marche-edit.component';
import { EtatMarcheListComponent } from './etat_marche/etat_marche-list/etat_marche-list.component';
import { EtatMarcheNewComponent } from './etat_marche/etat_marche-new/etat_marche-new.component';
import { EtatMarcheShowComponent } from './etat_marche/etat_marche-show/etat_marche-show.component';
import { SecteurCloneComponent } from './secteur/secteur-clone/secteur-clone.component';
import { SecteurEditComponent } from './secteur/secteur-edit/secteur-edit.component';
import { SecteurListComponent } from './secteur/secteur-list/secteur-list.component';
import { SecteurNewComponent } from './secteur/secteur-new/secteur-new.component';
import { SecteurShowComponent } from './secteur/secteur-show/secteur-show.component';
import { FournisseurCloneComponent } from './fournisseur/fournisseur-clone/fournisseur-clone.component';
import { FournisseurEditComponent } from './fournisseur/fournisseur-edit/fournisseur-edit.component';
import { FournisseurListComponent } from './fournisseur/fournisseur-list/fournisseur-list.component';
import { FournisseurNewComponent } from './fournisseur/fournisseur-new/fournisseur-new.component';
import { FournisseurShowComponent } from './fournisseur/fournisseur-show/fournisseur-show.component';
import { TypeSourceFinancementCloneComponent } from './type_source_financement/type_source_financement-clone/type_source_financement-clone.component';
import { TypeSourceFinancementEditComponent } from './type_source_financement/type_source_financement-edit/type_source_financement-edit.component';
import { TypeSourceFinancementListComponent } from './type_source_financement/type_source_financement-list/type_source_financement-list.component';
import { TypeSourceFinancementNewComponent } from './type_source_financement/type_source_financement-new/type_source_financement-new.component';
import { TypeSourceFinancementShowComponent } from './type_source_financement/type_source_financement-show/type_source_financement-show.component';
import { SourceFinancementCloneComponent } from './source_financement/source_financement-clone/source_financement-clone.component';
import { SourceFinancementEditComponent } from './source_financement/source_financement-edit/source_financement-edit.component';
import { SourceFinancementListComponent } from './source_financement/source_financement-list/source_financement-list.component';
import { SourceFinancementNewComponent } from './source_financement/source_financement-new/source_financement-new.component';
import { SourceFinancementShowComponent } from './source_financement/source_financement-show/source_financement-show.component';
import { UserProfilePageComponent } from './user/user-profile/user-profile-page.component';
import { TypeClasseCloneComponent } from './type_classe/type_classe-clone/type_classe-clone.component';
import { TypeClasseEditComponent } from './type_classe/type_classe-edit/type_classe-edit.component';
import { TypeClasseListComponent } from './type_classe/type_classe-list/type_classe-list.component';
import { TypeClasseNewComponent } from './type_classe/type_classe-new/type_classe-new.component';
import { TypeClasseShowComponent } from './type_classe/type_classe-show/type_classe-show.component';
import { CategorieClasseCloneComponent } from './categorie_classe/categorie_classe-clone/categorie_classe-clone.component';
import { CategorieClasseEditComponent } from './categorie_classe/categorie_classe-edit/categorie_classe-edit.component';
import { CategorieClasseListComponent } from './categorie_classe/categorie_classe-list/categorie_classe-list.component';
import { CategorieClasseNewComponent } from './categorie_classe/categorie_classe-new/categorie_classe-new.component';
import { CategorieClasseShowComponent } from './categorie_classe/categorie_classe-show/categorie_classe-show.component';


@NgModule({
  declarations: [
    UserCloneComponent, UserEditComponent, UserListComponent, UserNewComponent, UserShowComponent, UserProfilePageComponent,
    GroupCloneComponent, GroupEditComponent, GroupListComponent, GroupNewComponent, GroupShowComponent,
    EntiteCloneComponent, EntiteEditComponent, EntiteListComponent, EntiteNewComponent, EntiteShowComponent,
    TypeEntiteCloneComponent, TypeEntiteEditComponent, TypeEntiteListComponent, TypeEntiteNewComponent, TypeEntiteShowComponent,
    ExerciceCloneComponent, ExerciceEditComponent, ExerciceListComponent, ExerciceNewComponent, ExerciceShowComponent,
    ClasseCloneComponent, ClasseEditComponent, ClasseListComponent, ClasseNewComponent, ClasseShowComponent,
    CompteCloneComponent, CompteEditComponent, CompteListComponent, CompteNewComponent, CompteShowComponent,
    TypeDocumentCloneComponent, TypeDocumentEditComponent, TypeDocumentListComponent, TypeDocumentNewComponent, TypeDocumentShowComponent,
    TypePassationCloneComponent, TypePassationEditComponent, TypePassationListComponent, TypePassationNewComponent, TypePassationShowComponent,
    EtatMarcheCloneComponent, EtatMarcheEditComponent, EtatMarcheListComponent, EtatMarcheNewComponent, EtatMarcheShowComponent,
    SecteurCloneComponent, SecteurEditComponent, SecteurListComponent, SecteurNewComponent, SecteurShowComponent,
    FournisseurCloneComponent, FournisseurEditComponent, FournisseurListComponent, FournisseurNewComponent, FournisseurShowComponent,
    TypeSourceFinancementCloneComponent, TypeSourceFinancementEditComponent, TypeSourceFinancementListComponent, TypeSourceFinancementNewComponent, TypeSourceFinancementShowComponent,
    SourceFinancementCloneComponent, SourceFinancementEditComponent, SourceFinancementListComponent, SourceFinancementNewComponent, SourceFinancementShowComponent,
    TypeClasseCloneComponent,TypeClasseEditComponent,TypeClasseListComponent,TypeClasseNewComponent,TypeClasseShowComponent,
    CategorieClasseCloneComponent,CategorieClasseEditComponent,CategorieClasseListComponent,CategorieClasseNewComponent,CategorieClasseShowComponent
  ],
  imports: [
    CommonModule,
    ParametrageRoutingModule,
    ToastModule,
    TableModule,
    ContextMenuModule,
    FormsModule,
    SharedModule,
    MenuModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    ToolbarModule,
    TabViewModule,
    CheckboxModule,
    InputSwitchModule,
    MultiSelectModule,
    InputMaskModule,
    ChipsModule,
    NgSelectModule,
    AccordionModule,
    BreadcrumbModule,
    OrgChartModule,
  ]
})
export class ParametrageModule { }
