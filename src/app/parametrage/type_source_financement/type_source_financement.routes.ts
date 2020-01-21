import { Route } from "@angular/router";
import { TypeSourceFinancementListComponent } from './type_source_financement-list/type_source_financement-list.component';
import { TypeSourceFinancementNewComponent } from './type_source_financement-new/type_source_financement-new.component';
import { TypeSourceFinancementEditComponent } from './type_source_financement-edit/type_source_financement-edit.component';
import { TypeSourceFinancementCloneComponent } from './type_source_financement-clone/type_source_financement-clone.component';
import { TypeSourceFinancementShowComponent } from './type_source_financement-show/type_source_financement-show.component';
import { MultipleTypeSourceFinancementResolver } from './multiple-type_source_financement.resolver';
import { OneTypeSourceFinancementResolver } from './one-type_source_financement.resolver';

const type_source_financementRoutes: Route = {
    path: 'typeSourceFinancement', children: [
        { path: '', component: TypeSourceFinancementListComponent, resolve: { type_source_financements: MultipleTypeSourceFinancementResolver } },
        { path: 'new', component: TypeSourceFinancementNewComponent },
        { path: ':id/edit', component: TypeSourceFinancementEditComponent, resolve: { type_source_financement: OneTypeSourceFinancementResolver } },
        { path: ':id/clone', component: TypeSourceFinancementCloneComponent, resolve: { type_source_financement: OneTypeSourceFinancementResolver } },
        { path: ':id', component: TypeSourceFinancementShowComponent, resolve: { type_source_financement: OneTypeSourceFinancementResolver } }
    ]

};

export { type_source_financementRoutes }
