import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypeSourceFinancementService } from './type_source_financement.service';

@Injectable({
  providedIn: 'root'
})
export class OneTypeSourceFinancementResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.type_source_financementSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ type_source_financement: null, error: message });
    }));
  }

  constructor(public type_source_financementSrv:TypeSourceFinancementService) { }
}

