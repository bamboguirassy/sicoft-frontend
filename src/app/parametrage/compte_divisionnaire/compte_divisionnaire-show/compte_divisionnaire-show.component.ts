import { Component, OnInit } from '@angular/core';
import { CompteDivisionnaire } from '../compte_divisionnaire';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteDivisionnaireService } from '../compte_divisionnaire.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-compte_divisionnaire-show',
  templateUrl: './compte_divisionnaire-show.component.html',
  styleUrls: ['./compte_divisionnaire-show.component.scss']
})
export class CompteDivisionnaireShowComponent implements OnInit {

  compte_divisionnaire: CompteDivisionnaire;
  constructor(public activatedRoute: ActivatedRoute,
    public compte_divisionnaireSrv: CompteDivisionnaireService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.compte_divisionnaire = this.activatedRoute.snapshot.data['compte_divisionnaire'];
  }

  removeCompteDivisionnaire() {
    this.compte_divisionnaireSrv.remove(this.compte_divisionnaire)
      .subscribe(data => this.router.navigate([this.compte_divisionnaireSrv.getRoutePrefix()]),
        error =>  this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.compte_divisionnaireSrv.findOneById(this.compte_divisionnaire.id)
    .subscribe((data:any)=>this.compte_divisionnaire=data,
      error=>this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

}

