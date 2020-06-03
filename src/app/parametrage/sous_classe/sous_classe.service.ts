
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { SousClasse } from './sous_classe';

@Injectable({
  providedIn: 'root'
})
export class SousClasseService {

  private routePrefix = 'sousClasse';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(sous_classe: SousClasse) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', sous_classe);
  }

  update(sous_classe: SousClasse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + sous_classe.id + '/edit', sous_classe);
  }

  clone(original: SousClasse, clone: SousClasse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(sous_classe: SousClasse) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + sous_classe.id);
  }

  removeSelection(sous_classes: SousClasse[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', sous_classes);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  findByClasse(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id + '/classe/');
  }

  createMultiple(subClasses: SousClasse[]) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create-multiple', subClasses);
  }

  deleteAfterConfirmation(subClass: SousClasse) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + subClass.id + '/confirm');
  }

}
