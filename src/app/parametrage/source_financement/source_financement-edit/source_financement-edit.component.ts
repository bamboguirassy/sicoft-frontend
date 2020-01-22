
import { Component, OnInit } from '@angular/core';
import { SourceFinancementService } from '../source_financement.service';
import { SourceFinancement } from '../source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import {TypeSourceFinancement} from '../../type_source_financement/type_source_financement';

@Component({
  selector: 'app-source-financement-edit',
  templateUrl: './source_financement-edit.component.html',
  styleUrls: ['./source_financement-edit.component.scss']
})
export class SourceFinancementEditComponent implements OnInit {

  source_financement: SourceFinancement;
  types: TypeSourceFinancement[];
  constructor(public source_financementSrv: SourceFinancementService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.source_financement = this.activatedRoute.snapshot.data['source_financement'];
    this.types = this.activatedRoute.snapshot.data['types'];
    console.log(this.types);
  }

  updateSourceFinancement() {
    this.source_financement.type = this.source_financement.type.id;
    this.source_financementSrv.update(this.source_financement)
      .subscribe(data => this.location.back(),
        error => this.source_financementSrv.httpSrv.handleError(error));
  }

}
