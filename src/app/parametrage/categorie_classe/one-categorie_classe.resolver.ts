import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategorieClasseService } from './categorie_classe.service';

@Injectable({
  providedIn: 'root'
})
export class OneCategorieClasseResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.categorie_classeSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ categorie_classe: null, error: message });
    }));
  }

  constructor(public categorie_classeSrv:CategorieClasseService) { }
}

