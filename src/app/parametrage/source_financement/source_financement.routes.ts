import { Route } from '@angular/router';
import { SourceFinancementListComponent } from './source_financement-list/source_financement-list.component';
import { SourceFinancementNewComponent } from './source_financement-new/source_financement-new.component';
import { SourceFinancementEditComponent } from './source_financement-edit/source_financement-edit.component';
import { SourceFinancementCloneComponent } from './source_financement-clone/source_financement-clone.component';
import { SourceFinancementShowComponent } from './source_financement-show/source_financement-show.component';
import { MultipleSourceFinancementResolver } from './multiple-source_financement.resolver';
import { OneSourceFinancementResolver } from './one-source_financement.resolver';
import { MultipleTypeSourceFinancementResolver } from '../type_source_financement/multiple-type_source_financement.resolver';

const source_financementRoutes: Route = {
    path: 'sourceFinancement', children: [
        { path: '', component: SourceFinancementListComponent, resolve: { source_financements: MultipleSourceFinancementResolver } },
        { path: 'new', component: SourceFinancementNewComponent, resolve: { types: MultipleTypeSourceFinancementResolver } },
        { path: ':id/edit', component: SourceFinancementEditComponent, resolve: { source_financement: OneSourceFinancementResolver } },
        { path: ':id/clone', component: SourceFinancementCloneComponent, resolve: { source_financement: OneSourceFinancementResolver } },
        { path: ':id', component: SourceFinancementShowComponent, resolve: { source_financement: OneSourceFinancementResolver } }
    ]
};

export { source_financementRoutes }
