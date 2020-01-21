import { Component, OnInit } from '@angular/core';
import { TypeSourceFinancement } from '../type_source_financement';
import { TypeSourceFinancementService } from '../type_source_financement.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-type_source_financement-new',
  templateUrl: './type_source_financement-new.component.html',
  styleUrls: ['./type_source_financement-new.component.scss']
})
export class TypeSourceFinancementNewComponent implements OnInit {
  type_source_financement: TypeSourceFinancement;
  constructor(public type_source_financementSrv: TypeSourceFinancementService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.type_source_financement = new TypeSourceFinancement();
  }

  ngOnInit() {
  }

  saveTypeSourceFinancement() {
    this.type_source_financementSrv.create(this.type_source_financement)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('TypeSourceFinancement créé avec succès');
        this.type_source_financement = new TypeSourceFinancement();
      }, error => this.type_source_financementSrv.httpSrv.handleError(error));
  }

  saveTypeSourceFinancementAndExit() {
    this.type_source_financementSrv.create(this.type_source_financement)
      .subscribe((data: any) => {
        this.router.navigate([this.type_source_financementSrv.getRoutePrefix(), data.id]);
      }, error => this.type_source_financementSrv.httpSrv.handleError(error));
  }

}

