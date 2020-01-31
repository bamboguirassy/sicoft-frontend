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
    let tempDateDebut = this.exercice.dateDebut;
    let tempDateFin = this.exercice.dateFin;
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if(this.exercice.exerciceSuivant){
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Exercice créé avec succès');
        this.exercice.dateDebut = tempDateDebut;
        this.exercice.dateFin = tempDateFin;
        this.exercice = new Exercice();
        this.exerciceSrv.findAll() 
        .subscribe((data: any) => this.exercices = data),
         error => this.exerciceSrv.httpSrv.handleError(error);
        
      }, error => {
        this.exercice.dateDebut = tempDateDebut;
        this.exercice.dateFin = tempDateFin;
        this.exerciceSrv.httpSrv.handleError(error);
      })
  }

  saveExerciceAndExit() {
    let tempDateDebut = this.exercice.dateDebut;
    let tempDateFin = this.exercice.dateFin;
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    if(this.exercice.exerciceSuivant){
      this.exercice.exerciceSuivant = this.exercice.exerciceSuivant.id;
    }
    this.exerciceSrv.create(this.exercice)
      .subscribe((data: any) => {
        this.exercice.dateDebut = tempDateDebut;
        this.exercice.dateFin = tempDateFin;
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.exercice.dateDebut = tempDateDebut;
        this.exercice.dateFin = tempDateFin;
        this.exerciceSrv.httpSrv.handleError(error);
      })
  }

}

