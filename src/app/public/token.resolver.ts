import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'app/parametrage/user/user.service';

@Injectable({ providedIn: 'root' })
export class TokenResolver implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.userSrv.verificateToken(route.params.token).pipe(map(data => {
            return data;
        }),
            catchError(error => {
                alert(error.error.message);
                const message = `Retrieval error: ${error}`;
                this.userSrv.httpSrv.handleError(error);
                return of(null);
            }));
    }

    constructor(public userSrv: UserService) { }
}