
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

  findAllocationsByExerciceSrcFin(idExSourcFin: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + idExSourcFin + '/esf')
  }

  findAllocationsByBudgetAndCompteDivisionnaire(idCompteDiv: number, idBudget: number, code: string) {
    const accountType = code === '2' ? 'depense' : 'recette';
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + idBudget + '/' + idCompteDiv + '/budget-cd?accountType=' + accountType)
  }

  findTotalAllocationsRecetteAndDepenseByBudget(budgetId: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + budgetId + '/budget');
  }

  updateMultipleAndSrcFinAmount(allocations: Allocation[]) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + 'edit-multiple', allocations);
  }

}
