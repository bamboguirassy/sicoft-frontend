
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { TypeDocument } from './type_document';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {

  private routePrefix: string = 'typeDocument';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(type_document: TypeDocument) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', type_document);
  }

  update(type_document: TypeDocument) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+type_document.id+'/edit', type_document);
  }

  clone(original: TypeDocument, clone: TypeDocument) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(type_document: TypeDocument) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+type_document.id);
  }

  removeSelection(type_documents: TypeDocument[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',type_documents);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
