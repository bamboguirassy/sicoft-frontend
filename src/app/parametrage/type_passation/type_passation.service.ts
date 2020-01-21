
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { TypePassation } from './type_passation';

@Injectable({
  providedIn: 'root'
})
export class TypePassationService {

  private routePrefix: string = 'typePassation';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(type_passation: TypePassation) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', type_passation);
  }

  update(type_passation: TypePassation) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+type_passation.id+'/edit', type_passation);
  }

  clone(original: TypePassation, clone: TypePassation) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(type_passation: TypePassation) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+type_passation.id);
  }

  removeSelection(type_passations: TypePassation[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',type_passations);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
