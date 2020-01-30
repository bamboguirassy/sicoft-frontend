import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CompteDivisionnaireService } from './compte_divisionnaire.service';

@Injectable({
  providedIn: 'root'
})
export class OneCompteDivisionnaireResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.compte_divisionnaireSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ compte_divisionnaire: null, error: message });
    }));
  }

  constructor(public compte_divisionnaireSrv:CompteDivisionnaireService) { }
}

