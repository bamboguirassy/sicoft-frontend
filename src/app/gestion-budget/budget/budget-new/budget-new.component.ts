import { Component, OnInit } from '@angular/core';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-budget-new',
  templateUrl: './budget-new.component.html',
  styleUrls: ['./budget-new.component.scss']
})
export class BudgetNewComponent implements OnInit {
  budget: Budget;
  constructor(public budgetSrv: BudgetService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.budget = new Budget();
  }

  ngOnInit() {
  }

  saveBudget() {
    this.budgetSrv.create(this.budget)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Budget créé avec succès');
        this.budget = new Budget();
      }, error => this.budgetSrv.httpSrv.handleError(error));
  }

  saveBudgetAndExit() {
    this.budgetSrv.create(this.budget)
      .subscribe((data: any) => {
        this.router.navigate([this.budgetSrv.getRoutePrefix(), data.id]);
      }, error => this.budgetSrv.httpSrv.handleError(error));
  }

}

