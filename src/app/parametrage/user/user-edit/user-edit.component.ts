
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { Group } from 'app/parametrage/group/group';
import { Entite } from 'app/parametrage/entite/entite';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  groups: Group[] = [];
  entites: Entite[] = [];

  constructor(public userSrv: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
    this.groups = this.activatedRoute.snapshot.data['groups'];
    this.entites = this.activatedRoute.snapshot.data['entites'];
  }

  updateUser() {
    const groupIds = [];
    this.user.groups.forEach(group => {
      groupIds.push(group.id);
    });
    this.user.groups = groupIds;
    let entiteId = [];
    this.user.entites.forEach(entite => {
      entiteId.push(entite.id);
    });
    this.user.entites = entiteId;
    this.userSrv.update(this.user)
      .subscribe(data => this.location.back(),
        error => this.userSrv.httpSrv.handleError(error));
  }

}
