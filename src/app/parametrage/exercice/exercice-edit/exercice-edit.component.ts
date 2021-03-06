import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExerciceService } from '../exercice.service';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { ConvertDateService } from 'app/shared/services/convert-date.service';

@Component({
  selector: 'app-exercice-edit',
  templateUrl: './exercice-edit.component.html',
  styleUrls: ['./exercice-edit.component.scss']
})
export class ExerciceEditComponent implements OnInit {

  exercice: Exercice;
  exerciceTemp: Exercice;
  exercices: Exercice[] = [];
  @ViewChild('confirm', { static: false }) public modalContentRef: TemplateRef<any>;
  constructor(public exerciceSrv: ExerciceService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location, private modalSrv: NgbModal,
    public notificationSrv: NotificationService,
    public convertDateServiceSrv: ConvertDateService) {
  }

  ngOnInit() {
    this.exercices = this.activatedRoute.snapshot.data['exercices'];
    this.exercice = this.activatedRoute.snapshot.data['exercice'];
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateFin);
    this.exercices = this.exercices.filter(data => data.id !== this.exercice.id);
  }

  updateExercice() {
    this.exerciceTemp = new Exercice();
    Object.assign(this.exerciceTemp, this.exercice);
    let tempDateDebut = this.exercice.dateDebut;
    let tempDateFin = this.exercice.dateFin;
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if (this.exercice.exerciceSuivant) {
      this.exerciceTemp.exerciceSuivant = this.exerciceTemp.exerciceSuivant.id;
    }
    this.exerciceSrv.update(this.exerciceTemp)
      .subscribe((data) => {
        this.exercice.dateDebut = tempDateDebut;
        this.exercice.dateFin = tempDateFin;
        this.location.back()
      }, error => {
        if (error.error.code === 417) {
          this.toggleConfirmModal(this.modalContentRef);
        } else {
          this.exercice.dateDebut = tempDateDebut;
          this.exercice.dateFin = tempDateFin;
          this.exerciceSrv.httpSrv.handleError(error)
        }
      });
  }

  public toggleConfirmModal(content: TemplateRef<any>) {
    // this.exercice = this.exerciceTemp
    this.modalSrv.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
  }

  public disableExerciceExcept() {
    this.exerciceSrv.disableExerciceExcept(this.exercice, 'update')
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
