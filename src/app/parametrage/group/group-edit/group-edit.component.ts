
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

  group: Group;
  constructor(public groupSrv: GroupService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.group = this.activatedRoute.snapshot.data['group'];
  }

  updateGroup() {
    this.groupSrv.update(this.group)
      .subscribe(data => this.location.back(),
        error => this.groupSrv.httpSrv.handleError(error));
  }

}
