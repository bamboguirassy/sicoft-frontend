import { Component, OnInit } from '@angular/core';
import { EtatMarche } from '../etat_marche';
import { ActivatedRoute, Router } from '@angular/router';
import { EtatMarcheService } from '../etat_marche.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-etat_marche-show',
  templateUrl: './etat_marche-show.component.html',
  styleUrls: ['./etat_marche-show.component.scss']
})
export class EtatMarcheShowComponent implements OnInit {

  etat_marche: EtatMarche;
  constructor(public activatedRoute: ActivatedRoute,
    public etat_marcheSrv: EtatMarcheService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.etat_marche = this.activatedRoute.snapshot.data['etat_marche'];
  }

  removeEtatMarche() {
    this.etat_marcheSrv.remove(this.etat_marche)
      .subscribe(data => this.router.navigate([this.etat_marcheSrv.getRoutePrefix()]),
        error =>  this.etat_marcheSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.etat_marcheSrv.findOneById(this.etat_marche.id)
    .subscribe((data:any)=>this.etat_marche=data,
      error=>this.etat_marcheSrv.httpSrv.handleError(error));
  }

}

