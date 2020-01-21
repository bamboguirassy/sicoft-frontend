import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExerciceService } from './exercice.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleExerciceResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.exerciceSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.exerciceSrv.httpSrv.handleError(error);
        return of({ exercices: null, error: message });
      }));
  }

  constructor(public exerciceSrv: ExerciceService) { }
}

