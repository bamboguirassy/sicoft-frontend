
import { Component, OnInit } from '@angular/core';
import { ExerciceService } from '../exercice.service';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-exercice-edit',
  templateUrl: './exercice-edit.component.html',
  styleUrls: ['./exercice-edit.component.scss']
})
export class ExerciceEditComponent implements OnInit {

  exercice: Exercice;
  constructor(public exerciceSrv: ExerciceService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.exercice = this.activatedRoute.snapshot.data['exercice'];
  }

  updateExercice() {
    this.exerciceSrv.update(this.exercice)
      .subscribe(data => this.location.back(),
        error => this.exerciceSrv.httpSrv.handleError(error));
  }

}
