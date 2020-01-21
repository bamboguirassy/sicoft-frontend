
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Entite } from './entite';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  private routePrefix: string = 'entite';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(entite: Entite) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', entite);
  }

  update(entite: Entite) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+entite.id+'/edit', entite);
  }

  clone(original: Entite, clone: Entite) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(entite: Entite) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+entite.id);
  }

  removeSelection(entites: Entite[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',entites);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
