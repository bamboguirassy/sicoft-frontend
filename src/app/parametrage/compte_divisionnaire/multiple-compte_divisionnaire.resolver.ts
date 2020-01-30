import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CompteDivisionnaireService } from './compte_divisionnaire.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleCompteDivisionnaireResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.compte_divisionnaireSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.compte_divisionnaireSrv.httpSrv.handleError(error);
        return of({ compte_divisionnaires: null, error: message });
      }));
  }

  constructor(public compte_divisionnaireSrv: CompteDivisionnaireService) { }
}

