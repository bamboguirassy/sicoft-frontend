import { ConvertDateService } from './../../../shared/services/convert-date.service';
import { Component, OnInit } from '@angular/core';
import { Exercice } from '../exercice';
import { ExerciceService } from '../exercice.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-exercice-new',
  templateUrl: './exercice-new.component.html',
  styleUrls: ['./exercice-new.component.scss']
})
export class ExerciceNewComponent implements OnInit {
  exercice: Exercice;
  exercices: Exercice[] = [];
  exercicePrecedant: Exercice;
  constructor(public exerciceSrv: ExerciceService,
    public notificationSrv: NotificationService,
    public convertDateServiceSrv: ConvertDateService, 
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
    if(this.exercice.exerciceSuivant){
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Exercice créé avec succès');
        this.exercice = new Exercice();
      }, error => this.exerciceSrv.httpSrv.handleError(error));
  }

  saveExerciceAndExit() {
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if(this.exercice.exerciceSuivant){
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    console.log(this.exercice);
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => this.exerciceSrv.httpSrv.handleError(error));
  }

}

