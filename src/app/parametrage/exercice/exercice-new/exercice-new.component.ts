import { ConvertDateService } from './../../../shared/services/convert-date.service';
import { Component, OnInit } from '@angular/core';
import { Exercice } from '../exercice';
import { ExerciceService } from '../exercice.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercice-new',
  templateUrl: './exercice-new.component.html',
  styleUrls: ['./exercice-new.component.scss']
})
export class ExerciceNewComponent implements OnInit {
  exercice: Exercice;
  constructor(public exerciceSrv: ExerciceService,
    public notificationSrv: NotificationService,
    public convertDateServiceSrv: ConvertDateService, 
    public router: Router, public location: Location) {
    this.exercice = new Exercice();
  }

  ngOnInit() {
  }

  saveExercice() {
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDate(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDate(this.exercice.dateFin);
    console.log(this.exercice.dateDebut);
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Exercice créé avec succès');
        this.exercice = new Exercice();
      }, error => this.exerciceSrv.httpSrv.handleError(error));
  }

  saveExerciceAndExit() {
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDate(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDate(this.exercice.dateFin);
    console.log(this.exercice.dateDebut);
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => this.exerciceSrv.httpSrv.handleError(error));
  }

}

