import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypeClasseService } from './type_classe.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleTypeClasseResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.type_classeSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.type_classeSrv.httpSrv.handleError(error);
        return of({ type_classes: null, error: message });
      }));
  }

  constructor(public type_classeSrv: TypeClasseService) { }
}

