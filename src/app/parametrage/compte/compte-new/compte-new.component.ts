import { Component, OnInit } from '@angular/core';
import { Compte } from '../compte';
import { CompteService } from '../compte.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compte-new',
  templateUrl: './compte-new.component.html',
  styleUrls: ['./compte-new.component.scss']
})
export class CompteNewComponent implements OnInit {
  compte: Compte;
  constructor(public compteSrv: CompteService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.compte = new Compte();
  }

  ngOnInit() {
  }

  saveCompte() {
    this.compteSrv.create(this.compte)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Compte créé avec succès');
        this.compte = new Compte();
      }, error => this.compteSrv.httpSrv.handleError(error));
  }

  saveCompteAndExit() {
    this.compteSrv.create(this.compte)
      .subscribe((data: any) => {
        this.router.navigate([this.compteSrv.getRoutePrefix(), data.id]);
      }, error => this.compteSrv.httpSrv.handleError(error));
  }

}

