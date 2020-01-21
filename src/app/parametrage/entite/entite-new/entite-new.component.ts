import { Component, OnInit } from '@angular/core';
import { Entite } from '../entite';
import { EntiteService } from '../entite.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entite-new',
  templateUrl: './entite-new.component.html',
  styleUrls: ['./entite-new.component.scss']
})
export class EntiteNewComponent implements OnInit {
  entite: Entite;
  constructor(public entiteSrv: EntiteService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.entite = new Entite();
  }

  ngOnInit() {
  }

  saveEntite() {
    this.entiteSrv.create(this.entite)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Entite créé avec succès');
        this.entite = new Entite();
      }, error => this.entiteSrv.httpSrv.handleError(error));
  }

  saveEntiteAndExit() {
    this.entiteSrv.create(this.entite)
      .subscribe((data: any) => {
        this.router.navigate([this.entiteSrv.getRoutePrefix(), data.id]);
      }, error => this.entiteSrv.httpSrv.handleError(error));
  }

}

