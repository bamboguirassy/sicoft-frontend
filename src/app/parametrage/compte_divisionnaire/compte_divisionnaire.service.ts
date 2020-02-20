
import { Injectable } from '@angular/core';
import { CompteDivisionnaire } from './compte_divisionnaire';
import { HttpService } from 'app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CompteDivisionnaireService {

  private routePrefix: string = 'compteDivisionnaire';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(compte_divisionnaire: CompteDivisionnaire) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', compte_divisionnaire);
  }

  update(compte_divisionnaire: CompteDivisionnaire) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + compte_divisionnaire.id + '/edit', compte_divisionnaire);
  }

  clone(original: CompteDivisionnaire, clone: CompteDivisionnaire) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(compte_divisionnaire: CompteDivisionnaire) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + compte_divisionnaire.id);
  }

  removeSelection(compte_divisionnaires: CompteDivisionnaire[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', compte_divisionnaires);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  findBySousClasse(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id + '/sous-classe');
  }

  createMultiple(divisionnalAccount: CompteDivisionnaire[]) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create-multiple', divisionnalAccount);
  }

  deleteAfterConfirmation(divisionalAccount: CompteDivisionnaire) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + divisionalAccount.id + '/confirm');
  }
}
