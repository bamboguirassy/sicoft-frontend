import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypeClasseService } from './type_classe.service';

@Injectable({
  providedIn: 'root'
})
export class OneTypeClasseResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.type_classeSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ type_classe: null, error: message });
    }));
  }

  constructor(public type_classeSrv:TypeClasseService) { }
}

