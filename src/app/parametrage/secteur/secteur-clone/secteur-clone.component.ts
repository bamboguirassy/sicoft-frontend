
import { Component, OnInit } from '@angular/core';
import { SecteurService } from '../secteur.service';
import { Location } from '@angular/common';
import { Secteur } from '../secteur';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-secteur-clone',
  templateUrl: './secteur-clone.component.html',
  styleUrls: ['./secteur-clone.component.scss']
})
export class SecteurCloneComponent implements OnInit {
  secteur: Secteur;
  original: Secteur;
  secteurs: any;
  constructor(
    public secteurSrv: SecteurService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public notificationSrv: NotificationService,
    public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['secteur'];
    this.secteurs = this.activatedRoute.snapshot.data['secteurs'];
    this.secteur = Object.assign({}, this.original);
    this.secteur.id = null;
  }


  cloneSecteur() {
    /*for (const item of this.secteurs) {
      if (item.code === this.secteur.code) {
        this.notificationSrv.showError(' Code du secteur exite déja');
        return;
      }
    }*/
    this.secteurSrv.clone(this.original, this.secteur)
      .subscribe((data: any) => {
        this.router.navigate([this.secteurSrv.getRoutePrefix(), data.id]);
      }, error => this.secteurSrv.httpSrv.handleError(error));
  }

}
