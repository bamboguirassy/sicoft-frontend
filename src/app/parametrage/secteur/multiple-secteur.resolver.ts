import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SecteurService } from './secteur.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleSecteurResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.secteurSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.secteurSrv.httpSrv.handleError(error);
        return of({ secteurs: null, error: message });
      }));
  }

  constructor(public secteurSrv: SecteurService) { }
}

