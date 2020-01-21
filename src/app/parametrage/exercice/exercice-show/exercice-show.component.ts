import { Component, OnInit } from '@angular/core';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from '../exercice.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-exercice-show',
  templateUrl: './exercice-show.component.html',
  styleUrls: ['./exercice-show.component.scss']
})
export class ExerciceShowComponent implements OnInit {

  exercice: Exercice;
  constructor(public activatedRoute: ActivatedRoute,
    public exerciceSrv: ExerciceService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.exercice = this.activatedRoute.snapshot.data['exercice'];
  }

  removeExercice() {
    this.exerciceSrv.remove(this.exercice)
      .subscribe(data => this.router.navigate([this.exerciceSrv.getRoutePrefix()]),
        error =>  this.exerciceSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.exerciceSrv.findOneById(this.exercice.id)
    .subscribe((data:any)=>this.exercice=data,
      error=>this.exerciceSrv.httpSrv.handleError(error));
  }

}

