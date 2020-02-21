
import { Component, OnInit } from '@angular/core';
import { EtatMarcheService } from '../etat_marche.service';
import { Location } from '@angular/common';
import { EtatMarche } from '../etat_marche';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePassation } from 'app/parametrage/type_passation/type_passation';

@Component({
  selector: 'app-etat_marche-clone',
  templateUrl: './etat_marche-clone.component.html',
  styleUrls: ['./etat_marche-clone.component.scss']
})
export class EtatMarcheCloneComponent implements OnInit {
  etat_marche: EtatMarche;
  original: EtatMarche;
  etats: EtatMarche[];
  typePassations: TypePassation[] = [];
  constructor(public etat_marcheSrv: EtatMarcheService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['etat_marche'];
    this.etat_marche = Object.assign({}, this.original);
    this.etat_marche.id = null;
    this.etats = this.activatedRoute.snapshot.data['etats'];
  }

  cloneEtatMarche() {
    this.typePassations = this.activatedRoute.snapshot.data['typePassations'];
    let etatSuivTemp = null;
    let tempTypePassation = null;
    if (this.etat_marche.etatSuivant) {
      etatSuivTemp = this.etat_marche.etatSuivant;
      this.etat_marche.etatSuivant = this.etat_marche.etatSuivant.id;
    }
    if(this.etat_marche.typePassation){
      tempTypePassation = this.etat_marche.typePassation;
      this.etat_marche.typePassation = this.etat_marche.typePassation.id;
    }
    this.etat_marcheSrv.clone(this.original, this.etat_marche)
      .subscribe((data: any) => {
        this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.etat_marche.typePassation = tempTypePassation;
        if (etatSuivTemp) {
          this.etat_marche.etatSuivant = etatSuivTemp;
        }
        this.etat_marcheSrv.httpSrv.handleError(error);
      });
  }

}
