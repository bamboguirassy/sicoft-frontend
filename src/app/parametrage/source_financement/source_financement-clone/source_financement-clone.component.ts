
import { Component, OnInit } from '@angular/core';
import { SourceFinancementService } from '../source_financement.service';
import { Location } from '@angular/common';
import { SourceFinancement } from '../source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import {TypeSourceFinancement} from '../../type_source_financement/type_source_financement';

@Component({
  selector: 'app-source-financement-clone',
  templateUrl: './source_financement-clone.component.html',
  styleUrls: ['./source_financement-clone.component.scss']
})
export class SourceFinancementCloneComponent implements OnInit {
  source_financement: SourceFinancement;
  types: TypeSourceFinancement[];
  original: SourceFinancement;
  constructor(public source_financementSrv: SourceFinancementService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['source_financement'];
    this.source_financement = Object.assign({}, this.original);
    this.source_financement.id = null;
    this.types = this.activatedRoute.snapshot.data['types'];
  }

  cloneSourceFinancement() {
    this.source_financement.type = this.source_financement.type.id;
    this.source_financementSrv.clone(this.original, this.source_financement)
      .subscribe((data: any) => {
        this.router.navigate([this.source_financementSrv.getRoutePrefix(), data.id]);
      }, error => this.source_financementSrv.httpSrv.handleError(error));
  }

}
