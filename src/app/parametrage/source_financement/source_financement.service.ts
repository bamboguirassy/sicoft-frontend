
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { SourceFinancement } from './source_financement';

@Injectable({
  providedIn: 'root'
})
export class SourceFinancementService {

  private routePrefix: string = 'sourceFinancement';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(source_financement: SourceFinancement) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', source_financement);
  }

  update(source_financement: SourceFinancement) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+source_financement.id+'/edit', source_financement);
  }

  clone(original: SourceFinancement, clone: SourceFinancement) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(source_financement: SourceFinancement) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+source_financement.id);
  }

  removeSelection(source_financements: SourceFinancement[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',source_financements);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
