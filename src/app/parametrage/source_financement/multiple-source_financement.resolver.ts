import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SourceFinancementService } from './source_financement.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleSourceFinancementResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.source_financementSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.source_financementSrv.httpSrv.handleError(error);
        return of({ source_financements: null, error: message });
      }));
  }

  constructor(public source_financementSrv: SourceFinancementService) { }
}

