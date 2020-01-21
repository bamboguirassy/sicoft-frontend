
import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { Compte } from '../compte';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-compte-edit',
  templateUrl: './compte-edit.component.html',
  styleUrls: ['./compte-edit.component.scss']
})
export class CompteEditComponent implements OnInit {

  compte: Compte;
  constructor(public compteSrv: CompteService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.compte = this.activatedRoute.snapshot.data['compte'];
  }

  updateCompte() {
    this.compteSrv.update(this.compte)
      .subscribe(data => this.location.back(),
        error => this.compteSrv.httpSrv.handleError(error));
  }

}
