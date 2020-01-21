import { Component, OnInit } from '@angular/core';
import { Secteur } from '../secteur';
import { ActivatedRoute, Router } from '@angular/router';
import { SecteurService } from '../secteur.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-secteur-show',
  templateUrl: './secteur-show.component.html',
  styleUrls: ['./secteur-show.component.scss']
})
export class SecteurShowComponent implements OnInit {

  secteur: Secteur;
  constructor(public activatedRoute: ActivatedRoute,
    public secteurSrv: SecteurService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.secteur = this.activatedRoute.snapshot.data['secteur'];
  }

  removeSecteur() {
    this.secteurSrv.remove(this.secteur)
      .subscribe(data => this.router.navigate([this.secteurSrv.getRoutePrefix()]),
        error =>  this.secteurSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.secteurSrv.findOneById(this.secteur.id)
    .subscribe((data:any)=>this.secteur=data,
      error=>this.secteurSrv.httpSrv.handleError(error));
  }

}

