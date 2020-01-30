import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SousClasseService } from './sous_classe.service';

@Injectable({
  providedIn: 'root'
})
export class OneSousClasseResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.sous_classeSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ sous_classe: null, error: message });
    }));
  }

  constructor(public sous_classeSrv:SousClasseService) { }
}

