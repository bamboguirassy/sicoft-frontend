import { Component, OnInit } from '@angular/core';
import { ExerciceSourceFinancement } from '../exercice_source_financement';
import { ExerciceSourceFinancementService } from '../exercice_source_financement.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercice_source_financement-new',
  templateUrl: './exercice_source_financement-new.component.html',
  styleUrls: ['./exercice_source_financement-new.component.scss']
})
export class ExerciceSourceFinancementNewComponent implements OnInit {
  exercice_source_financement: ExerciceSourceFinancement;
  constructor(public exercice_source_financementSrv: ExerciceSourceFinancementService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.exercice_source_financement = new ExerciceSourceFinancement();
  }

  ngOnInit() {
  }

  saveExerciceSourceFinancement() {
    this.exercice_source_financementSrv.create(this.exercice_source_financement)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('ExerciceSourceFinancement créé avec succès');
        this.exercice_source_financement = new ExerciceSourceFinancement();
      }, error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  saveExerciceSourceFinancementAndExit() {
    this.exercice_source_financementSrv.create(this.exercice_source_financement)
      .subscribe((data: any) => {
        this.router.navigate([this.exercice_source_financementSrv.getRoutePrefix(), data.id]);
      }, error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

}

