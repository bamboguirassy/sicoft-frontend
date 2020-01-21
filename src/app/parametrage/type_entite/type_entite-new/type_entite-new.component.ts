import { Component, OnInit } from '@angular/core';
import { TypeEntite } from '../type_entite';
import { TypeEntiteService } from '../type_entite.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-type_entite-new',
  templateUrl: './type_entite-new.component.html',
  styleUrls: ['./type_entite-new.component.scss']
})
export class TypeEntiteNewComponent implements OnInit {
  type_entite: TypeEntite;
  constructor(public type_entiteSrv: TypeEntiteService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.type_entite = new TypeEntite();
  }

  ngOnInit() {
  }

  saveTypeEntite() {
    this.type_entiteSrv.create(this.type_entite)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('TypeEntite créé avec succès');
        this.type_entite = new TypeEntite();
      }, error => this.type_entiteSrv.httpSrv.handleError(error));
  }

  saveTypeEntiteAndExit() {
    this.type_entiteSrv.create(this.type_entite)
      .subscribe((data: any) => {
        this.router.navigate([this.type_entiteSrv.getRoutePrefix(), data.id]);
      }, error => this.type_entiteSrv.httpSrv.handleError(error));
  }

}

