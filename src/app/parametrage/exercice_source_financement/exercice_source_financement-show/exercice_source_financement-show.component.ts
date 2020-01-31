import { Component, OnInit } from '@angular/core';
import { ExerciceSourceFinancement } from '../exercice_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceSourceFinancementService } from '../exercice_source_financement.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-exercice_source_financement-show',
  templateUrl: './exercice_source_financement-show.component.html',
  styleUrls: ['./exercice_source_financement-show.component.scss']
})
export class ExerciceSourceFinancementShowComponent implements OnInit {

  exercice_source_financement: ExerciceSourceFinancement;
  constructor(public activatedRoute: ActivatedRoute,
    public exercice_source_financementSrv: ExerciceSourceFinancementService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.exercice_source_financement = this.activatedRoute.snapshot.data['exercice_source_financement'];
  }

  removeExerciceSourceFinancement() {
    this.exercice_source_financementSrv.remove(this.exercice_source_financement)
      .subscribe(data => this.router.navigate([this.exercice_source_financementSrv.getRoutePrefix()]),
        error =>  this.exercice_source_financementSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.exercice_source_financementSrv.findOneById(this.exercice_source_financement.id)
    .subscribe((data:any)=>this.exercice_source_financement=data,
      error=>this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

}

