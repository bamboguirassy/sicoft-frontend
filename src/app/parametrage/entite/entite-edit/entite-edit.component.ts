
import { Component, OnInit } from '@angular/core';
import { EntiteService } from '../entite.service';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-entite-edit',
  templateUrl: './entite-edit.component.html',
  styleUrls: ['./entite-edit.component.scss']
})
export class EntiteEditComponent implements OnInit {

  entite: Entite;
  constructor(public entiteSrv: EntiteService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.entite = this.activatedRoute.snapshot.data['entite'];
  }

  updateEntite() {
    this.entiteSrv.update(this.entite)
      .subscribe(data => this.location.back(),
        error => this.entiteSrv.httpSrv.handleError(error));
  }

}
