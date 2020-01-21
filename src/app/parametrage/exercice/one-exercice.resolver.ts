import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExerciceService } from './exercice.service';

@Injectable({
  providedIn: 'root'
})
export class OneExerciceResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.exerciceSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ exercice: null, error: message });
    }));
  }

  constructor(public exerciceSrv:ExerciceService) { }
}

