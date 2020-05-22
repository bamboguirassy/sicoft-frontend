
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Compte } from './compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private routePrefix = 'compte';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(compte: Compte) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', compte);
  }

  update(compte: Compte) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + compte.id + '/edit', compte);
  }

  clone(original: Compte, clone: Compte) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(compte: Compte) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + compte.id);
  }

  removeSelection(comptes: Compte[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', comptes);
  }

  findCompteRecetteByBudget(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id + '/recette');
  }
  findCompteDepenseByBudget(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id + '/depense');
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  findByCompteDivisionnaire(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id + '/compte-divisionnaire');
  }

  findAllocatedAccountByBudgetAndCompteDivisionnaire(compteDivId: number, budgetId: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + budgetId + '/' + compteDivId + '/allocated')
  }

  createMultiple(comptes: Compte[] ) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create-multiple', comptes);
  }

 
}
