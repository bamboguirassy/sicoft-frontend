import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EtatMarcheService } from './etat_marche.service';

@Injectable({
  providedIn: 'root'
})
export class OneEtatMarcheResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.etat_marcheSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ etat_marche: null, error: message });
    }));
  }

  constructor(public etat_marcheSrv:EtatMarcheService) { }
}

