
import { Component, OnInit } from '@angular/core';
import { ExerciceSourceFinancementService } from '../exercice_source_financement.service';
import { Location } from '@angular/common';
import { ExerciceSourceFinancement } from '../exercice_source_financement';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercice_source_financement-clone',
  templateUrl: './exercice_source_financement-clone.component.html',
  styleUrls: ['./exercice_source_financement-clone.component.scss']
})
export class ExerciceSourceFinancementCloneComponent implements OnInit {
  exercice_source_financement: ExerciceSourceFinancement;
  original: ExerciceSourceFinancement;
  constructor(public exercice_source_financementSrv: ExerciceSourceFinancementService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['exercice_source_financement'];
    this.exercice_source_financement = Object.assign({}, this.original);
    this.exercice_source_financement.id = null;
  }

  cloneExerciceSourceFinancement() {
    console.log(this.exercice_source_financement);
    this.exercice_source_financementSrv.clone(this.original, this.exercice_source_financement)
      .subscribe((data: any) => {
        this.router.navigate([this.exercice_source_financementSrv.getRoutePrefix(), data.id]);
      }, error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

}
