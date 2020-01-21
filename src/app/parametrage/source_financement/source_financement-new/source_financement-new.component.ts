import { Component, OnInit } from '@angular/core';
import { SourceFinancement } from '../source_financement';
import { SourceFinancementService } from '../source_financement.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-source_financement-new',
  templateUrl: './source_financement-new.component.html',
  styleUrls: ['./source_financement-new.component.scss']
})
export class SourceFinancementNewComponent implements OnInit {
  source_financement: SourceFinancement;
  constructor(public source_financementSrv: SourceFinancementService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.source_financement = new SourceFinancement();
  }

  ngOnInit() {
  }

  saveSourceFinancement() {
    this.source_financementSrv.create(this.source_financement)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('SourceFinancement créé avec succès');
        this.source_financement = new SourceFinancement();
      }, error => this.source_financementSrv.httpSrv.handleError(error));
  }

  saveSourceFinancementAndExit() {
    this.source_financementSrv.create(this.source_financement)
      .subscribe((data: any) => {
        this.router.navigate([this.source_financementSrv.getRoutePrefix(), data.id]);
      }, error => this.source_financementSrv.httpSrv.handleError(error));
  }

}

