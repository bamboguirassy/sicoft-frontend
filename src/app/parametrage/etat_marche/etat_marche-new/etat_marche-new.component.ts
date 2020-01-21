import { Component, OnInit } from '@angular/core';
import { EtatMarche } from '../etat_marche';
import { EtatMarcheService } from '../etat_marche.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-etat_marche-new',
  templateUrl: './etat_marche-new.component.html',
  styleUrls: ['./etat_marche-new.component.scss']
})
export class EtatMarcheNewComponent implements OnInit {
  etat_marche: EtatMarche;
  constructor(public etat_marcheSrv: EtatMarcheService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.etat_marche = new EtatMarche();
  }

  ngOnInit() {
  }

  saveEtatMarche() {
    this.etat_marcheSrv.create(this.etat_marche)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('EtatMarche créé avec succès');
        this.etat_marche = new EtatMarche();
      }, error => this.etat_marcheSrv.httpSrv.handleError(error));
  }

  saveEtatMarcheAndExit() {
    this.etat_marcheSrv.create(this.etat_marche)
      .subscribe((data: any) => {
        this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), data.id]);
      }, error => this.etat_marcheSrv.httpSrv.handleError(error));
  }

}

