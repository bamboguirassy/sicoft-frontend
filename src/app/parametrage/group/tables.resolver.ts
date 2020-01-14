import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroupService } from './group.service';

@Injectable({ providedIn: 'root' })
export class TablesResolver implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.groupSrv.getTables().pipe(map(data => {
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