import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {

  user: User;
  constructor(public activatedRoute: ActivatedRoute,
    public userSrv: UserService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  removeUser() {
    this.userSrv.remove(this.user)
      .subscribe(data => this.router.navigate([this.userSrv.getRoutePrefix()]),
        error =>  this.userSrv.httpSrv.handleError(error));
  }
  refresh() {
    this.userSrv.findOneById(this.user.id)
    .subscribe((data: any) => this.user = data,
      error => this.userSrv.httpSrv.handleError(error));
  }

}

