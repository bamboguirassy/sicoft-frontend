
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  findBudgetByEntiteAccessAndExercice(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  // tslint:disable-next-line:member-ordering
  private routePrefix = 'budget';

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
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + budget.id + '/edit', budget);
  }

  clone(original: Budget, clone: Budget) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(budget: Budget) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + budget.id);
  }

  removeSelection(budgets: Budget[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', budgets);
  }

  findBudgetByEntiteAccess() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'entite/access');
<<<<<<< HEAD
  } 
  
  findBudgetByEntiteAccessAndExercice(id: number){
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'entite/access/exercice/' +  id);
=======
  }

<<<<<<< HEAD
  findBudgetByEntiteAccessAndExercice(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'entite/access/exercice/' + id);
>>>>>>> 68b074d1ab1f049bc1eb2c3d4dcb1b61de061a8e

=======
>>>>>>> 8d739786c7e5e9e8458bbdca621cde80ddc0b6c7
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

}
