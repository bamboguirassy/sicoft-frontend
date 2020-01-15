
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { AccessGroup } from '../access-group.model';
import { AccessModel } from '../access.model';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

  group: Group;
  accessGroups: AccessGroup[] = [];

  constructor(public groupSrv: GroupService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.group = this.activatedRoute.snapshot.data['group'];
    this.accessGroups=this.group.roles;
  }

  updateGroup() {
    this.group.roles = this.accessGroups;
    this.groupSrv.update(this.group)
      .subscribe(data => this.location.back(),
        error => this.groupSrv.httpSrv.handleError(error));
  }

  handleGroupSelection($event, accessGroup: AccessGroup) {
    accessGroup.accessModels.forEach(accessModel => {
      accessModel.isCloneAllowed = $event.target.checked;
      accessModel.isCreateAllowed = $event.target.checked;
      accessModel.isDeleteAllowed = $event.target.checked;
      accessModel.isEditAllowed = $event.target.checked;
      accessModel.isIndexAllowed = $event.target.checked;
      accessModel.isShowAllowed = $event.target.checked;
      //local attributes
      accessModel.checkAll = $event.target.checked;
    });
  }

  handleAccessSelection($event, accessModel: AccessModel) {
    accessModel.isCloneAllowed = $event.target.checked;
    accessModel.isCreateAllowed = $event.target.checked;
    accessModel.isDeleteAllowed = $event.target.checked;
    accessModel.isEditAllowed = $event.target.checked;
    accessModel.isIndexAllowed = $event.target.checked;
    accessModel.isShowAllowed = $event.target.checked;
  }

}
