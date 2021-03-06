import { Route } from '@angular/router';
import { SecteurListComponent } from './secteur-list/secteur-list.component';
import { SecteurNewComponent } from './secteur-new/secteur-new.component';
import { SecteurEditComponent } from './secteur-edit/secteur-edit.component';
import { SecteurCloneComponent } from './secteur-clone/secteur-clone.component';
import { SecteurShowComponent } from './secteur-show/secteur-show.component';
import { MultipleSecteurResolver } from './multiple-secteur.resolver';
import { OneSecteurResolver } from './one-secteur.resolver';
import { MultipleFournisseurResolver } from '../fournisseur/multiple-fournisseur.resolver';
import { OneFournisseurResolver } from '../fournisseur/one-fournisseur.resolver';

const secteurRoutes: Route = {
  path: 'secteur',
  children: [
    {
      path: '',
      component: SecteurListComponent,
      resolve: { secteurs: MultipleSecteurResolver }
    },
    {
      path: 'new',
      component: SecteurNewComponent,
      resolve: { secteurs: MultipleSecteurResolver }
    },
    {
      path: ':id/edit',
      component: SecteurEditComponent,
      resolve: {
          secteur: OneSecteurResolver,
          secteurs: MultipleSecteurResolver
         }
    },

    {
      path: ':id/clone',
      component: SecteurCloneComponent,
      resolve: {
        secteur: OneSecteurResolver,
        secteurs: MultipleSecteurResolver
      }
    },
    {
      path: ':id',
      component: SecteurShowComponent,
      resolve: { secteur: OneSecteurResolver }
    }
  ]
};

export { secteurRoutes };
