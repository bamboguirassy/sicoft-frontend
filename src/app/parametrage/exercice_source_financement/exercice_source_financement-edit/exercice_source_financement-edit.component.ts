
import { Component, OnInit } from '@angular/core';
import { ExerciceSourceFinancementService } from '../exercice_source_financement.service';
import { ExerciceSourceFinancement } from '../exercice_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-exercice_source_financement-edit',
  templateUrl: './exercice_source_financement-edit.component.html',
  styleUrls: ['./exercice_source_financement-edit.component.scss']
})
export class ExerciceSourceFinancementEditComponent implements OnInit {

  exercice_source_financement: ExerciceSourceFinancement;
  constructor(public exercice_source_financementSrv: ExerciceSourceFinancementService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.exercice_source_financement = this.activatedRoute.snapshot.data['exercice_source_financement'];
  }

  updateExerciceSourceFinancement() {
    this.exercice_source_financementSrv.update(this.exercice_source_financement)
      .subscribe(data => this.location.back(),
        error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

}
