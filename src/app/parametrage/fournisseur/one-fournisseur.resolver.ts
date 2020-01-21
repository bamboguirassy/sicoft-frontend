import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FournisseurService } from './fournisseur.service';

@Injectable({
  providedIn: 'root'
})
export class OneFournisseurResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.fournisseurSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ fournisseur: null, error: message });
    }));
  }

  constructor(public fournisseurSrv:FournisseurService) { }
}

