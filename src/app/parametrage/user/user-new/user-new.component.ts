import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  user: User;
  constructor(public userSrv: UserService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.user = new User();
  }

  ngOnInit() {
  }

  saveUser() {
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('User créé avec succès');
        this.user = new User();
      }, error => this.userSrv.httpSrv.handleError(error));
  }

  saveUserAndExit() {
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
      }, error => this.userSrv.httpSrv.handleError(error));
  }

}

