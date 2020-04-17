import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AllocationService } from './allocation.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleAllocationResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.allocationSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.allocationSrv.httpSrv.handleError(error);
        return of({ allocations: null, error: message });
      }));
  }

  constructor(public allocationSrv: AllocationService) { }
}

