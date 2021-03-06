import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Entite} from '../entite';
import {ActivatedRoute, Router} from '@angular/router';
import {EntiteService} from '../entite.service';
import {Location} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TypeEntite} from '../../type_entite/type_entite';
import {TypeEntiteService} from '../../type_entite/type_entite.service';
import {allowedEntiteFieldsForFilter} from '../entite.columns';
import { User } from '../../user/user';

@Component({
    selector: 'app-entite-show',
    templateUrl: './entite-show.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./entite-show.component.scss']
})
export class EntiteShowComponent implements OnInit {

    entite: Entite;
    sousEntite: Entite;
    sousEntites: Entite[] = [];
    selectedEntites: Entite[] = [];
    typeEntites: TypeEntite[] = [];
    globalFilterFields = allowedEntiteFieldsForFilter;
    entiteLegend: string;
    constructor(
        public activatedRoute: ActivatedRoute,
        public entiteSrv: EntiteService, public location: Location,
        public router: Router,
        public typeEntiteSrv: TypeEntiteService,
        private modalService: NgbModal) {
        this.sousEntite = new Entite('');
    }

    ngOnInit() {
        this.entite = this.activatedRoute.snapshot.data['entite'];
        this.typeEntites = this.activatedRoute.snapshot.data['types'];
        this.sousEntites = this.activatedRoute.snapshot.data['sousEntites'];
        this.entiteLegend = `Entite: ${this.entite.nom}`;
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
        this.modalService.open(content, {size: 'lg', backdropClass: 'light-blue-backdrop', centered: true});
    }

    createSousEntite(modal: any) {
        this.sousEntite.entiteParent = this.entite.id;
        this.sousEntite.typeEntite = this.sousEntite.typeEntite.id;
        this.entiteSrv.create(this.sousEntite).subscribe(
            (data: any) => {
                this.entiteSrv.httpSrv.notificationSrv.showInfo('Sous entité créée avec succès');
                this.sousEntites.push(data)
                this.sousEntite = new Entite('');
            },
            error => this.entiteSrv.httpSrv.handleError(error));
    }

    refreshSousEntitesList() {
        this.entiteSrv.findSousEntitesById(this.entite.id).subscribe(
            (data: any) => this.sousEntites = data,
            error => this.entiteSrv.httpSrv.handleError(error)
        )
    }

    deleteSelectedEntites() {
        if (this.selectedEntites) {
            this.entiteSrv.removeSelection(this.selectedEntites)
                .subscribe(data => this.refreshSousEntitesList(), error => this.entiteSrv.httpSrv.handleError(error));
        } else {
            this.entiteSrv.httpSrv.notificationSrv.showWarning('Selectionner au moins un élement');
        }
    }

}
