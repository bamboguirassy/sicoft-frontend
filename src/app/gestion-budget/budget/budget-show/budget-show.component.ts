import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../budget.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { allowedBudgetFieldsForFilter } from '../budget.columns';
import { TreeNode } from 'primeng';
import { Classe } from 'app/parametrage/classe/classe';
import { ClasseService } from 'app/parametrage/classe/classe.service';
import { CompteService } from 'app/parametrage/compte/compte.service';
import { CompteDivisionnaireService } from 'app/parametrage/compte_divisionnaire/compte_divisionnaire.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExerciceSourceFinancementService } from 'app/parametrage/exercice_source_financement/exercice_source_financement.service';
import { Compte } from 'app/parametrage/compte/compte';
import { Allocation } from 'app/gestion-budget/allocation/allocation';
import { ExerciceSourceFinancement } from 'app/parametrage/exercice_source_financement/exercice_source_financement';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatExpansionPanel } from '@angular/material/expansion';
import { AllocationService } from 'app/gestion-budget/allocation/allocation.service';
registerLocaleData(localeFr, 'fr');


@Component({
  selector: 'app-budget-show',
  templateUrl: './budget-show.component.html',
  styleUrls: ['./budget-show.component.scss']
})
export class BudgetShowComponent implements OnInit {

  globalFilterFields = allowedBudgetFieldsForFilter;
  treeNodes: TreeNode[] = [];
  loading = false;
  classes: Classe[] = [];
  montantTotalInitial: number;
  selectedExerciceSrcFin: ExerciceSourceFinancement = undefined;
  selectedExerciceSrcFinUpdate: ExerciceSourceFinancement = undefined;
  cashRemaining: number = 1;
  compteRecettes: Compte[] = [];
  recetteAllocationToUpdate: Allocation[];
  exerciceSourceFinancements: any;
  step = 0;
  sum = 0;
  showAlert = false;
  allocatedAccounts: Compte[] = [];
  allocations: Allocation[] = [];
  progressBarValue = 0;
  @ViewChild('allocation', { static: false }) allocationModalRef: TemplateRef<any>;
  @ViewChild('updateAllocation', { static: false }) UpdateAllocationModalRef: TemplateRef<any>;



  budget: Budget;
  constructor(public activatedRoute: ActivatedRoute,
    public budgetSrv: BudgetService, public location: Location, public classeSrv: ClasseService,
    public compteSrv: CompteService, public compteDivisionnaireSrv: CompteDivisionnaireService,
    public modalSrv: NgbModal, public exerciceSourceFinancementSrv: ExerciceSourceFinancementService,
    public allocationSrv: AllocationService,
    public router: Router, public notificationSrv: NotificationService) {
  }


  ngOnInit() {
    this.budget = this.activatedRoute.snapshot.data['budget'];
    this.classes = this.activatedRoute.snapshot.data['classes'];
    this.treeNodes = this.getTreeNodes(this.classes);
    this.classes.forEach(classe => {
      classe.type = 'classe';
    });
    this.findExerciceSourceFinancement();
    this.findCompteRecette();
  }



  findCompteRecette() {
    this.compteSrv.findCompteRecetteByBudget(this.budget.id)
      .subscribe((data: any) => {
        this.compteRecettes = data;
        this.compteRecettes.forEach(compteRecette => {
          compteRecette.bindLabel = compteRecette.numero + ' - ' + compteRecette.libelle;
        });
      }, error => {
        this.compteSrv.httpSrv.handleError(error);
      });
  }



  findExerciceSourceFinancement() {
    this.exerciceSourceFinancementSrv.findNotDispatchedExerciceSourceFinancementByBudget(this.budget.id)
      .subscribe((data: any) => {
        this.exerciceSourceFinancements = data;
        this.exerciceSourceFinancements.forEach((esf: any) => esf.libelle = `${esf.sourceFinancement.libelle}`);
      }, error => this.classeSrv.httpSrv.handleError(error));
  }




  removeBudget() {
    this.budgetSrv.remove(this.budget)
      .subscribe(data => this.router.navigate([this.budgetSrv.getRoutePrefix()]),
        error => this.budgetSrv.httpSrv.handleError(error));
  }

