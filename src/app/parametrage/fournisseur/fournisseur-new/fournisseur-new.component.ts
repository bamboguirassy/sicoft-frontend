import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { FournisseurService } from '../fournisseur.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fournisseur-new',
  templateUrl: './fournisseur-new.component.html',
  styleUrls: ['./fournisseur-new.component.scss']
})
export class FournisseurNewComponent implements OnInit {
  fournisseur: Fournisseur;
  constructor(public fournisseurSrv: FournisseurService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.fournisseur = new Fournisseur();
  }

  ngOnInit() {
  }

  saveFournisseur() {
    this.fournisseurSrv.create(this.fournisseur)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Fournisseur créé avec succès');
        this.fournisseur = new Fournisseur();
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

  saveFournisseurAndExit() {
    this.fournisseurSrv.create(this.fournisseur)
      .subscribe((data: any) => {
        this.router.navigate([this.fournisseurSrv.getRoutePrefix(), data.id]);
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

}

