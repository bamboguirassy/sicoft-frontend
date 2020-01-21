
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Secteur } from './secteur';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  private routePrefix: string = 'secteur';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(secteur: Secteur) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', secteur);
  }

  update(secteur: Secteur) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+secteur.id+'/edit', secteur);
  }

  clone(original: Secteur, clone: Secteur) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(secteur: Secteur) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+secteur.id);
  }

  removeSelection(secteurs: Secteur[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',secteurs);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
