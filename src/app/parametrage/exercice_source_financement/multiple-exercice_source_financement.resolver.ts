import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExerciceSourceFinancementService } from './exercice_source_financement.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleExerciceSourceFinancementResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.exercice_source_financementSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.exercice_source_financementSrv.httpSrv.handleError(error);
        return of({ exercice_source_financements: null, error: message });
      }));
  }

  constructor(public exercice_source_financementSrv: ExerciceSourceFinancementService) { }
}

