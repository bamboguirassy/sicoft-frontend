import { Component, OnInit } from '@angular/core';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../budget.service';
import { budgetColumns, allowedBudgetFieldsForFilter } from '../budget.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  budgets: Budget[] = [];
  selectedBudgets: Budget[];
  selectedBudget: Budget;
  clonedBudgets: Budget[];

  cMenuItems: MenuItem[]=[];

  tableColumns = budgetColumns;
  //allowed fields for filter
  globalFilterFields = allowedBudgetFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public budgetSrv: BudgetService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('Budget')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewBudget(this.selectedBudget) });
    }
    if(this.authSrv.checkEditAccess('Budget')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editBudget(this.selectedBudget) })
    }
    if(this.authSrv.checkCloneAccess('Budget')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneBudget(this.selectedBudget) })
    }
    if(this.authSrv.checkDeleteAccess('Budget')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteBudget(this.selectedBudget) })
    }

    this.budgets = this.activatedRoute.snapshot.data['budgets'];
  }

  viewBudget(budget: Budget) {
      this.router.navigate([this.budgetSrv.getRoutePrefix(), budget.id]);

  }

  editBudget(budget: Budget) {
      this.router.navigate([this.budgetSrv.getRoutePrefix(), budget.id, 'edit']);
  }

  cloneBudget(budget: Budget) {
      this.router.navigate([this.budgetSrv.getRoutePrefix(), budget.id, 'clone']);
  }

  deleteBudget(budget: Budget) {
      this.budgetSrv.remove(budget)
        .subscribe(data => this.refreshList(), error => this.budgetSrv.httpSrv.handleError(error));
  }

  deleteSelectedBudgets(budget: Budget) {
    if(this.selectedBudgets){
      this.budgetSrv.removeSelection(this.selectedBudgets)
      .subscribe(data => this.refreshList(), error => this.budgetSrv.httpSrv.handleError(error));
      } else {
      this.budgetSrv.httpSrv.notificationSrv.showError("Selectionner au moins un élement à supprimer");
    }
  }

  refreshList() {
    this.budgetSrv.findAll()
      .subscribe((data: any) => this.budgets = data, error => this.budgetSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.budgets, 'budgets');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.budgets);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}