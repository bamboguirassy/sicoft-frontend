
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private routePrefix: string = 'user';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(user: User) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', user);
  }

  update(user: User) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+user.id+'/edit', user);
  }

  clone(original: User, clone: User) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(user: User) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+user.id);
  }

  removeSelection(users: User[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',users);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
