import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../fournisseur.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-fournisseur-show',
  templateUrl: './fournisseur-show.component.html',
  styleUrls: ['./fournisseur-show.component.scss']
})
export class FournisseurShowComponent implements OnInit {

  fournisseur: Fournisseur;
  constructor(public activatedRoute: ActivatedRoute,
    public fournisseurSrv: FournisseurService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.fournisseur = this.activatedRoute.snapshot.data['fournisseur'];
  }

  removeFournisseur() {
    this.fournisseurSrv.remove(this.fournisseur)
      .subscribe(data => this.router.navigate([this.fournisseurSrv.getRoutePrefix()]),
        error =>  this.fournisseurSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.fournisseurSrv.findOneById(this.fournisseur.id)
    .subscribe((data:any)=>this.fournisseur=data,
      error=>this.fournisseurSrv.httpSrv.handleError(error));
  }

}

