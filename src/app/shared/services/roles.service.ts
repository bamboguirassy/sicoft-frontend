import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  roles: string;
  private roleName: string = 'access';
  public localStorage = window.localStorage;

  constructor() { }

  getRoles() {
    if (!this.roles) {
      this.roles = this.localStorage.getItem(this.roleName);
    }
    return this.roles ? this.roles : null;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public setRoles(roles: string) {
    this.roles = roles;
  }
}
