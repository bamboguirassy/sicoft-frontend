import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BudgetService } from './budget.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleBudgetResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.budgetSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.budgetSrv.httpSrv.handleError(error);
        return of({ budgets: null, error: message });
      }));
  }

  constructor(public budgetSrv: BudgetService) { }
}

