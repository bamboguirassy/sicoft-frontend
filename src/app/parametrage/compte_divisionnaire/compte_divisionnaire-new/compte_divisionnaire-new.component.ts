import { Component, OnInit } from '@angular/core';
import { CompteDivisionnaire } from '../compte_divisionnaire';
import { CompteDivisionnaireService } from '../compte_divisionnaire.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compte_divisionnaire-new',
  templateUrl: './compte_divisionnaire-new.component.html',
  styleUrls: ['./compte_divisionnaire-new.component.scss']
})
export class CompteDivisionnaireNewComponent implements OnInit {
  compte_divisionnaire: CompteDivisionnaire;
  constructor(public compte_divisionnaireSrv: CompteDivisionnaireService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.compte_divisionnaire = new CompteDivisionnaire();
  }

  ngOnInit() {
  }

  saveCompteDivisionnaire() {
    this.compte_divisionnaireSrv.create(this.compte_divisionnaire)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('CompteDivisionnaire créé avec succès');
        this.compte_divisionnaire = new CompteDivisionnaire();
      }, error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

  saveCompteDivisionnaireAndExit() {
    this.compte_divisionnaireSrv.create(this.compte_divisionnaire)
      .subscribe((data: any) => {
        this.router.navigate([this.compte_divisionnaireSrv.getRoutePrefix(), data.id]);
      }, error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

}

