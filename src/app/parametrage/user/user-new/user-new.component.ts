import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from 'app/parametrage/group/group';
import { Entite } from 'app/parametrage/entite/entite';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  user: User;
  groups: Group[] = [];
  entites: Entite[] = [];
  constructor(public userSrv: UserService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location,
    public activatedRoute: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit() {
    this.groups = this.activatedRoute.snapshot.data['groups'];
    this.entites = this.activatedRoute.snapshot.data['entites'];


  }

  saveUser() {
    const tempUser = new User();
    Object.assign(tempUser, this.user);
    if (this.user.groups) {
      this.user.groups = this.user.groups.map(group => group.id);
    }
    if (this.user.entites) {
      this.user.entites = this.user.entites.map(entite => entite.id);
    }
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('User créé avec succès');
        this.user = new User();
      }, error => {
        this.user = tempUser;
        this.userSrv.httpSrv.handleError(error)
      });
  }

  saveUserAndExit() {
    const tempUser = new User();
    Object.assign(tempUser, this.user);
    if (this.user.groups) {
      this.user.groups = this.user.groups.map(group => group.id);
    }
    if (this.user.entites) {
      this.user.entites = this.user.entites.map(entite => entite.id);
    }
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.user = tempUser;
        this.userSrv.httpSrv.handleError(error)
      });
  }

}
