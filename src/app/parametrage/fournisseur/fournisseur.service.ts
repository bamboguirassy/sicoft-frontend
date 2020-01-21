
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Fournisseur } from './fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private routePrefix: string = 'fournisseur';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(fournisseur: Fournisseur) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', fournisseur);
  }

  update(fournisseur: Fournisseur) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+fournisseur.id+'/edit', fournisseur);
  }

  clone(original: Fournisseur, clone: Fournisseur) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(fournisseur: Fournisseur) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+fournisseur.id);
  }

  removeSelection(fournisseurs: Fournisseur[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',fournisseurs);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
