
import { Component, OnInit } from '@angular/core';
import { EtatMarcheService } from '../etat_marche.service';
import { Location } from '@angular/common';
import { EtatMarche } from '../etat_marche';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-etat_marche-clone',
  templateUrl: './etat_marche-clone.component.html',
  styleUrls: ['./etat_marche-clone.component.scss']
})
export class EtatMarcheCloneComponent implements OnInit {
  etat_marche: EtatMarche;
  original: EtatMarche;
  constructor(public etat_marcheSrv: EtatMarcheService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['etat_marche'];
    this.etat_marche = Object.assign({}, this.original);
    this.etat_marche.id = null;
  }

  cloneEtatMarche() {
    this.etat_marcheSrv.clone(this.original, this.etat_marche)
      .subscribe((data: any) => {
        this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), data.id]);
      }, error => this.etat_marcheSrv.httpSrv.handleError(error));
  }

}
