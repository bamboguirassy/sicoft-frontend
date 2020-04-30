import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionBudgetRoutingModule } from './gestion-budget-routing.module';
//import { ToastModule, TableModule, ContextMenuModule, MenuModule, ButtonModule, CardModule, FieldsetModule, ToolbarModule, TreeTableModule, TabViewModule, CheckboxModule, InputSwitchModule, MultiSelectModule, InputMaskModule, ChipsModule, AccordionModule, BreadcrumbModule, DropdownModule, ProgressSpinnerModule, AutoCompleteModule, ConfirmDialogModule, PickListModule, DialogModule, PasswordModule, OrganizationChartModule } from 'primeng';
import {
  ContextMenuModule, PickListModule, DialogModule, ToastModule, TableModule, TreeTableModule,
  MenuModule, ButtonModule, CheckboxModule, PasswordModule,
  OrganizationChartModule, InputSwitchModule,
  MultiSelectModule,
  InputMaskModule,
  ChipsModule,
  CardModule, FieldsetModule,
  ToolbarModule, TabViewModule,
  AccordionModule, BreadcrumbModule, DropdownModule, AutoCompleteModule, ProgressSpinnerModule, ConfirmDialogModule
} from 'primeng';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';


import { NgxCurrencyModule } from 'ngx-currency';



import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrgChartModule } from '@mondal/org-chart';
import { BudgetCloneComponent } from './budget/budget-clone/budget-clone.component';
import { BudgetEditComponent } from './budget/budget-edit/budget-edit.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { BudgetNewComponent } from './budget/budget-new/budget-new.component';
import { BudgetShowComponent } from './budget/budget-show/budget-show.component';
import { AllocationNewComponent } from './allocation/allocation-new/allocation-new.component';
import { AllocationCloneComponent } from './allocation/allocation-clone/allocation-clone.component';
import { AllocationListComponent } from './allocation/allocation-list/allocation-list.component';
import { AllocationEditComponent } from './allocation/allocation-edit/allocation-edit.component';
import { AllocationShowComponent } from './allocation/allocation-show/allocation-show.component';

@NgModule({
  declarations: [
    BudgetCloneComponent, BudgetEditComponent, BudgetListComponent,
    BudgetNewComponent, BudgetShowComponent, AllocationNewComponent, AllocationCloneComponent,
    AllocationListComponent, AllocationEditComponent, AllocationShowComponent,
  ],
  imports: [
    CommonModule,
    GestionBudgetRoutingModule,
    ToastModule,
    TableModule,
    ContextMenuModule,
    FormsModule,
    SharedModule,
    MenuModule,
    StepsModule,
    NgSelectModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    ToolbarModule,
    TreeTableModule,
    TabViewModule,
    CheckboxModule,
    InputSwitchModule,
    MultiSelectModule,
    InputMaskModule,
    ChipsModule,
    NgSelectModule,
    AccordionModule,
    MatIconModule,
    NgxCurrencyModule,
    ProgressBarModule,
    MatInputModule,
    BreadcrumbModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    OrgChartModule,
    DropdownModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    PickListModule,
    DialogModule,
    TreeTableModule,
    PasswordModule,
    OrganizationChartModule,
  ]
})
export class GestionBudgetModule { }
