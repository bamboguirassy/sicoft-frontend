import { Secteur } from './../../secteur/secteur';

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
  secteurs: Secteur[] = [];
  selectedSecteur: Secteur[] = [];
  constructor(public fournisseurSrv: FournisseurService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.fournisseur = this.activatedRoute.snapshot.data['fournisseur'];
    this.secteurs = this.route.snapshot.data['secteurs'];
    const filteredSecteur: Secteur[] = [];
    this.secteurs.forEach(secteur => {
      let founded = false;
      this.fournisseur.secteurs.forEach(addedSecteur => {
        if (secteur.id === addedSecteur.id) {
          founded = true;
        }
      })
      if (!founded) {
        filteredSecteur.push(secteur);
      }
    })
    this.secteurs = filteredSecteur;
  }

  updateFournisseur() {
    this.selectedSecteur.forEach(selectedSecteur => {
      this.fournisseur.secteurs.push(selectedSecteur);
    })
    const tempFournisseur = new Fournisseur();
    Object.assign(tempFournisseur, this.fournisseur)
    if (this.fournisseur.secteurs) {
      tempFournisseur.secteurs = tempFournisseur.secteurs.map(secteur => secteur.id);
    }

    this.fournisseurSrv.update(tempFournisseur)
      .subscribe(data => this.location.back(),
        error => this.fournisseurSrv.httpSrv.handleError(error));
  }

  onRemove(e: any) {
    this.secteurs.push(e.value);
    this.secteurs = this.secteurs.slice(0);
  }

}
