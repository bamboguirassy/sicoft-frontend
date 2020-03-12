
import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Location } from '@angular/common';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-clone',
  templateUrl: './budget-clone.component.html',
  styleUrls: ['./budget-clone.component.scss']
})
export class BudgetCloneComponent implements OnInit {
  budget: Budget;
  original: Budget;
  constructor(public budgetSrv: BudgetService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['budget'];
    this.budget = Object.assign({}, this.original);
    this.budget.id = null;
  }

  cloneBudget() {
    console.log(this.budget);
    this.budgetSrv.clone(this.original, this.budget)
      .subscribe((data: any) => {
        this.router.navigate([this.budgetSrv.getRoutePrefix(), data.id]);
      }, error => this.budgetSrv.httpSrv.handleError(error));
  }

}
