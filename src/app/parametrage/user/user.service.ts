
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { User } from './user';
import { of } from 'rxjs';
import { userColumns } from './user.columns';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private routePrefix = 'user';

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

  changePassword(id: any, newPassword: string) {
    return this.httpSrv.post('public/change-password/' + id, newPassword);
  }

  verificateToken(token: string) {
    return this.httpSrv.post('public/verificate-token/', token);
  }

  askResetPassword(email: string) {
    return this.httpSrv.post('public/ask-reset-password/', email);
  }

  update(user: User) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + user.id + '/edit', user);
  }

  clone(original: User, clone: User) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(user: User) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + user.id);
  }

  removeSelection(users: User[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', users);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }
  updatePassword(user: User) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + 'password_update', user);
  }

  editProfil(user: User) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + user.id + '/edit_profil', user);
  }

  uploadFileProfil(file: File) {
    
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + 'change_image_profil', file);
  }
}
