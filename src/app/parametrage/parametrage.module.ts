import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrageRoutingModule } from './parametrage-routing.module';
import { UserCloneComponent } from './user/user-clone/user-clone.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserShowComponent } from './user/user-show/user-show.component';

import { TableModule } from 'primeng/table';
import { ContextMenuModule, MenuModule, ButtonModule, CardModule, FieldsetModule, ToolbarModule, TabViewModule } from 'primeng';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {CheckboxModule} from 'primeng/checkbox';


import { GroupCloneComponent } from './group/group-clone/group-clone.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupNewComponent } from './group/group-new/group-new.component';
import { GroupShowComponent } from './group/group-show/group-show.component';


@NgModule({
  declarations: [
    UserCloneComponent,
    UserEditComponent,
    UserListComponent,
    UserNewComponent,
    UserShowComponent,
    GroupCloneComponent,
    GroupEditComponent,
    GroupListComponent,
    GroupNewComponent,
    GroupShowComponent,
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
    CheckboxModule
  ]
})
export class ParametrageModule { }
