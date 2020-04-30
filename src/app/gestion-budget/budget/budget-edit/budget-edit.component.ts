
import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { Exercice } from 'app/parametrage/exercice/exercice';
import { Entite } from 'app/parametrage/entite/entite';
import { ExerciceService } from 'app/parametrage/exercice/exercice.service';
import { EntiteService } from 'app/parametrage/entite/entite.service';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {

  budget: Budget;
  exercices: Exercice[] = [];
  entites: Entite[] = [];
  constructor(public budgetSrv: BudgetService, public entiteSrv: EntiteService,
    public activatedRoute: ActivatedRoute, public exerciceSrv: ExerciceService,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.budget = this.activatedRoute.snapshot.data['budget'];
    // this.exercices = this.activatedRoute.snapshot.data['exercices'];
    this.entites = this.activatedRoute.snapshot.data['entites'];
    this.findExerciceEncours();
    this.findBudgetByAndAccessEntity();
  }

  findExerciceEncours() {
    this.exerciceSrv.findExerciceEncours()
    .subscribe(
      (data: any) => {this.exercices = data; },
      error => this.exerciceSrv.httpSrv.handleError(error)
    );
  }

  findBudgetByAndAccessEntity() {
    this.entiteSrv.findAll()
    .subscribe(
      (data: any) => this.entites = data,
      error => this.entiteSrv.httpSrv.handleError(error)
    );
  }

  updateBudget() {
    const tempExercice = this.budget.exercice;
    const tempEntite = this.budget.entite;
    this.budget.exercice = this.budget.exercice.id;
    this.budget.entite = this.budget.entite.id;
    this.budgetSrv.update(this.budget)
      .subscribe(data => this.location.back(),
        error => {
          this.budgetSrv.httpSrv.handleError(error);
          this.budget.exercice = tempExercice;
          this.budget.entite = tempEntite;
        }
        );
  }

}
