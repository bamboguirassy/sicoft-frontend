import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExerciceService } from '../exercice.service';
import { Location } from '@angular/common';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertDateService } from 'app/shared/services/convert-date.service';

@Component({
  selector: 'app-exercice-clone',
  templateUrl: './exercice-clone.component.html',
  styleUrls: ['./exercice-clone.component.scss']
})
export class ExerciceCloneComponent implements OnInit {
  exercice: Exercice;
  original: Exercice;
  exercices: Exercice[] = [];
  exerciceTemp: Exercice;
  @ViewChild('confirm', { static: false }) public modalContentRef: TemplateRef<any>;
  constructor(public exerciceSrv: ExerciceService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router,
    public convertDateServiceSrv: ConvertDateService,
    public modalSrv: NgbModal,
  ) { }

  ngOnInit() {
    this.exercices = this.activatedRoute.snapshot.data['exercices'];
    this.original = this.activatedRoute.snapshot.data['exercice'];
    this.exercice = Object.assign({}, this.original);
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateFin);
    this.exercice.id = null;
  }

  cloneExercice() {
    this.exerciceTemp = new Exercice();
    Object.assign(this.exerciceTemp, this.exercice);
    let tempDateDebut = this.exercice.dateDebut;
    let tempDateFin = this.exercice.dateFin;
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if (this.exercice.exerciceSuivant) {
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.clone(this.original, this.exercice)
      .subscribe((data: any) => {
        this.exercice.dateDebut = tempDateDebut;
        this.exercice.dateFin = tempDateFin;
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => {
        if (error.error.code === 417) {
          this.toggleConfirmModal(this.modalContentRef);
        } else {
          this.exercice.dateDebut = tempDateDebut;
          this.exercice.dateFin = tempDateFin;
          this.exercice = this.exerciceTemp;
          this.exerciceSrv.httpSrv.handleError(error)
        }
      });
  }

  public toggleConfirmModal(content: TemplateRef<any>) {
    this.exercice = this.exerciceTemp;
    this.modalSrv.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
  }

  public disableExerciceExcept() {
    this.exerciceSrv.disableExerciceExcept(this.original, 'clone', this.exercice)
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      });
    this.modalSrv.dismissAll();
  }

  dissmissModal(param: string) {
    this.modalSrv.dismissAll(param);
    this.exercice.encours = false;
    this.exercice = this.exerciceTemp;
  }

}
