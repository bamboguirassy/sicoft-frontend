import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CategorieClasseService } from './categorie_classe.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleCategorieClasseResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.categorie_classeSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.categorie_classeSrv.httpSrv.handleError(error);
        return of({ categorie_classes: null, error: message });
      }));
  }

  constructor(public categorie_classeSrv: CategorieClasseService) { }
}

