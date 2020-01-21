import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EtatMarcheService } from './etat_marche.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleEtatMarcheResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.etat_marcheSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.etat_marcheSrv.httpSrv.handleError(error);
        return of({ etat_marches: null, error: message });
      }));
  }

  constructor(public etat_marcheSrv: EtatMarcheService) { }
}

