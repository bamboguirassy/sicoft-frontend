
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EntiteService } from '../entite.service';
import { Location } from '@angular/common';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';

@Component({
  selector: 'app-entite-clone',
  templateUrl: './entite-clone.component.html',
  styleUrls: ['./entite-clone.component.scss']
})
export class EntiteCloneComponent implements OnInit {
  entite: Entite;
  original: Entite;
  entites: Entite[] = [];
  typeEntites: TypeEntite[] = [];
  constructor(public entiteSrv: EntiteService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['entite'];
    this.entite = Object.assign({}, this.original);
    this.entite.id = null;
    this.entites = this.activatedRoute.snapshot.data['entites'];
    this.typeEntites = this.activatedRoute.snapshot.data['typeEntites'];
  }

  cloneEntite() {
    let tempTypeEntite = this.entite.typeEntite;
    this.entite.typeEntite = this.entite.typeEntite.id;
    let tempEntiteParent = null;
    if (this.entite.entiteParent) {
      tempEntiteParent = this.entite.entiteParent;
      this.entite.entiteParent = this.entite.entiteParent.id;
    }
    this.entiteSrv.clone(this.original, this.entite)
      .subscribe((data: any) => {
        this.router.navigate([this.entiteSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.entite.typeEntite = tempTypeEntite;
        if (tempEntiteParent) {
          this.entite.entiteParent = tempEntiteParent;
        }
        this.entiteSrv.httpSrv.handleError(error);
      });
  }

}
