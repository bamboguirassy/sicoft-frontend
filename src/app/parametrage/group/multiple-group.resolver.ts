import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GroupService } from './group.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleGroupResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.groupSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.groupSrv.httpSrv.handleError(error);
        return of({ groups: null, error: message });
      }));
  }

  constructor(public groupSrv: GroupService) { }
}

