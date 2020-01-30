
import { Component, OnInit } from '@angular/core';
import { CompteDivisionnaireService } from '../compte_divisionnaire.service';
import { CompteDivisionnaire } from '../compte_divisionnaire';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-compte_divisionnaire-edit',
  templateUrl: './compte_divisionnaire-edit.component.html',
  styleUrls: ['./compte_divisionnaire-edit.component.scss']
})
export class CompteDivisionnaireEditComponent implements OnInit {

  compte_divisionnaire: CompteDivisionnaire;
  constructor(public compte_divisionnaireSrv: CompteDivisionnaireService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.compte_divisionnaire = this.activatedRoute.snapshot.data['compte_divisionnaire'];
  }

  updateCompteDivisionnaire() {
    this.compte_divisionnaireSrv.update(this.compte_divisionnaire)
      .subscribe(data => this.location.back(),
        error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

}
