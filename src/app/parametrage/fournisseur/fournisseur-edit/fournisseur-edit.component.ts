
import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../fournisseur';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-fournisseur-edit',
  templateUrl: './fournisseur-edit.component.html',
  styleUrls: ['./fournisseur-edit.component.scss']
})
export class FournisseurEditComponent implements OnInit {

  fournisseur: Fournisseur;
  constructor(public fournisseurSrv: FournisseurService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.fournisseur = this.activatedRoute.snapshot.data['fournisseur'];
  }

  updateFournisseur() {
    this.fournisseurSrv.update(this.fournisseur)
      .subscribe(data => this.location.back(),
        error => this.fournisseurSrv.httpSrv.handleError(error));
  }

}
