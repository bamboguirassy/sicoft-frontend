import { Component, OnInit } from '@angular/core';
import { TypeEntite } from '../type_entite';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEntiteService } from '../type_entite.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_entite-show',
  templateUrl: './type_entite-show.component.html',
  styleUrls: ['./type_entite-show.component.scss']
})
export class TypeEntiteShowComponent implements OnInit {

  type_entite: TypeEntite;
  constructor(public activatedRoute: ActivatedRoute,
    public type_entiteSrv: TypeEntiteService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_entite = this.activatedRoute.snapshot.data['type_entite'];
  }

  removeTypeEntite() {
    this.type_entiteSrv.remove(this.type_entite)
      .subscribe(data => this.router.navigate([this.type_entiteSrv.getRoutePrefix()]),
        error =>  this.type_entiteSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.type_entiteSrv.findOneById(this.type_entite.id)
    .subscribe((data:any)=>this.type_entite=data,
      error=>this.type_entiteSrv.httpSrv.handleError(error));
  }

}

