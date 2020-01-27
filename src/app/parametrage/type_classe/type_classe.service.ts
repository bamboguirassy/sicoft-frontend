
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { TypeClasse } from './type_classe';

@Injectable({
  providedIn: 'root'
})
export class TypeClasseService {

  private routePrefix: string = 'typeClasse';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(type_classe: TypeClasse) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', type_classe);
  }

  update(type_classe: TypeClasse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+type_classe.id+'/edit', type_classe);
  }

  clone(original: TypeClasse, clone: TypeClasse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(type_classe: TypeClasse) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+type_classe.id);
  }

  removeSelection(type_classes: TypeClasse[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',type_classes);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
