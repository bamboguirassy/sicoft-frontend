
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
  selectedEntite: Entite[] = [];

  constructor(public userSrv: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
    this.groups = this.activatedRoute.snapshot.data['groups'];
    this.entites = this.activatedRoute.snapshot.data['entites'];
    const filteredEntite: Entite[] = [];
    this.entites.forEach(entite => {
      let founded = false;
      this.user.entites.forEach(addedEntite => {
        if (entite.id === addedEntite.id) {
          founded = true;
        }
      })
      if (!founded) {
        filteredEntite.push(entite);
      }
    })
    this.entites = filteredEntite;
  }

  updateUser() {
    const tempUser = new User();
    Object.assign(tempUser, this.user);
    if (this.user.groups) {
      this.user.groups = this.user.groups.map(group => group.id);
    }
    if (this.user.entites) {
      this.user.entites = this.user.entites.map(entite => entite.id);
    }
    this.userSrv.update(this.user)
      .subscribe(data => this.location.back(),
        error => {
          this.user = tempUser;
          window.scrollTo(0, 0);
          this.userSrv.httpSrv.handleError(error);
        });
  }

  onRemove(e: any) {
    this.entites.push(e.value);
    this.entites = this.entites.slice(0);
  }

}
