
import { Component, OnInit } from '@angular/core';
import { TypeSourceFinancementService } from '../type_source_financement.service';
import { Location } from '@angular/common';
import { TypeSourceFinancement } from '../type_source_financement';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type_source_financement-clone',
  templateUrl: './type_source_financement-clone.component.html',
  styleUrls: ['./type_source_financement-clone.component.scss']
})
export class TypeSourceFinancementCloneComponent implements OnInit {
  type_source_financement: TypeSourceFinancement;
  original: TypeSourceFinancement;
  constructor(public type_source_financementSrv: TypeSourceFinancementService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['type_source_financement'];
    this.type_source_financement = Object.assign({}, this.original);
    this.type_source_financement.id = null;
  }

  cloneTypeSourceFinancement() {
    this.type_source_financementSrv.clone(this.original, this.type_source_financement)
      .subscribe((data: any) => {
        this.router.navigate([this.type_source_financementSrv.getRoutePrefix(), data.id]);
      }, error => this.type_source_financementSrv.httpSrv.handleError(error));
  }

}
