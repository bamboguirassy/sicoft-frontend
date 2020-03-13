import { Component, OnInit } from '@angular/core';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Exercice } from 'app/parametrage/exercice/exercice';
import { Entite } from 'app/parametrage/entite/entite';

@Component({
  selector: 'app-budget-new',
  templateUrl: './budget-new.component.html',
  styleUrls: ['./budget-new.component.scss']
})
export class BudgetNewComponent implements OnInit {
  budget: Budget;
  exercices: Exercice[] = [];
  entites: Entite[] = [];
  constructor(public budgetSrv: BudgetService,
    public notificationSrv: NotificationService, 
    public activateRoute: ActivatedRoute,
    public router: Router, public location: Location) {
    this.budget = new Budget();
  }

  ngOnInit() {
    this.exercices = this.activateRoute.snapshot.data['exercices'];
    this.entites = this.activateRoute.snapshot.data['entites'];
  }

  saveBudget() {
    let tempExercice = this.budget.exercice;
    let tempEntite = this.budget.entite; 
    this.budget.exercice = this.budget.exercice.id;
    this.budget.entite = this.budget.entite.id;
    this.budgetSrv.create(this.budget)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Budget créé avec succès');
        this.budget = new Budget();
      }, error => {
        this.budgetSrv.httpSrv.handleError(error);
        this.budget.exercice = tempExercice;
        this.budget.entite = tempEntite;
      }
      );
  }

  saveBudgetAndExit() {
    let tempExercice = this.budget.exercice;
    let tempEntite = this.budget.entite; 
    this.budget.exercice = this.budget.exercice.id;
    this.budget.entite = this.budget.entite.id;
    this.budgetSrv.create(this.budget)
      .subscribe((data: any) => {
        this.router.navigate([this.budgetSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.budgetSrv.httpSrv.handleError(error);
        this.budget.exercice = tempExercice;
        this.budget.entite = tempEntite;
      }
      );
  }

}

