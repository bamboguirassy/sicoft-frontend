
import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../fournisseur.service';
import { Location } from '@angular/common';
import { Fournisseur } from '../fournisseur';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur-clone',
  templateUrl: './fournisseur-clone.component.html',
  styleUrls: ['./fournisseur-clone.component.scss']
})
export class FournisseurCloneComponent implements OnInit {
  fournisseur: Fournisseur;
  original: Fournisseur;
  constructor(public fournisseurSrv: FournisseurService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['fournisseur'];
    this.fournisseur = Object.assign({}, this.original);
    this.fournisseur.id = null;
  }

  cloneFournisseur() {
    this.fournisseurSrv.clone(this.original, this.fournisseur)
      .subscribe((data: any) => {
        this.router.navigate([this.fournisseurSrv.getRoutePrefix(), data.id]);
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

}
