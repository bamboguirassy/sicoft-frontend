import { MenuItem } from 'primeng/api';

import { Component, OnInit } from '@angular/core';
import { EtatMarcheService } from '../etat_marche.service';
import { EtatMarche } from '../etat_marche';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { TypePassation } from 'app/parametrage/type_passation/type_passation';
import { timingSafeEqual } from 'crypto';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-etat_marche-edit',
  templateUrl: './etat_marche-edit.component.html',
  styleUrls: ['./etat_marche-edit.component.scss']
})
export class EtatMarcheEditComponent implements OnInit {

  etat_marche: EtatMarche;
  etats: EtatMarche[];
  typePassations: TypePassation[] = [];
  typePassation: TypePassation;

  constructor(public etat_marcheSrv: EtatMarcheService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.typePassations = this.activatedRoute.snapshot.data['typePassations'];
    this.etat_marche = this.activatedRoute.snapshot.data['etat_marche'];
    this.etats = this.activatedRoute.snapshot.data['etats'];
    //this.etats = this.etats.filter(etat => etat.id !== this.etat_marche.id);
    this.getEtatMarcheByTypePassation(this.etat_marche.typePassation);
  }

  updateEtatMarche() {
    let etatSuivantTemp = null;
    if (this.etat_marche.etatSuivant) {
      etatSuivantTemp = this.etat_marche.etatSuivant;
      this.etat_marche.etatSuivant = this.etat_marche.etatSuivant.id;
    }
    let tempTypePassation = null;
    if(this.etat_marche.typePassation){
      tempTypePassation = this.etat_marche.typePassation;
      this.etat_marche.typePassation = this.etat_marche.typePassation.id;
    }
    this.etat_marcheSrv.update(this.etat_marche)
      .subscribe(data => this.location.back(),
        error => {
          this.etat_marche.etatSuivant = etatSuivantTemp;
          this.etat_marche.typePassation = tempTypePassation;
          this.etat_marcheSrv.httpSrv.handleError(error);
        });
  }

  getEtatMarcheByTypePassation(event){
    if(event == null){
      this.etat_marcheSrv.findAll()
      .subscribe((data: any) => this.etats = data, error => this.etat_marcheSrv.httpSrv.handleError(error));
    } else{
      let tempTypePassation = null;
    this.typePassation = event;
    tempTypePassation = this.typePassation;
    
    this.etat_marcheSrv.getEtatMarcheByTypePassation(this.typePassation.id)
    .subscribe((data:any) => 
    {
      this.etats = data;
    }), error => {
      this.typePassation = tempTypePassation;
      this.etat_marcheSrv.httpSrv.handleError(error)};
  }
}

}
