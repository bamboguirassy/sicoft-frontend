
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private routePrefix: string = 'budget';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(budget: Budget) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', budget);
  }

  update(budget: Budget) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+budget.id+'/edit', budget);
  }

  clone(original: Budget, clone: Budget) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(budget: Budget) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+budget.id);
  }

  removeSelection(budgets: Budget[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',budgets);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
