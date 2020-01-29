
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { CategorieClasse } from './categorie_classe';

@Injectable({
  providedIn: 'root'
})
export class CategorieClasseService {

  private routePrefix: string = 'categorieClasse';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(categorie_classe: CategorieClasse) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', categorie_classe);
  }

  update(categorie_classe: CategorieClasse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+categorie_classe.id+'/edit', categorie_classe);
  }

  clone(original: CategorieClasse, clone: CategorieClasse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(categorie_classe: CategorieClasse) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+categorie_classe.id);
  }

  removeSelection(categorie_classes: CategorieClasse[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',categorie_classes);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
