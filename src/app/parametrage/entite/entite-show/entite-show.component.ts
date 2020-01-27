import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { EntiteService } from '../entite.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeEntite } from '../../type_entite/type_entite';
import { TypeEntiteService } from '../../type_entite/type_entite.service';

@Component({
  selector: 'app-entite-show',
  templateUrl: './entite-show.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./entite-show.component.scss']
})
export class EntiteShowComponent implements OnInit {

  entite: Entite;
  sousEntite: Entite;
  typeEntites: TypeEntite[] = [];
  constructor(public activatedRoute: ActivatedRoute,
    public entiteSrv: EntiteService, public location: Location,
    public router: Router, public notificationSrv: NotificationService,
    public typeEntiteSrv: TypeEntiteService,
    private modalService: NgbModal) {
    this.sousEntite = new Entite();
  }

  ngOnInit() {
    this.entite = this.activatedRoute.snapshot.data['entite'];
    this.typeEntites = this.activatedRoute.snapshot.data['types'];
  }

  removeEntite() {
    this.entiteSrv.remove(this.entite)
      .subscribe(data => this.router.navigate([this.entiteSrv.getRoutePrefix()]),
        error => this.entiteSrv.httpSrv.handleError(error));
  }

  refresh() {
    this.entiteSrv.findOneById(this.entite.id)
      .subscribe((data: any) => this.entite = data,
        error => this.entiteSrv.httpSrv.handleError(error));
  }

  toggleModal(content) {
    this.modalService.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop' });
  }

  createSousEntite(modal: any) {
    modal.dismiss('Cross click');
    this.sousEntite.entiteParent = this.entite.id;
    this.sousEntite.typeEntite = this.sousEntite.typeEntite.id;
    // save sous entite
    this.entiteSrv.create(this.sousEntite)
      .subscribe(sousEntite => { console.log(sousEntite) },
        error => this.entiteSrv.httpSrv.handleError(error));
  }

}

