
import { Component, OnInit } from '@angular/core';
import { EntiteService } from '../entite.service';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';

@Component({
  selector: 'app-entite-edit',
  templateUrl: './entite-edit.component.html',
  styleUrls: ['./entite-edit.component.scss']
})
export class EntiteEditComponent implements OnInit {

  entite: Entite;
  entites: Entite[] = [];
  typeEntites: TypeEntite[] = [];

  constructor(public entiteSrv: EntiteService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.entite = this.activatedRoute.snapshot.data['entite'];
    this.entites = this.activatedRoute.snapshot.data['entites'];
    this.typeEntites = this.activatedRoute.snapshot.data['typeEntites'];
  }

  updateEntite() {
    const tempTypeEntite = this.entite.typeEntite;
    this.entite.typeEntite = this.entite.typeEntite.id;
    let tempEntiteParent = null;
    if (this.entite.entiteParent) {
      tempEntiteParent = this.entite.entiteParent;
      this.entite.entiteParent = this.entite.entiteParent.id;
    }
    this.entiteSrv.update(this.entite)
      .subscribe(data => this.location.back(),
        error => {
          this.entite.typeEntite = tempTypeEntite;
          if (tempEntiteParent) {
            this.entite.entiteParent = tempEntiteParent;
          }
          this.entiteSrv.httpSrv.handleError(error);
        });
  }

}
