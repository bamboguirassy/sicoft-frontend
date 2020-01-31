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
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if (this.exercice.exerciceSuivant) {
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Exercice créé avec succès');
        this.exercice = new Exercice();
        this.exerciceSrv.findAll()
          .subscribe((data: any) => this.exercices = data),
          error => this.exerciceSrv.httpSrv.handleError(error);

      }, error => {
        this.toggleConfirmModal(this.modalContentRef);
        this.exerciceSrv.httpSrv.handleError(error);
      });
  }

  saveExerciceAndExit() {
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if (this.exercice.exerciceSuivant) {
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => {
        if (error.error.message.toLowerCase() === 'un exercice est déjà actif.') {
          this.toggleConfirmModal(this.modalContentRef);
        }
        this.exerciceSrv.httpSrv.handleError(error)
      });
  }

  public toggleConfirmModal(content: TemplateRef<any>) {
    this.modalSrv.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
  }

  public disableExerciceExcept() {
    this.exerciceSrv.disableExerciceExcept(this.exercice)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      });
    this.modalSrv.dismissAll();
  }

}

