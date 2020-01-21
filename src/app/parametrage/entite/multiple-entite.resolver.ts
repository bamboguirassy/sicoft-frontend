import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EntiteService } from './entite.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleEntiteResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.entiteSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.entiteSrv.httpSrv.handleError(error);
        return of({ entites: null, error: message });
      }));
  }

  constructor(public entiteSrv: EntiteService) { }
}

