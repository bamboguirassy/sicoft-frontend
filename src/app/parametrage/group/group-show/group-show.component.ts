import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-group-show',
  templateUrl: './group-show.component.html',
  styleUrls: ['./group-show.component.scss']
})
export class GroupShowComponent implements OnInit {

  group: Group;
  constructor(public activatedRoute: ActivatedRoute,
    public groupSrv: GroupService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.group = this.activatedRoute.snapshot.data['group'];
  }

  removeGroup() {
    this.groupSrv.remove(this.group)
      .subscribe(data => this.router.navigate([this.groupSrv.getRoutePrefix()]),
        error =>  this.groupSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.groupSrv.findOneById(this.group.id)
    .subscribe((data:any)=>this.group=data,
      error=>this.groupSrv.httpSrv.handleError(error));
  }

}

