
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessGroup } from '../access-group.model';
import { AccessModel } from '../access.model';

@Component({
  selector: 'app-group-clone',
  templateUrl: './group-clone.component.html',
  styleUrls: ['./group-clone.component.scss']
})
export class GroupCloneComponent implements OnInit {
  group: Group;
  original: Group;
  accessGroups: AccessGroup[] = [];
  constructor(public groupSrv: GroupService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['group'];
    this.accessGroups=this.original.roles;
    this.group = Object.assign({}, this.original);
    this.group.id = null;
  }

  cloneGroup() {
    this.group.roles = this.accessGroups;
    this.groupSrv.clone(this.original, this.group)
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
