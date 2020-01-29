import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { FournisseurService } from '../fournisseur.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Secteur } from 'app/parametrage/secteur/secteur';

@Component({
  selector: 'app-fournisseur-new',
  templateUrl: './fournisseur-new.component.html',
  styleUrls: ['./fournisseur-new.component.scss']
})
export class FournisseurNewComponent implements OnInit {
  fournisseur: Fournisseur;
  secteurs: Secteur[] = [];
  constructor(public fournisseurSrv: FournisseurService,
    public notificationSrv: NotificationService,
    public route: ActivatedRoute,
    public router: Router, public location: Location) {
    this.fournisseur = new Fournisseur();
  }

  ngOnInit() {
    this.secteurs = this.route.snapshot.data['secteurs'];
  }

  saveFournisseur() {
    const secteurid = [];
    this.fournisseur.secteurs.forEach(secteur => {
      secteurid.push(secteur.id);
      this.fournisseur.secteurs = secteurid;
    });
    this.fournisseurSrv.create(this.fournisseur)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Fournisseur créé avec succès');
        this.fournisseur = new Fournisseur();
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

  saveFournisseurAndExit() {
    const secteurid = [];
    this.fournisseur.secteurs.forEach(secteur => {
      secteurid.push(secteur.id);
      this.fournisseur.secteurs = secteurid;
    });
    this.fournisseurSrv.create(this.fournisseur)
      .subscribe((data: any) => {
        this.router.navigate([this.fournisseurSrv.getRoutePrefix(), data.id]);
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

}

