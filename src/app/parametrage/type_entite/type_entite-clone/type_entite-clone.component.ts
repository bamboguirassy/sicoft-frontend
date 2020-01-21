
import { Component, OnInit } from '@angular/core';
import { TypeEntiteService } from '../type_entite.service';
import { Location } from '@angular/common';
import { TypeEntite } from '../type_entite';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type_entite-clone',
  templateUrl: './type_entite-clone.component.html',
  styleUrls: ['./type_entite-clone.component.scss']
})
export class TypeEntiteCloneComponent implements OnInit {
  type_entite: TypeEntite;
  original: TypeEntite;
  constructor(public type_entiteSrv: TypeEntiteService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['type_entite'];
    this.type_entite = Object.assign({}, this.original);
    this.type_entite.id = null;
  }

  cloneTypeEntite() {
    this.type_entiteSrv.clone(this.original, this.type_entite)
      .subscribe((data: any) => {
        this.router.navigate([this.type_entiteSrv.getRoutePrefix(), data.id]);
      }, error => this.type_entiteSrv.httpSrv.handleError(error));
  }

}
