
import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Location } from '@angular/common';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercice } from 'app/parametrage/exercice/exercice';
import { Entite } from 'app/parametrage/entite/entite';
import { EntiteService } from 'app/parametrage/entite/entite.service';
import { ExerciceService } from 'app/parametrage/exercice/exercice.service';

@Component({
  selector: 'app-budget-clone',
  templateUrl: './budget-clone.component.html',
  styleUrls: ['./budget-clone.component.scss']
})
export class BudgetCloneComponent implements OnInit {
  budget: Budget;
  original: Budget;
  exercices: Exercice[] = [];
  entites: Entite[] = [];
  constructor(public budgetSrv: BudgetService, public location: Location,
    public entiteSrv: EntiteService, public exerciceSrv: ExerciceService,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['budget'];
    //this.exercices = this.activatedRoute.snapshot.data['exercices'];
    //this.entites = this.activatedRoute.snapshot.data['entites'];
    this.budget = Object.assign({}, this.original);
    this.budget.id = null;
    this.findExerciceEncours();
    this.findBudgetByAndAccessEntity();
  }

  findExerciceEncours(){
    this.exerciceSrv.findExerciceEncours()
    .subscribe(
      (data: any) => {this.exercices = data; },
      error => this.exerciceSrv.httpSrv.handleError(error)
    );
  }

  findBudgetByAndAccessEntity(){
    this.entiteSrv.findAll()
    .subscribe(
      (data:any) => this.entites = data,
      error => this.entiteSrv.httpSrv.handleError(error)
    );
  }

  cloneBudget() {
    let tempExercice = this.budget.exercice;
    let tempEntite = this.budget.entite;
    this.budget.exercice = this.budget.exercice.id;
    this.budget.entite = this.budget.entite.id;
    console.log(this.budget);
    this.budgetSrv.clone(this.original, this.budget)
      .subscribe((data: any) => {
        this.router.navigate([this.budgetSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.budgetSrv.httpSrv.handleError(error);
        this.budget.exercice = tempExercice;
        this.budget.entite = tempEntite;
      });
  }

}
