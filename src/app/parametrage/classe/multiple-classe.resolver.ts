import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ClasseService } from './classe.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleClasseResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.classeSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.classeSrv.httpSrv.handleError(error);
        return of({ classes: null, error: message });
      }));
  }

  constructor(public classeSrv: ClasseService) { }
}

