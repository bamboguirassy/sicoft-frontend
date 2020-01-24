import { Component, OnInit } from '@angular/core';
import { Secteur } from '../secteur';
import { SecteurService } from '../secteur.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Component({
  selector: 'app-secteur-new',
  templateUrl: './secteur-new.component.html',
  styleUrls: ['./secteur-new.component.scss']
})
export class SecteurNewComponent implements OnInit {
  secteur: Secteur;
  secteurs: any;
  teste: Boolean;

  constructor(
    public secteurSrv: SecteurService,
    public notificationSrv: NotificationService,
    public router: Router,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {
    this.secteur = new Secteur();
  }

  ngOnInit() {
    this.secteurs = this.activatedRoute.snapshot.data['secteurs'];
  }

  UniqueSelectionDispatcher() {
    this.teste = false;
    for (const item of this.secteurs) {
      if (item.code === this.secteur.code) {
        this.notificationSrv.showError(' Code du secteur exite déja');
       this.teste = true ;
        return;
      }
    }
  }
  saveSecteur() {
    this.UniqueSelectionDispatcher();
    if (this.teste) {
      return;
    }
    this.secteurSrv.create(this.secteur).subscribe(
      (data: any) => {
        this.notificationSrv.showInfo('Secteur créé avec succès');
        this.secteur = new Secteur();
      },
      error => this.secteurSrv.httpSrv.handleError(error)
    );
  }

  saveSecteurAndExit() {
    this.UniqueSelectionDispatcher();
    if (this.teste) {
      return;
    }
    this.secteurSrv.create(this.secteur).subscribe(
      (data: any) => {
        this.router.navigate([this.secteurSrv.getRoutePrefix(), data.id]);
      },
      error => this.secteurSrv.httpSrv.handleError(error)
    );
  }
}
