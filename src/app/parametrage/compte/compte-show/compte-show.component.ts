import { Component, OnInit } from '@angular/core';
import { Compte } from '../compte';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-compte-show',
  templateUrl: './compte-show.component.html',
  styleUrls: ['./compte-show.component.scss']
})
export class CompteShowComponent implements OnInit {

  compte: Compte;
  constructor(public activatedRoute: ActivatedRoute,
    public compteSrv: CompteService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.compte = this.activatedRoute.snapshot.data['compte'];
  }

  removeCompte() {
    this.compteSrv.remove(this.compte)
      .subscribe(data => this.router.navigate([this.compteSrv.getRoutePrefix()]),
        error =>  this.compteSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.compteSrv.findOneById(this.compte.id)
    .subscribe((data:any)=>this.compte=data,
      error=>this.compteSrv.httpSrv.handleError(error));
  }

}

