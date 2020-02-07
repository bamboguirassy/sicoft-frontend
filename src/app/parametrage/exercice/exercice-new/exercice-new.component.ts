import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConvertDateService } from './../../../shared/services/convert-date.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Exercice } from '../exercice';
import { ExerciceService } from '../exercice.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng';

@Component({
  selector: 'app-exercice-new',
  templateUrl: './exercice-new.component.html',
  styleUrls: ['./exercice-new.component.scss']
})
export class ExerciceNewComponent implements OnInit {
  exercice: Exercice;
  tempDateDebut: string;
  tempDateFin: string;
  exercices: Exercice[] = [];
  dateDebut: string;
  dateFin: string;
  @ViewChild('confirm', { static: false }) public modalContentRef: TemplateRef<any>;

  constructor(public exerciceSrv: ExerciceService,
    public notificationSrv: NotificationService,
    public convertDateServiceSrv: ConvertDateService, private modalSrv: NgbModal,
    public router: Router, public location: Location,
    public activatedRoute: ActivatedRoute) {
    this.exercice = new Exercice();
  }

  ngOnInit() {
    this.exercices = this.activatedRoute.snapshot.data['exercices'];
  }

  saveExercice() {
    this.tempDateDebut = this.exercice.dateDebut;
    this.tempDateFin = this.exercice.dateFin;
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if (this.exercice.exerciceSuivant) {
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Exercice créé avec succès');
        this.exercice.dateDebut = this.tempDateDebut;
        this.exercice.dateFin = this.tempDateFin;
        this.exercice = new Exercice();
        this.exerciceSrv.findAll()
          .subscribe((innerData: any) => this.exercices = innerData, error => this.exerciceSrv.httpSrv.handleError(error));

      }, error => {
        if (error.error.code === 417) {
          this.toggleConfirmModal(this.modalContentRef);
        } else {
          this.exercice.dateDebut = this.tempDateDebut;
          this.exercice.dateFin = this.tempDateFin;
          this.exerciceSrv.httpSrv.handleError(error)
        }
      });
  }

  saveExerciceAndExit() {
    this.tempDateDebut = this.exercice.dateDebut;
    this.tempDateFin = this.exercice.dateFin;
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if (this.exercice.exerciceSuivant) {
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.exercice.dateDebut = this.tempDateDebut;
        this.exercice.dateFin = this.tempDateFin;
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => {
        if (error.error.code === 417) {
          this.toggleConfirmModal(this.modalContentRef);
        } else {
          this.exercice.dateDebut = this.tempDateDebut;
          this.exercice.dateFin = this.tempDateFin;
          this.exerciceSrv.httpSrv.handleError(error)
        }
      });
  }

  public toggleConfirmModal(content: TemplateRef<any>) {
    this.exercice.dateDebut = this.tempDateDebut;
    this.exercice.dateFin = this.tempDateFin;
    this.modalSrv.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
  }

  public disableExerciceExcept() {
    this.exerciceSrv.disableExerciceExcept(this.exercice, 'create')
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      });
    this.modalSrv.dismissAll();
  }

  dissmissModal(param: string) {
    this.modalSrv.dismissAll(param);
    this.exercice.encours = false;
    this.exercice.dateDebut = this.tempDateDebut;
    this.exercice.dateFin = this.tempDateFin;
  }
}

