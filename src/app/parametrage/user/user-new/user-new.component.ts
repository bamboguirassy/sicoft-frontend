import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from 'app/parametrage/group/group';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  user: User;
  groups: Group[] = [];
  constructor(public userSrv: UserService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location,
    public activatedRoute: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit() {
    this.groups = this.activatedRoute.snapshot.data['groups'];
  }

  saveUser() {
    let groupIds = [];
    this.user.groups.forEach(group => {
      groupIds.push(group.id);
    });
    this.user.groups = groupIds;
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('User créé avec succès');
        this.user = new User();
      }, error => this.userSrv.httpSrv.handleError(error));
  }

  saveUserAndExit() {
    let groupIds = [];
    this.user.groups.forEach(group => {
      groupIds.push(group.id);
    });
    this.user.groups = groupIds;
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
      }, error => this.userSrv.httpSrv.handleError(error));
  }

}

