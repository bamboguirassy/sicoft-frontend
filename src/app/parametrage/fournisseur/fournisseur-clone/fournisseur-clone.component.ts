import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../fournisseur.service';
import { Location } from '@angular/common';
import { Fournisseur } from '../fournisseur';
import { ActivatedRoute, Router } from '@angular/router';
import { Secteur } from 'app/parametrage/secteur/secteur';

@Component({
  selector: 'app-fournisseur-clone',
  templateUrl: './fournisseur-clone.component.html',
  styleUrls: ['./fournisseur-clone.component.scss']
})
export class FournisseurCloneComponent implements OnInit {
  fournisseur: Fournisseur;
  original: Fournisseur;
  secteurs: Secteur[] = [];
  constructor(
    public fournisseurSrv: FournisseurService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['fournisseur'];
    this.secteurs = this.activatedRoute.snapshot.data['secteurs'];
    this.fournisseur = Object.assign({}, this.original);
    this.fournisseur.id = null;
  }

  cloneFournisseur() {
    const tempFournisseur = new Fournisseur();
    Object.assign(tempFournisseur, this.fournisseur);
    tempFournisseur.secteurs = tempFournisseur.secteurs.map(secteur => secteur.id);
    this.fournisseurSrv.clone(this.original, tempFournisseur).subscribe(
      (data: any) => {
        this.router.navigate([this.fournisseurSrv.getRoutePrefix(), data.id]);
      },
      error => this.fournisseurSrv.httpSrv.handleError(error)
    );
  }
}
