import { Component, OnInit } from '@angular/core';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { EntiteService } from '../entite.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-entite-show',
  templateUrl: './entite-show.component.html',
  styleUrls: ['./entite-show.component.scss']
})
export class EntiteShowComponent implements OnInit {

  entite: Entite;
  constructor(public activatedRoute: ActivatedRoute,
    public entiteSrv: EntiteService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.entite = this.activatedRoute.snapshot.data['entite'];
  }

  removeEntite() {
    this.entiteSrv.remove(this.entite)
      .subscribe(data => this.router.navigate([this.entiteSrv.getRoutePrefix()]),
        error =>  this.entiteSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.entiteSrv.findOneById(this.entite.id)
    .subscribe((data:any)=>this.entite=data,
      error=>this.entiteSrv.httpSrv.handleError(error));
  }

}

