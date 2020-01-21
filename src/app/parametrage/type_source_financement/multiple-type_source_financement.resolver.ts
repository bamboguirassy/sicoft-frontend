import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypeSourceFinancementService } from './type_source_financement.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleTypeSourceFinancementResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.type_source_financementSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.type_source_financementSrv.httpSrv.handleError(error);
        return of({ type_source_financements: null, error: message });
      }));
  }

  constructor(public type_source_financementSrv: TypeSourceFinancementService) { }
}

