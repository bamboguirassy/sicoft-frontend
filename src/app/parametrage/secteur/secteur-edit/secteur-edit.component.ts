
import { Component, OnInit } from '@angular/core';
import { SecteurService } from '../secteur.service';
import { Secteur } from '../secteur';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-secteur-edit',
  templateUrl: './secteur-edit.component.html',
  styleUrls: ['./secteur-edit.component.scss']
})
export class SecteurEditComponent implements OnInit {

  secteur: Secteur;
  secteurs: any;

  constructor(public secteurSrv: SecteurService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.secteur = this.activatedRoute.snapshot.data['secteur'];
    this.secteurs = this.activatedRoute.snapshot.data['secteurs'];
  }

  updateSecteur() {
    for (const item of this.secteurs) {
      if (item.code === this.secteur.code) {
        this.notificationSrv.showError(' Code du secteur exite déja');
        return;
      }
    }
    this.secteurSrv.update(this.secteur)
      .subscribe(data => this.location.back(),
        error => this.secteurSrv.httpSrv.handleError(error));
  }

}
