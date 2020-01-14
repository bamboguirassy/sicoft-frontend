import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userRoutes } from './user/user.routes';
import { groupRoutes } from './group/group.routes';

const routes: Routes = [
  userRoutes,
  groupRoutes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { }
