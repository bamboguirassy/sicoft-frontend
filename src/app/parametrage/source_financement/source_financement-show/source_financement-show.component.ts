import { Component, OnInit } from '@angular/core';
import { SourceFinancement } from '../source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceFinancementService } from '../source_financement.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-source_financement-show',
  templateUrl: './source_financement-show.component.html',
  styleUrls: ['./source_financement-show.component.scss']
})
export class SourceFinancementShowComponent implements OnInit {

  source_financement: SourceFinancement;
  constructor(public activatedRoute: ActivatedRoute,
    public source_financementSrv: SourceFinancementService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.source_financement = this.activatedRoute.snapshot.data['source_financement'];
  }

  removeSourceFinancement() {
    this.source_financementSrv.remove(this.source_financement)
      .subscribe(data => this.router.navigate([this.source_financementSrv.getRoutePrefix()]),
        error =>  this.source_financementSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.source_financementSrv.findOneById(this.source_financement.id)
    .subscribe((data:any)=>this.source_financement=data,
      error=>this.source_financementSrv.httpSrv.handleError(error));
  }

}

