
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Allocation } from './allocation';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  private routePrefix: string = 'allocation';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(allocation: Allocation) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', allocation);
  }

  update(allocation: Allocation) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + allocation.id + '/edit', allocation);
  }

  clone(original: Allocation, clone: Allocation) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(allocation: Allocation) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + allocation.id);
  }

  removeSelection(allocations: Allocation[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', allocations);
  }

  createMultipleAndUpdateSrcFinAmount(allocations: Allocation[]) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create-multiple-recette', allocations);
  }

  createMultipleDepense(allocations: Allocation[]) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create-multiple-depense', allocations);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  findRecetteByExerciceSrcFin(idExSourcFin: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + idExSourcFin + '/esf')
  }

  findByBudgetAndCompteDivisionnaire(idCompteDiv: number, idBudget: number, code: string) {
    const accountType = code === '2' ? 'depense' : 'recette';
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + idBudget + '/' + idCompteDiv + '/budget-cd?compteType=' + accountType)
  }

  findDepenseByBudget(idBudget: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + idBudget + '/budget-depense')
  }

  findTotalRecetteAndDepenseByBudget(idBudget: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + idBudget + '/montant-recette-depense');
  }

  updateMultipleAndSrcFinAmount(allocations: Allocation[]) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + 'edit-multiple-recette', allocations);
  }

  updateMultipleDepense(allocations: Allocation[]) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + 'edit-multiple-depense', allocations);
  }

}
