
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-clone',
  templateUrl: './group-clone.component.html',
  styleUrls: ['./group-clone.component.scss']
})
export class GroupCloneComponent implements OnInit {
  group: Group;
  original: Group;
  constructor(public groupSrv: GroupService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['group'];
    this.group = Object.assign({}, this.original);
    this.group.id = null;
  }

  cloneGroup() {
    console.log(this.group);
    this.groupSrv.clone(this.original, this.group)
      .subscribe((data: any) => {
        this.router.navigate([this.groupSrv.getRoutePrefix(), data.id]);
      }, error => this.groupSrv.httpSrv.handleError(error));
  }

}
