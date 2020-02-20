
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Exercice } from './exercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  private routePrefix = 'exercice';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  findExercicePrecedent(exercice: Exercice) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + exercice.id+'/precedent/');
  }

  create(exercice: Exercice) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', exercice);
  }

  update(exercice: Exercice) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + exercice.id + '/edit', exercice);
  }

  clone(original: Exercice, clone: Exercice) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(exercice: Exercice) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + exercice.id);
  }

  removeSelection(exercices: Exercice[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', exercices);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }
  disableExerciceExcept(original: Exercice, operation: string, clone?: Exercice) {
    if (operation === 'create') {
      return this.httpSrv.post(`${this.getRoutePrefix()}/create-enable`, original);
    } else if (operation === 'update') {
      return this.httpSrv.put(`${this.getRoutePrefix()}/create-enable/${original.id}`, original);
    } else if ( operation === 'clone' && clone) {
      return this.httpSrv.put(`${this.getRoutePrefix()}/create-enable/${original.id}/clone`, clone);
    }
  }

}
