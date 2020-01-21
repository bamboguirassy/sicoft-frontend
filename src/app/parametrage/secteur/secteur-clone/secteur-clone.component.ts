
import { Component, OnInit } from '@angular/core';
import { SecteurService } from '../secteur.service';
import { Location } from '@angular/common';
import { Secteur } from '../secteur';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-secteur-clone',
  templateUrl: './secteur-clone.component.html',
  styleUrls: ['./secteur-clone.component.scss']
})
export class SecteurCloneComponent implements OnInit {
  secteur: Secteur;
  original: Secteur;
  constructor(public secteurSrv: SecteurService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['secteur'];
    this.secteur = Object.assign({}, this.original);
    this.secteur.id = null;
  }

  cloneSecteur() {
    this.secteurSrv.clone(this.original, this.secteur)
      .subscribe((data: any) => {
        this.router.navigate([this.secteurSrv.getRoutePrefix(), data.id]);
      }, error => this.secteurSrv.httpSrv.handleError(error));
  }

}
