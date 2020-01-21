import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SecteurService } from './secteur.service';

@Injectable({
  providedIn: 'root'
})
export class OneSecteurResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.secteurSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ secteur: null, error: message });
    }));
  }

  constructor(public secteurSrv:SecteurService) { }
}

