
import { Component, OnInit } from '@angular/core';
import { ExerciceService } from '../exercice.service';
import { Location } from '@angular/common';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercice-clone',
  templateUrl: './exercice-clone.component.html',
  styleUrls: ['./exercice-clone.component.scss']
})
export class ExerciceCloneComponent implements OnInit {
  exercice: Exercice;
  original: Exercice;
  constructor(public exerciceSrv: ExerciceService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['exercice'];
    this.exercice = Object.assign({}, this.original);
    this.exercice.id = null;
  }

  cloneExercice() {
    this.exerciceSrv.clone(this.original, this.exercice)
      .subscribe((data: any) => {
        this.router.navigate([this.exerciceSrv.getRoutePrefix(), data.id]);
      }, error => this.exerciceSrv.httpSrv.handleError(error));
  }

}
