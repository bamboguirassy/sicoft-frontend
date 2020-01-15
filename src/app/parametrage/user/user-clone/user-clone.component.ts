
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/parametrage/group/group';

@Component({
  selector: 'app-user-clone',
  templateUrl: './user-clone.component.html',
  styleUrls: ['./user-clone.component.scss']
})
export class UserCloneComponent implements OnInit {
  user: User;
  original: User;
  groups: Group[] = [];
  constructor(public userSrv: UserService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['user'];
    this.groups = this.activatedRoute.snapshot.data['groups'];
    this.user = Object.assign({}, this.original);
    this.user.id = null;
  }

  cloneUser() {
    let groupIds = [];
    this.user.groups.forEach(group => {
      groupIds.push(group.id);
    });
    this.user.groups = groupIds;
    this.userSrv.clone(this.original, this.user)
      .subscribe((data: any) => {
        this.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.userSrv.httpSrv.handleError(error);
      });
  }

}
