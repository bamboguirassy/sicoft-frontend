
import { Component, OnInit } from '@angular/core';
import { EtatMarcheService } from '../etat_marche.service';
import { EtatMarche } from '../etat_marche';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-etat_marche-edit',
  templateUrl: './etat_marche-edit.component.html',
  styleUrls: ['./etat_marche-edit.component.scss']
})
export class EtatMarcheEditComponent implements OnInit {

  etat_marche: EtatMarche;
  constructor(public etat_marcheSrv: EtatMarcheService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.etat_marche = this.activatedRoute.snapshot.data['etat_marche'];
  }

  updateEtatMarche() {
    this.etat_marcheSrv.update(this.etat_marche)
      .subscribe(data => this.location.back(),
        error => this.etat_marcheSrv.httpSrv.handleError(error));
  }

}
