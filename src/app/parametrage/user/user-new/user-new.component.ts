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
    let groupIds = [];
    this.user.groups.forEach(group => {
      groupIds.push(group.id);
    });
    this.user.groups = groupIds;
// recupérationd des entité dans user
    let entiteId = [];
    this.user.entites.forEach(entite => {
      entiteId.push(entite.id);
    });
    this.user.entites = entiteId;
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

    let entiteId = [];
    this.user.entites.forEach(entite => {
      entiteId.push(entite.id);
    });
    this.user.entites = entiteId;
    this.userSrv.create(this.user)
      .subscribe((data: any) => {
        this.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
      }, error => this.userSrv.httpSrv.handleError(error));
  }

}
