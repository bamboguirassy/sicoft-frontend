import { Component, OnInit } from '@angular/core';
import { TypePassation } from '../type_passation';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePassationService } from '../type_passation.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_passation-show',
  templateUrl: './type_passation-show.component.html',
  styleUrls: ['./type_passation-show.component.scss']
})
export class TypePassationShowComponent implements OnInit {

  type_passation: TypePassation;
  constructor(public activatedRoute: ActivatedRoute,
    public type_passationSrv: TypePassationService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_passation = this.activatedRoute.snapshot.data['type_passation'];
  }

  removeTypePassation() {
    this.type_passationSrv.remove(this.type_passation)
      .subscribe(data => this.router.navigate([this.type_passationSrv.getRoutePrefix()]),
        error =>  this.type_passationSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.type_passationSrv.findOneById(this.type_passation.id)
    .subscribe((data:any)=>this.type_passation=data,
      error=>this.type_passationSrv.httpSrv.handleError(error));
  }

}

