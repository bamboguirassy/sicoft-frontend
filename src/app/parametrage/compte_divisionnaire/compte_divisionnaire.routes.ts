import { Route } from "@angular/router";
import { CompteDivisionnaireListComponent } from './compte_divisionnaire-list/compte_divisionnaire-list.component';
import { CompteDivisionnaireNewComponent } from './compte_divisionnaire-new/compte_divisionnaire-new.component';
import { CompteDivisionnaireEditComponent } from './compte_divisionnaire-edit/compte_divisionnaire-edit.component';
import { CompteDivisionnaireCloneComponent } from './compte_divisionnaire-clone/compte_divisionnaire-clone.component';
import { CompteDivisionnaireShowComponent } from './compte_divisionnaire-show/compte_divisionnaire-show.component';
import { MultipleCompteDivisionnaireResolver } from './multiple-compte_divisionnaire.resolver';
import { OneCompteDivisionnaireResolver } from './one-compte_divisionnaire.resolver';

const compte_divisionnaireRoutes: Route = {
    path: 'compteDivisionnaire', children: [
        { path: '', component: CompteDivisionnaireListComponent, resolve: { compte_divisionnaires: MultipleCompteDivisionnaireResolver } },
        { path: 'new', component: CompteDivisionnaireNewComponent },
        { path: ':id/edit', component: CompteDivisionnaireEditComponent, resolve: { compte_divisionnaire: OneCompteDivisionnaireResolver } },
        { path: ':id/clone', component: CompteDivisionnaireCloneComponent, resolve: { compte_divisionnaire: OneCompteDivisionnaireResolver } },
        { path: ':id', component: CompteDivisionnaireShowComponent, resolve: { compte_divisionnaire: OneCompteDivisionnaireResolver } }
    ]

};

export { compte_divisionnaireRoutes }
