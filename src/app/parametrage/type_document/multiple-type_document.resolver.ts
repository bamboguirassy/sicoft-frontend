import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypeDocumentService } from './type_document.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleTypeDocumentResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.type_documentSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.type_documentSrv.httpSrv.handleError(error);
        return of({ type_documents: null, error: message });
      }));
  }

  constructor(public type_documentSrv: TypeDocumentService) { }
}

