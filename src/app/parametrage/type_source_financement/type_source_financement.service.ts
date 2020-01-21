
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { TypeSourceFinancement } from './type_source_financement';

@Injectable({
  providedIn: 'root'
})
export class TypeSourceFinancementService {

  private routePrefix: string = 'typeSourceFinancement';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(type_source_financement: TypeSourceFinancement) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', type_source_financement);
  }

  update(type_source_financement: TypeSourceFinancement) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+type_source_financement.id+'/edit', type_source_financement);
  }

  clone(original: TypeSourceFinancement, clone: TypeSourceFinancement) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(type_source_financement: TypeSourceFinancement) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+type_source_financement.id);
  }

  removeSelection(type_source_financements: TypeSourceFinancement[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',type_source_financements);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
