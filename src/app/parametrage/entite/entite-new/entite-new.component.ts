import { Component, OnInit } from '@angular/core';
import { Entite } from '../entite';
import { EntiteService } from '../entite.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';

@Component({
  selector: 'app-entite-new',
  templateUrl: './entite-new.component.html',
  styleUrls: ['./entite-new.component.scss']
})
export class EntiteNewComponent implements OnInit {
  entite: Entite;
  entites: Entite[] = [];
  typeEntites: TypeEntite[] = [];

  constructor(public entiteSrv: EntiteService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location,
    private activatedRoute: ActivatedRoute) {
    this.entite = new Entite();
  }

  ngOnInit() {
    this.entites = this.activatedRoute.snapshot.data['entites'];
    this.typeEntites = this.activatedRoute.snapshot.data['typeEntites'];
  }

  saveEntite() {
    let tempTypeEntite = this.entite.typeEntite;
    this.entite.typeEntite = this.entite.typeEntite.id;
    let tempEntiteParent = null;
    if (this.entite.entiteParent) {
      tempEntiteParent = this.entite.entiteParent;
      this.entite.entiteParent = this.entite.entiteParent.id;
    }
    this.entiteSrv.create(this.entite)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Entite créé avec succès');
        this.entite = new Entite();
        this.findEntites();
      }, error => {
        this.entite.typeEntite = tempTypeEntite;
        if (tempEntiteParent) {
          this.entite.entiteParent = tempEntiteParent;
        }
        this.entiteSrv.httpSrv.handleError(error);
      });
  }

  findEntites() {
    this.entiteSrv.findAll()
      .subscribe((data: any) => this.entites = data
        , error => this.entiteSrv.httpSrv.handleError(error)
      );
  }

  saveEntiteAndExit() {
    let tempTypeEntite = this.entite.typeEntite;
    this.entite.typeEntite = this.entite.typeEntite.id;
    let tempEntiteParent = null;
    if (this.entite.entiteParent) {
      tempEntiteParent = this.entite.entiteParent;
      this.entite.entiteParent = this.entite.entiteParent.id;
    }
    this.entiteSrv.create(this.entite)
      .subscribe((data: any) => {
        this.router.navigate([this.entiteSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.entite.typeEntite = tempTypeEntite;
        if (tempEntiteParent) {
          this.entite.entiteParent = tempEntiteParent;
        }
        this.entiteSrv.httpSrv.handleError(error);
      });
  }

  // toggleModal(content) {
  //   this.modalService.open(content, { size: 'lg' });
  // }
}