  onNodeExpand(event: any) {
    const node = event.node;
    if (node.data.type === 'classe') {
      this.fetchSubClasses(node);
    } else if (node.data.type === 'sousClasse') {
      this.fetchDivsionalAccount(node);
    } else if (node.data.type === 'compteDivisionnaire') {
      this.fetchAllocations(node);
    }
  }


  fetchAllocations(node: any) {
    this.loading = true;
    this.allocationSrv.findAllocationsByBudgetAndCompteDivisionnaireBudget(node.data.id, this.budget.id)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.loading = false;
          window.scrollTo(0, 0);
          this.notificationSrv.showWarning('Aucun compte ventilé trouvé.');
          return;
        }
        const allocationNode: TreeNode[] = [];
        data.forEach((allocation: any) => {
          allocation.type = 'allocation';
          allocationNode.push({ data: allocation, children: [], leaf: true, parent: node });
        });
        node.children = allocationNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      })
  }

  fetchDivsionalAccount(node: any) {
    this.loading = true;
    this.compteDivisionnaireSrv.findBySousClasse(node.data.id)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.loading = false;
          window.scrollTo(0, 0);
          this.notificationSrv.showWarning('Aucun compte divisionnaire trouvé.');
          return;
        }
        const divisionalAccountNode: TreeNode[] = [];
        data.forEach((divisionalAccount: any) => {
          divisionalAccount.type = 'compteDivisionnaire';
          divisionalAccountNode.push({ data: divisionalAccount, children: [], leaf: false, parent: node });
        });
        node.children = divisionalAccountNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      });
  }

  fetchSubClasses(node: any) {
    this.loading = true;
    this.classeSrv.findByClass(node.data.id)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.loading = false;
          window.scrollTo(0, 0);
          this.notificationSrv.showWarning('Aucune Sous classe trouvé.');
          return;
        }
        const subClassNode: TreeNode[] = [];
        data.forEach((subClass: any) => {
          subClass.type = 'sousClasse';
          subClassNode.push({ data: subClass, children: [], leaf: false, parent: node });
        });
        node.children = subClassNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      });

  }

  public getTreeNodes(classes: Classe[]): TreeNode[] {
    const treeNodes: TreeNode[] = [];
    classes.forEach(classe => {
      treeNodes.push({ data: classe, children: [], leaf: false });
    });
    return treeNodes;
  }

  refresh() {
    this.budgetSrv.findOneById(this.budget.id)
      .subscribe((data: any) => this.budget = data,
        error => this.budgetSrv.httpSrv.handleError(error));
  }

  refreshTreeTable() {
    this.loading = true;
    this.classeSrv.findAll()
      .subscribe((data: any) => {
        this.classes = data;
        this.classes.forEach(classe => {
          classe.type = 'classe';
        })
        this.treeNodes = this.getTreeNodes(this.classes);
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.classeSrv.httpSrv.handleError(error);
        this.loading = false;
      });
  }

  closeModal(param?: string) {
    this.allocations = [];
    this.selectedExerciceSrcFin = undefined;
    this.allocatedAccounts = [];
    this.step = 0;
    this.showAlert = false;
    if (param === 'update') {
      this.recetteAllocationToUpdate = undefined;
      this.selectedExerciceSrcFinUpdate = undefined;
    }
    this.modalSrv.dismissAll('Cross Click');
  }

  toggleAllocationModal() {
    this.modalSrv.open(this.allocationModalRef, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  onAmountTyped() {
    this.sum = 0;
    this.showAlert = false;
    this.allocations.forEach(allocation => {
      this.sum += allocation.montantInitial;
    });
    if (this.sum <= this.montantTotalInitial) {
      this.showAlert = false;
      this.progressBarValue = Math.floor(100 * (this.sum / this.selectedExerciceSrcFin.montantInitial));
      this.cashRemaining = this.selectedExerciceSrcFin.montantInitial - this.sum;
    } else {
      this.showAlert = true;
      this.progressBarValue = 0;
      this.cashRemaining = 0;
    }

  }

  onAmountTypedForUpdate(param?: string) {
    this.sum = 0;
    this.showAlert = false;
    this.recetteAllocationToUpdate.forEach(allocation => {
      this.sum += allocation.montantInitial;
    });
    if (this.sum <= this.montantTotalInitial) {
      this.showAlert = false;
      this.progressBarValue = Math.floor(100 * (this.sum / this.selectedExerciceSrcFinUpdate.montantInitial));
      this.cashRemaining = this.selectedExerciceSrcFinUpdate.montantInitial - this.sum;
    } else {
      this.showAlert = true;
      this.progressBarValue = 0;
      this.cashRemaining = 0;
    }
  }

  verifyAllocation() {
    let sum = 0;
    let containsNullAccount = false;
    this.allocations.forEach(allocation => {
      sum += allocation.montantInitial;
      if (allocation.montantInitial === 0) {
        containsNullAccount = true;
      }
    });
    return !containsNullAccount && sum !== 0 && sum <= this.montantTotalInitial ? false : true;
  }

  verifyAllocationForUpdate() {
    let sum = 0;
    let containsNullAccount = false;
    this.recetteAllocationToUpdate.forEach(allocation => {
      sum += allocation.montantInitial;
      if (allocation.montantInitial === 0) {
        containsNullAccount = true;
      }
    });
    return !containsNullAccount && sum !== 0 && sum <= this.montantTotalInitial ? false : true;
  }

  handleRemovedItem(removedItem: any) {
    this.allocations = this.allocations.filter(allocation => allocation.compte.numero !== removedItem.value.numero);
  }

  setStep(index: number) {
    this.step = index;
  }

  onExpansionClicked(expansionPanel: MatExpansionPanel) {
    if (this.step !== 0) {
      expansionPanel.close();
    }
  }

  nextStep(param?: string) {
    this.step++;
    if (param === 'init-alloc') {
      this.onAmountTyped();
      this.allocatedAccounts.forEach(allocatedAccount => {
        if (this.allocations.filter(allocation => allocation.compte.numero === allocatedAccount.numero).length === 0) {
          this.allocations.push({
            compte: allocatedAccount,
            montantInitial: 0
          });
        }
      });
    }
  }

  prevStep() {
    this.step--;
  }

  createAllocations(step: MatExpansionPanel) {
    step.close();
    this.step = 4;
    const allocatedAccounts: Compte[] = [];
    this.allocations.forEach(allocation => {
      allocatedAccounts.push(allocation.compte);
      allocation.compte = allocation.compte.id;
      allocation.exerciceSourceFinancement = this.selectedExerciceSrcFin.id;
    });
    this.allocationSrv.createMultipleAndUpdateSrcFinAmount(this.allocations)
      .subscribe((data: any) => {
        this.closeModal();
        this.refreshTreeTable();
        this.findCompteRecette();
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
      });
  }

  handleExSourceFinChange(param?: string) {
    this.sum = 0;
    if (param === 'update') {
      this.montantTotalInitial = this.selectedExerciceSrcFinUpdate.montantInitial;
      this.cashRemaining = this.selectedExerciceSrcFinUpdate.montantRestant;
      this.findAllocationsByBudget(this.selectedExerciceSrcFinUpdate.id);
    } else {
      this.montantTotalInitial = this.selectedExerciceSrcFin.montantInitial;
      this.cashRemaining = this.selectedExerciceSrcFin.montantRestant;
    }
  }

  findAllocationsByBudget(id: number) {
    this.allocationSrv.findAllocationsByExerciceSrcFin(this.selectedExerciceSrcFinUpdate.id)
      .subscribe((data: any) => {
        data.forEach(allocation => {
          allocation.compte.bindLabel = allocation.compte.numero + ' - ' + allocation.compte.libelle;
        });
        this.recetteAllocationToUpdate = data;
        this.onAmountTypedForUpdate('update');
      }, error => {
        this.compteSrv.httpSrv.handleError(error);
      })
  }

  toggleUpdateAllocationModal() {
    this.modalSrv.open(this.UpdateAllocationModalRef, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  updateAllocations() {
    this.allocationSrv.updateMultipleAndSrcFinAmount(this.recetteAllocationToUpdate)
      .subscribe((data: any) => {
        this.selectedExerciceSrcFinUpdate.montantRestant = this.selectedExerciceSrcFinUpdate.montantInitial - this.sum;
        this.closeModal('update');
        this.refreshTreeTable();
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
      })
  }
}

