import { Route } from "@angular/router";
import { GroupListComponent } from './group-list/group-list.component';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupCloneComponent } from './group-clone/group-clone.component';
import { GroupShowComponent } from './group-show/group-show.component';
import { MultipleGroupResolver } from './multiple-group.resolver';
import { OneGroupResolver } from './one-group.resolver';
import { TablesResolver } from './tables.resolver';

const groupRoutes: Route = {
    path: 'group', children: [
        { path: '', component: GroupListComponent, resolve: { groups: MultipleGroupResolver } },
        { path: 'new', component: GroupNewComponent, resolve: { tables: TablesResolver } },
        { path: ':id/edit', component: GroupEditComponent, resolve: { group: OneGroupResolver } },
        { path: ':id/clone', component: GroupCloneComponent, resolve: { group: OneGroupResolver } },
        { path: ':id', component: GroupShowComponent, resolve: { group: OneGroupResolver } }
    ]

};

export { groupRoutes }
