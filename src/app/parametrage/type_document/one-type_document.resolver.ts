import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypeDocumentService } from './type_document.service';

@Injectable({
  providedIn: 'root'
})
export class OneTypeDocumentResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.type_documentSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ type_document: null, error: message });
    }));
  }

  constructor(public type_documentSrv:TypeDocumentService) { }
}

