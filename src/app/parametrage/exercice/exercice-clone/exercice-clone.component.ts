
import { Component, OnInit } from '@angular/core';
import { ExerciceService } from '../exercice.service';
import { Location } from '@angular/common';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertDateService } from 'app/shared/services/convert-date.service';

@Component({
  selector: 'app-exercice-clone',
  templateUrl: './exercice-clone.component.html',
  styleUrls: ['./exercice-clone.component.scss']
})
export class ExerciceCloneComponent implements OnInit {
  exercice: Exercice;
  original: Exercice;
  constructor(public exerciceSrv: ExerciceService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router,
    public convertDateServiceSrv: ConvertDateService) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['exercice'];
    this.exercice = Object.assign({}, this.original);
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateToDmy(this.exercice.dateFin);
    this.exercice.id = null;
  }

  cloneExercice() {
    this.exercice.dateDebut = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateDebut);
    this.exercice.dateFin = this.convertDateServiceSrv.formatDateYmd(this.exercice.dateFin);
    this.exerciceSrv.clone(this.original, this.exercice)
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => this.exerciceSrv.httpSrv.handleError(error));
  }

}
