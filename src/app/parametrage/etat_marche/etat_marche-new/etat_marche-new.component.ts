import { Component, OnInit } from '@angular/core';
import { EtatMarche } from '../etat_marche';
import { EtatMarcheService } from '../etat_marche.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-etat_marche-new',
  templateUrl: './etat_marche-new.component.html',
  styleUrls: ['./etat_marche-new.component.scss']
})
export class EtatMarcheNewComponent implements OnInit {
  etat_marche: EtatMarche;
  etats: EtatMarche[];
  constructor(public etat_marcheSrv: EtatMarcheService,
    public notificationSrv: NotificationService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location) {
    this.etat_marche = new EtatMarche();
  }

  ngOnInit() {
    this.etats = this.activatedRoute.snapshot.data['etats'];
  }

  saveEtatMarche() {
    let etatMarcheSuivTemp: EtatMarche;
    if (this.etat_marche.etatSuivant) {
      etatMarcheSuivTemp = this.etat_marche.etatSuivant;
      this.etat_marche.etatSuivant = this.etat_marche.etatSuivant.id;
    }

    this.etat_marcheSrv.create(this.etat_marche)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('EtatMarche créé avec succès');
        //  this.etat_marche = new EtatMarche();
        this.etats.push(data);
        this.etats = this.etats.slice(0);
      }, error => {
        if (this.etat_marche.etatSuivant) {
          this.etat_marche.etatSuivant = etatMarcheSuivTemp;
        }
        this.etat_marcheSrv.httpSrv.handleError(error)
      });
  }

  saveEtatMarcheAndExit() {
    let etatSuivantTemp;
    if (this.etat_marche.etatSuivant) {
      etatSuivantTemp = this.etat_marche.etatSuivant;
      this.etat_marche.etatSuivant = this.etat_marche.etatSuivant.id;
    }

    this.etat_marcheSrv.create(this.etat_marche)
      .subscribe((data: any) => {
        this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), data.id]);
        this.etat_marche = new EtatMarche();
      }, error => {
        if (this.etat_marche.etatSuivant) {
          this.etat_marche.etatSuivant = etatSuivantTemp;
        }
        this.etat_marcheSrv.httpSrv.handleError(error);
      });
  }



}

