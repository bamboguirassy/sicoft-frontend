import { Component, OnInit } from '@angular/core';
import { Secteur } from '../secteur';
import { SecteurService } from '../secteur.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-secteur-new',
  templateUrl: './secteur-new.component.html',
  styleUrls: ['./secteur-new.component.scss']
})
export class SecteurNewComponent implements OnInit {
  secteur: Secteur;
  constructor(public secteurSrv: SecteurService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.secteur = new Secteur();
  }

  ngOnInit() {
  }

  saveSecteur() {
    this.secteurSrv.create(this.secteur)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Secteur créé avec succès');
        this.secteur = new Secteur();
      }, error => this.secteurSrv.httpSrv.handleError(error));
  }

  saveSecteurAndExit() {
    this.secteurSrv.create(this.secteur)
      .subscribe((data: any) => {
        this.router.navigate([this.secteurSrv.getRoutePrefix(), data.id]);
      }, error => this.secteurSrv.httpSrv.handleError(error));
  }

}

