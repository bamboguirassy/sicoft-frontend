import { MultipleSecteurResolver } from './../secteur/multiple-secteur.resolver';
import { Route } from '@angular/router';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurNewComponent } from './fournisseur-new/fournisseur-new.component';
import { FournisseurEditComponent } from './fournisseur-edit/fournisseur-edit.component';
import { FournisseurCloneComponent } from './fournisseur-clone/fournisseur-clone.component';
import { FournisseurShowComponent } from './fournisseur-show/fournisseur-show.component';
import { MultipleFournisseurResolver } from './multiple-fournisseur.resolver';
import { OneFournisseurResolver } from './one-fournisseur.resolver';

const fournisseurRoutes: Route = {
  path: 'fournisseur',
  children: [
    {
      path: '',
      component: FournisseurListComponent,
      resolve: { 
        fournisseurs: MultipleFournisseurResolver,
        secteurs: MultipleSecteurResolver,
       }
    },
    {
      path: 'new',
      component: FournisseurNewComponent,
      resolve: { secteurs: MultipleSecteurResolver }
    },
    {
      path: ':id/edit',
      component: FournisseurEditComponent,
      resolve: {
        fournisseur: OneFournisseurResolver,
        secteurs: MultipleSecteurResolver
      }
    },
    {
      path: ':id/clone',
      component: FournisseurCloneComponent,
      resolve: {
        fournisseur: OneFournisseurResolver,
        secteurs: MultipleSecteurResolver
      }
    },
    {
      path: ':id',
      component: FournisseurShowComponent,
      resolve: { fournisseur: OneFournisseurResolver }
    }
  ]
};

export { fournisseurRoutes };
