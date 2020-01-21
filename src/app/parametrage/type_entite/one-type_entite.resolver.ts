import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypeEntiteService } from './type_entite.service';

@Injectable({
  providedIn: 'root'
})
export class OneTypeEntiteResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.type_entiteSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ type_entite: null, error: message });
    }));
  }

  constructor(public type_entiteSrv:TypeEntiteService) { }
}

