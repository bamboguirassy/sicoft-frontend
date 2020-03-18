import { Component, OnInit } from '@angular/core';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../budget.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-budget-show',
  templateUrl: './budget-show.component.html',
  styleUrls: ['./budget-show.component.scss']
})
export class BudgetShowComponent implements OnInit {

  budget: Budget;
  constructor(public activatedRoute: ActivatedRoute,
    public budgetSrv: BudgetService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.budget = this.activatedRoute.snapshot.data['budget'];
  }

  removeBudget() {
    this.budgetSrv.remove(this.budget)
      .subscribe(data => this.router.navigate([this.budgetSrv.getRoutePrefix()]),
        error =>  this.budgetSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.budgetSrv.findOneById(this.budget.id)
    .subscribe((data:any)=>this.budget=data,
      error=>this.budgetSrv.httpSrv.handleError(error));
  }

}

