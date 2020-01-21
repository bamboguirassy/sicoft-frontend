
import { Component, OnInit } from '@angular/core';
import { EntiteService } from '../entite.service';
import { Location } from '@angular/common';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entite-clone',
  templateUrl: './entite-clone.component.html',
  styleUrls: ['./entite-clone.component.scss']
})
export class EntiteCloneComponent implements OnInit {
  entite: Entite;
  original: Entite;
  constructor(public entiteSrv: EntiteService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['entite'];
    this.entite = Object.assign({}, this.original);
    this.entite.id = null;
  }

  cloneEntite() {
    this.entiteSrv.clone(this.original, this.entite)
      .subscribe((data: any) => {
        this.router.navigate([this.entiteSrv.getRoutePrefix(), data.id]);
      }, error => this.entiteSrv.httpSrv.handleError(error));
  }

}
