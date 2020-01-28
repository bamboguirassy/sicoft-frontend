import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Entite } from './entite';
import { EntiteService } from './entite.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MultipleSousEntiteResolver implements Resolve<any> {

    constructor(public entiteSrv: EntiteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.entiteSrv.findSousEntitesById(route.params.id).pipe(map(data => data),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                this.entiteSrv.httpSrv.handleError(error);
                return of({ entites: null, error: message })
            }));
    }
}