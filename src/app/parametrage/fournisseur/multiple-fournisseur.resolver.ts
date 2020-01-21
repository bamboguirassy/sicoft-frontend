import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FournisseurService } from './fournisseur.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleFournisseurResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.fournisseurSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.fournisseurSrv.httpSrv.handleError(error);
        return of({ fournisseurs: null, error: message });
      }));
  }

  constructor(public fournisseurSrv: FournisseurService) { }
}

