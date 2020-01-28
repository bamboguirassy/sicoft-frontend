import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccessGroup } from '../access-group.model';
import { AccessModel } from '../access.model';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.scss']
})
export class GroupNewComponent implements OnInit {
  group: Group;
  accessGroups: AccessGroup[] = [];
  constructor(public groupSrv: GroupService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location,
    private activatedRoute: ActivatedRoute) {
    this.group = new Group();
  }

  ngOnInit() {
    this.accessGroups = this.activatedRoute.snapshot.data['tables'];
  }

  saveGroup() {
    this.group.roles = this.accessGroups;
    this.groupSrv.create(this.group)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Group créé avec succès');
        this.group = new Group();
      }, error => this.groupSrv.httpSrv.handleError(error));
  }

  saveGroupAndExit() {
    this.group.roles = this.accessGroups;
    this.groupSrv.create(this.group)
      .subscribe((data: any) => {
        this.router.navigate([this.groupSrv.getRoutePrefix(), data.id]);
      }, error => this.groupSrv.httpSrv.handleError(error));
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

