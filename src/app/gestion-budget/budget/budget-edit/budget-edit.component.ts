
import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {

  budget: Budget;
  constructor(public budgetSrv: BudgetService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.budget = this.activatedRoute.snapshot.data['budget'];
  }

  updateBudget() {
    this.budgetSrv.update(this.budget)
      .subscribe(data => this.location.back(),
        error => this.budgetSrv.httpSrv.handleError(error));
  }

}
