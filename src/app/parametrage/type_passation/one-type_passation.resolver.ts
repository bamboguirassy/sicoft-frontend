import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypePassationService } from './type_passation.service';

@Injectable({
  providedIn: 'root'
})
export class OneTypePassationResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.type_passationSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ type_passation: null, error: message });
    }));
  }

  constructor(public type_passationSrv:TypePassationService) { }
}

