import { MultipleEntiteResolver } from './../entite/multiple-entite.resolver';
import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCloneComponent } from './user-clone/user-clone.component';
import { UserShowComponent } from './user-show/user-show.component';
import { MultipleUserResolver } from './multiple-user.resolver';
import { OneUserResolver } from './one-user.resolver';
import { MultipleGroupResolver } from '../group/multiple-group.resolver';
import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
import { MultipleEtatMarcheResolver } from '../etat_marche/multiple-etat_marche.resolver';

const userRoutes: Route = {
  path: 'user',
  children: [
    {
      path: '',
      component: UserListComponent,
      resolve: { users: MultipleUserResolver,
        entites: MultipleEntiteResolver, etatMarches: MultipleEtatMarcheResolver, groups: MultipleGroupResolver}
    },
    {
      path: 'new',
      component: UserNewComponent,
      resolve: {
        groups: MultipleGroupResolver,
        entites: MultipleEntiteResolver
      }
    },
    {
      path: ':id/edit',
      component: UserEditComponent,
      resolve: {
        user: OneUserResolver,
        groups: MultipleGroupResolver,
        entites: MultipleEntiteResolver
      }
    },
    {
      path: ':id/clone',
      component: UserCloneComponent,
      resolve: {
        user: OneUserResolver,
        groups: MultipleGroupResolver,
        entites: MultipleEntiteResolver
      }
    },
    { path: 'profil', component: UserProfilePageComponent },
    {
      path: ':id',
      component: UserShowComponent,
      resolve: { user: OneUserResolver }
    }
  ]
};

export { userRoutes };
