import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypePassationService } from './type_passation.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleTypePassationResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.type_passationSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.type_passationSrv.httpSrv.handleError(error);
        return of({ type_passations: null, error: message });
      }));
  }

  constructor(public type_passationSrv: TypePassationService) { }
}

