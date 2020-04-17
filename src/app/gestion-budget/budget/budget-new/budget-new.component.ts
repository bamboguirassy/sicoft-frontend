import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Exercice } from 'app/parametrage/exercice/exercice';
import { Entite } from 'app/parametrage/entite/entite';
import { ExerciceService } from 'app/parametrage/exercice/exercice.service';
import { EntiteService } from 'app/parametrage/entite/entite.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

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
    public notificationSrv: NotificationService, public entiteSrv: EntiteService,
    public activateRoute: ActivatedRoute, public exerciceSrv: ExerciceService,
    public router: Router, public location: Location, public modalSercive: NgbModal) {
    this.budget = new Budget();
    }

  ngOnInit() {
    this.exercices = this.activateRoute.snapshot.data['exercices'];
    this.entites = this.activateRoute.snapshot.data['entites'];
    this.findBudgetByAndAccessEntity();
     this.findExerciceEncours();
    //  this.saveBudget();
    //  this.saveBudgetAndExit();
  }

  findExerciceEncours() {
    this.exerciceSrv.findExerciceEncours()
    .subscribe(
      (data: any) => {
        if (data == null){
          this.exercices = null
        } else{
          this.exercices = data; this.budget.exercice = data 
        }
        console.log(this.exercices);
        
       
      },
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

  saveBudget() {
    let tempExercice;
    let tempEntite;
     tempExercice = this.budget.exercice;
     tempEntite = this.budget.entite;
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
    let tempExercice;
    let tempEntite;
    if (this.budget.exercice) {
      tempExercice = this.budget.exercice;
      this.budget.exercice = this.budget.exercice.id;
    }
    if (this.budget.entite) {
      tempEntite = this.budget.entite;
      this.budget.entite = this.budget.entite.id;
    }
    this.budgetSrv.create(this.budget)
      .subscribe((data: any) => {
        this.router.navigate([this.budgetSrv.getRoutePrefix(), data.id]);
        this.closeModal();
        this.budget = new Budget();
      }, error => {
        this.budget.entite = tempEntite;
          this.budget.exercice = tempExercice;
        this.budgetSrv.httpSrv.handleError(error);
      });
  }
  public closeModal() {
    this.modalSercive.dismissAll('Cross click');
  }

}

