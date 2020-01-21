
import { Component, OnInit } from '@angular/core';
import { TypeEntiteService } from '../type_entite.service';
import { TypeEntite } from '../type_entite';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_entite-edit',
  templateUrl: './type_entite-edit.component.html',
  styleUrls: ['./type_entite-edit.component.scss']
})
export class TypeEntiteEditComponent implements OnInit {

  type_entite: TypeEntite;
  constructor(public type_entiteSrv: TypeEntiteService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_entite = this.activatedRoute.snapshot.data['type_entite'];
  }

  updateTypeEntite() {
    this.type_entiteSrv.update(this.type_entite)
      .subscribe(data => this.location.back(),
        error => this.type_entiteSrv.httpSrv.handleError(error));
  }

}
