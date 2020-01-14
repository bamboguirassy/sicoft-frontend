
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private routePrefix: string = 'group';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  getTables() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'access-group/');
  }

  create(group: Group) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', group);
  }

  update(group: Group) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+group.id+'/edit', group);
  }

  clone(original: Group, clone: Group) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(group: Group) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+group.id);
  }

  removeSelection(groups: Group[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',groups);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
