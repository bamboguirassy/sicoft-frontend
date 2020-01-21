import { Component, OnInit } from '@angular/core';
import { TypeSourceFinancement } from '../type_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSourceFinancementService } from '../type_source_financement.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_source_financement-show',
  templateUrl: './type_source_financement-show.component.html',
  styleUrls: ['./type_source_financement-show.component.scss']
})
export class TypeSourceFinancementShowComponent implements OnInit {

  type_source_financement: TypeSourceFinancement;
  constructor(public activatedRoute: ActivatedRoute,
    public type_source_financementSrv: TypeSourceFinancementService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_source_financement = this.activatedRoute.snapshot.data['type_source_financement'];
  }

  removeTypeSourceFinancement() {
    this.type_source_financementSrv.remove(this.type_source_financement)
      .subscribe(data => this.router.navigate([this.type_source_financementSrv.getRoutePrefix()]),
        error =>  this.type_source_financementSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.type_source_financementSrv.findOneById(this.type_source_financement.id)
    .subscribe((data:any)=>this.type_source_financement=data,
      error=>this.type_source_financementSrv.httpSrv.handleError(error));
  }

}

