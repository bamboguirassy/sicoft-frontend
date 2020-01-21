
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { TypeEntite } from './type_entite';

@Injectable({
  providedIn: 'root'
})
export class TypeEntiteService {

  private routePrefix: string = 'typeEntite';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(type_entite: TypeEntite) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', type_entite);
  }

  update(type_entite: TypeEntite) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+type_entite.id+'/edit', type_entite);
  }

  clone(original: TypeEntite, clone: TypeEntite) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(type_entite: TypeEntite) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+type_entite.id);
  }

  removeSelection(type_entites: TypeEntite[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',type_entites);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
