
import { Component, OnInit } from '@angular/core';
import { TypeSourceFinancementService } from '../type_source_financement.service';
import { TypeSourceFinancement } from '../type_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_source_financement-edit',
  templateUrl: './type_source_financement-edit.component.html',
  styleUrls: ['./type_source_financement-edit.component.scss']
})
export class TypeSourceFinancementEditComponent implements OnInit {

  type_source_financement: TypeSourceFinancement;
  constructor(public type_source_financementSrv: TypeSourceFinancementService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_source_financement = this.activatedRoute.snapshot.data['type_source_financement'];
  }

  updateTypeSourceFinancement() {
    this.type_source_financementSrv.update(this.type_source_financement)
      .subscribe(data => this.location.back(),
        error => this.type_source_financementSrv.httpSrv.handleError(error));
  }

}
