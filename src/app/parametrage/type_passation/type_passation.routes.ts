import { Route } from "@angular/router";
import { TypePassationListComponent } from './type_passation-list/type_passation-list.component';
import { TypePassationNewComponent } from './type_passation-new/type_passation-new.component';
import { TypePassationEditComponent } from './type_passation-edit/type_passation-edit.component';
import { TypePassationCloneComponent } from './type_passation-clone/type_passation-clone.component';
import { TypePassationShowComponent } from './type_passation-show/type_passation-show.component';
import { MultipleTypePassationResolver } from './multiple-type_passation.resolver';
import { OneTypePassationResolver } from './one-type_passation.resolver';

const type_passationRoutes: Route = {
    path: 'typePassation', children: [
        { path: '', component: TypePassationListComponent, resolve: { type_passations: MultipleTypePassationResolver } },
        { path: 'new', component: TypePassationNewComponent },
        { path: ':id/edit', component: TypePassationEditComponent, resolve: { type_passation: OneTypePassationResolver } },
        { path: ':id/clone', component: TypePassationCloneComponent, resolve: { type_passation: OneTypePassationResolver } },
        { path: ':id', component: TypePassationShowComponent, resolve: { type_passation: OneTypePassationResolver } }
    ]

};

export { type_passationRoutes }
