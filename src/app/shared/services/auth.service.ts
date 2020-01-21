import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { User } from 'app/parametrage/user/user';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //current user
  private currentUserManager: BehaviorSubject<any> = new BehaviorSubject([]);
  public currentUserProvider = this.currentUserManager.asObservable();
  currentUser: User;

  public localStorage = window.localStorage;

  constructor(public httpSrv: HttpService,
    private titleCasePipe: TitleCasePipe) { }

  getCurrentUser() {
    let req = this.httpSrv.get('auth/current_user/');
    req.subscribe((data: any) => {
      this.currentUserManager.next(data);
      this.currentUser = data;
    },
      error => console.log(error));
    return req;
  }

  login(loginInformation: any) {
    return this.httpSrv.post('login_check', loginInformation);
  }

  getRoles(): string[] {
    let roles: string[] = [];
    if (this.currentUser) {
      this.currentUser.groups.forEach(group => {
        roles = roles.concat(group.roles);
      });
    }
    return roles;
  }

  checkCloneAccess(entityName: string) {
    let role = 'ROLE_' + entityName + '_CLONE';
    return this.getRoles().includes(role);
  }

  checkEditAccess(entityName: string) {
    let role = 'ROLE_' + entityName + '_EDIT';
    return this.getRoles().includes(role);
  }

  checkCreateAccess(entityName: string) {
    let role = 'ROLE_' + entityName + '_CREATE';
    return this.getRoles().includes(role);
  }

  checkDeleteAccess(entityName: string) {
    let role = 'ROLE_' + entityName + '_DELETE';
    return this.getRoles().includes(role);
  }

  checkListAccess(entityName: string) {
    entityName=entityName[0].toUpperCase()+entityName.substr(1);
    let role = 'ROLE_' + entityName + '_INDEX';
    return this.getRoles().includes(role);
  }

  checkShowAccess(entityName: string) {
    let role = 'ROLE_' + entityName + '_SHOW';
    return this.getRoles().includes(role);
  }


}
