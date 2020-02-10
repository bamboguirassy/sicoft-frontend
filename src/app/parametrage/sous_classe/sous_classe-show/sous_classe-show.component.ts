import { Component, OnInit } from '@angular/core';
import { SousClasse } from '../sous_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { SousClasseService } from '../sous_classe.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { Classe } from '../../classe/classe';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sous_classe-show',
  templateUrl: './sous_classe-show.component.html',
  styleUrls: ['./sous_classe-show.component.scss']
})
export class SousClasseShowComponent implements OnInit {

  sous_classe: SousClasse;
  classes: Classe[] = [];
  constructor(public activatedRoute: ActivatedRoute,
    public sous_classeSrv: SousClasseService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.sous_classe = this.activatedRoute.snapshot.data['sous_classe'];
    // this.classes = this.activatedRoute.snapshot.data['classes'];
  }

  removeSousClasse() {
    this.sous_classeSrv.remove(this.sous_classe)
      .subscribe(data => this.router.navigate([this.sous_classeSrv.getRoutePrefix()]),
        error =>  this.sous_classeSrv.httpSrv.handleError(error));
  }
  refresh() {
    this.sous_classeSrv.findOneById(this.sous_classe.id)
    .subscribe((data: any) => this.sous_classe = data,
      error => this.sous_classeSrv.httpSrv.handleError(error));
  }

}

