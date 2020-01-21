import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypeEntiteService } from './type_entite.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleTypeEntiteResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.type_entiteSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.type_entiteSrv.httpSrv.handleError(error);
        return of({ type_entites: null, error: message });
      }));
  }

  constructor(public type_entiteSrv: TypeEntiteService) { }
}

