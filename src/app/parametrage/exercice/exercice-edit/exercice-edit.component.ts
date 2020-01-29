
import { Component, OnInit } from '@angular/core';
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
  exercices: Exercice[] = [];
  constructor(public exerciceSrv: ExerciceService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService,
    public convertDateServiceSrv: ConvertDateService) {
  }

  ngOnInit() {
    this.exercices = this.activatedRoute.snapshot.data['exercices'];
    this.exercice = this.activatedRoute.snapshot.data['exercice'];
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateFin);
  }

  updateExercice() {
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if(this.exercice.exerciceSuivant){
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.update(this.exercice)
      .subscribe(data => this.location.back(),
        error => this.exerciceSrv.httpSrv.handleError(error));
  }

}
