

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/parametrage/group/group';
import { Entite } from 'app/parametrage/entite/entite';


@Component({
  selector: 'app-user-clone',
  templateUrl: './user-clone.component.html',
  styleUrls: ['./user-clone.component.scss']
})
export class UserCloneComponent implements OnInit {
  user: User;
  original: User;
  groups: Group[] = [];
  entites: Entite[] = [];
  constructor(public userSrv: UserService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['user'];
    this.groups = this.activatedRoute.snapshot.data['groups'];
    this.entites = this.activatedRoute.snapshot.data['entites'];
    this.user = Object.assign({}, this.original);
    this.user.id = null;
  }

  cloneUser() {
    if (!this.user.groups) {
 const groupIds = [];
    this.user.groups.forEach(group => {
      groupIds.push(group.id);
    });
    this.user.groups = groupIds;
    }
if (!this.user.entites) {
   const entiteId = [];
    this.user.entites.forEach(entite => {
      entiteId.push(entite.id);
    });
    this.user.entites = entiteId;
}

    this.userSrv.clone(this.original, this.user)
      .subscribe((data: any) => {
        this.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.userSrv.httpSrv.handleError(error);
      });
  }
  onRemove(e: any) {
    this.entites.push(e.value);
    this.entites = this.entites.slice(0);
  }


}
