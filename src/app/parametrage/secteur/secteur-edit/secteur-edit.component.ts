
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
  constructor(public secteurSrv: SecteurService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.secteur = this.activatedRoute.snapshot.data['secteur'];
  }

  updateSecteur() {
    this.secteurSrv.update(this.secteur)
      .subscribe(data => this.location.back(),
        error => this.secteurSrv.httpSrv.handleError(error));
  }

}
