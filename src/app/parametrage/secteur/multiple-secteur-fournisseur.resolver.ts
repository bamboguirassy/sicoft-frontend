 import { Injectable } from '@angular/core';
 import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
 import { Observable, of } from 'rxjs';
import { map, catchError } from '../../../../node_modules/rxjs/operators';
import { SecteurService } from './secteur.service';
 @Injectable({ providedIn: 'root' })
 export class MultipleSecteurFournisseurResolver implements Resolve<any> {
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
        return this.secteurSrv.findWithAtLeastOneFournisseur().pipe(map(data => {
            return data;
          }),
            catchError(error => {
              const message = `Retrieval error: ${error}`;
              this.secteurSrv.httpSrv.handleError(error);
              return of({ secteurs: null, error: message });
            }));
        }
        constructor(public secteurSrv: SecteurService) { }
     }
 
