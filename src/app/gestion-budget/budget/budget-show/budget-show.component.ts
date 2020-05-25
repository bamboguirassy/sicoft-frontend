import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Budget } from '../budget';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../budget.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { allowedCompteFieldForFilter } from '../budget.columns';
import {
  allowedExerciceSourceFinancementFieldsForFilter
    as allowedESFFields
} from '../../../parametrage/exercice_source_financement/exercice_source_financement.columns';

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

  globalFilterFields = allowedCompteFieldForFilter;
  globalFilterFieldESF = allowedESFFields;
  treeNodes: TreeNode[] = [];
  loading = false;
  classes: Classe[] = [];
  selectedExerciceSrcFin: ExerciceSourceFinancement = undefined;
  selectedExerciceSrcFinUpdate: ExerciceSourceFinancement = undefined;
  cashRemaining: number = undefined;
  allocatedAmount: number = 0; //montant allocation recette
  totalDepense: number = 0;
  compteRecettes: Compte[] = [];
  compteDepenses: Compte[] = [];
  totalRecetteRestant: number = 0;
  totalRecette: number = 0;
  recetteAllocationToUpdate: Allocation[];
  depenseAllocationToUpdate: Allocation[];
  exerciceSourceFinancements: ExerciceSourceFinancement[];
  allExerciceSourceFinancements: ExerciceSourceFinancement[];
  step = 0;
  sum = 0;
  showSpinner = false;
  showAlert = false;
  allocatedAccounts: Compte[] = [];
  allocatedDepenseAccounts: Compte[] = [];
  allocationRecettes: Allocation[] = [];
  allocationDepenses: Allocation[] = [];
  progressBarValue = 0;
  @ViewChild('allocation', { static: false }) allocationModalRef: TemplateRef<any>;
  @ViewChild('updateAllocation', { static: false }) updateAllocationModalRef: TemplateRef<any>;
  @ViewChild('allocationDepenseWizard', { static: false }) allocationDepenseWizardRef: TemplateRef<any>;
  @ViewChild('updateAllocationDepense', { static: false }) updateAllocationDepenseRef: TemplateRef<any>;

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
    this.findExerciceSourceFinancement(); //recupere que les esf avec un montant disponible
    this.findAllExerciceSourceFinancement(); //recupére tous les esf 
    this.findCompteRecettes();
    this.findCompteDepenses();
  }



  findAllExerciceSourceFinancement() {
    this.exerciceSourceFinancementSrv.findAllByBudget(this.budget.id)
      .subscribe((data: any) => {
        this.allExerciceSourceFinancements = data;
        this.allExerciceSourceFinancements.forEach((esf: any) => {
          esf.libelle = `${esf.sourceFinancement.libelle}`
          esf.montantAlloue = esf.montantInitial - esf.montantRestant
          esf.allocatedPercent = Math.floor(100 * ((esf.montantInitial - esf.montantRestant) / esf.montantInitial))
        });
      }, error => this.classeSrv.httpSrv.handleError(error));
  }



  findCompteRecettes() {
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

  findCompteDepenses() {
    this.compteSrv.findCompteDepenseByBudget(this.budget.id)
      .subscribe((data: any) => {
        this.compteDepenses = data;
        this.compteDepenses.forEach(compteDepense => {
          compteDepense.bindLabel = compteDepense.numero + ' - ' + compteDepense.libelle;
        });
      }, error => {
        this.compteSrv.httpSrv.handleError(error);
      });
  }

  findTotalAllocationsRecetteAndDepenseByBudget() {
    this.showSpinner = true;
    this.allocationSrv.findTotalRecetteAndDepenseByBudget(this.budget.id)
      .subscribe((data: any) => {
        this.totalRecetteRestant = parseFloat(data.totalRecette);
        this.totalDepense = parseFloat(data.totalDepense)
        this.totalRecette = this.totalRecetteRestant + this.totalDepense;
        this.showSpinner = false;
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
        this.showSpinner = false;
      })
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
    const node = event.node as TreeNode;
    if (node.data.type === 'classe') {
      this.fetchSubClasses(node);
    } else if (node.data.type === 'sousClasse') {
      this.fetchDivsionalAccount(node);
    } else if (node.data.type === 'compteDivisionnaire') {
      this.fetchAllocations(node);
    }
  }

  fetchAllocations(node: TreeNode) {
    this.loading = true;
    const classe = node.parent.parent.data as Classe;
    this.allocationSrv.findByBudgetAndCompteDivisionnaire(node.data.id, this.budget.id, classe.typeClasse.code)
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

  closeModal(param?: string, operation: 'recette' | 'depense' = 'recette') {
    this.allocationRecettes = [];
    this.allocationDepenses = [];
    this.selectedExerciceSrcFin = undefined;
    this.allocatedAccounts = [];
    this.allocatedDepenseAccounts = [];
    this.step = 0;
    this.sum = 0;
    this.cashRemaining = 0;
    this.progressBarValue = 0;
    this.showAlert = false;
    this.showSpinner = false;
    if (param === 'update') {
      if (operation === 'recette') {
        this.recetteAllocationToUpdate = undefined;
        this.selectedExerciceSrcFinUpdate = undefined;
      } else {
        this.depenseAllocationToUpdate = undefined;
      }

    }
    this.modalSrv.dismissAll('Cross Click');
  }

  toggleAllocationModal() {
    this.modalSrv.open(this.allocationModalRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  toggleAllocationDepenseModal() {
    this.findTotalAllocationsRecetteAndDepenseByBudget();
    this.modalSrv.open(this.allocationDepenseWizardRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  toggleUpdateAllocationModal() {
    this.modalSrv.open(this.updateAllocationModalRef, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  toggleUpdateAllocationDepenseModal() {
    this.findAllocationsDepenseByBudget();
    this.modalSrv.open(this.updateAllocationDepenseRef, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  onAmountTyped(operation: 'recette' | 'depense' = 'recette') {
    this.sum = 0;
    this.showAlert = false;
    if (operation === 'recette') {
      this.allocationRecettes.forEach(allocation => {
        this.sum += allocation.montantInitial;
      });
      if (this.sum <= this.selectedExerciceSrcFin.montantRestant) {
        this.showAlert = false;
        this.progressBarValue = Math.floor(100 * ((this.sum + this.allocatedAmount) / this.selectedExerciceSrcFin.montantInitial));
        this.cashRemaining = this.selectedExerciceSrcFin.montantRestant - this.sum;
      } else {
        this.showAlert = true;
        this.progressBarValue = 0;
        this.cashRemaining = 0;
      }
    } else {
      this.allocationDepenses.forEach(allocation => {
        this.sum += allocation.montantInitial;
      });
      if (this.sum <= this.totalRecetteRestant) {
        this.showAlert = false;
        this.progressBarValue = Math.floor(100 * ((this.sum + this.totalDepense) / (this.totalRecetteRestant + this.totalDepense)));
        this.cashRemaining = this.totalRecetteRestant - this.sum;
      } else {
        this.showAlert = true;
        this.progressBarValue = 0;
        this.cashRemaining = 0;
      }
    }
  }

  onAmountTypedForUpdate(param?: string, operation: 'recette' | 'depense' = 'recette') {
    this.sum = 0;
    this.showAlert = false;
    if (operation === 'recette') {
      this.recetteAllocationToUpdate.forEach(allocation => {
        this.sum += allocation.montantInitial;
      });
      if (this.sum <= this.selectedExerciceSrcFinUpdate.montantInitial) {
        this.showAlert = false;
        const montantReelementAlloue = this.selectedExerciceSrcFinUpdate.montantRestant + this.allocatedAmount - this.sum;
        this.progressBarValue
          = Math.floor(100 * ((this.selectedExerciceSrcFinUpdate.montantInitial - montantReelementAlloue)
            / this.selectedExerciceSrcFinUpdate.montantInitial));
        if (param === 'first') {
          this.cashRemaining = this.selectedExerciceSrcFinUpdate.montantRestant;
        } else {
          this.cashRemaining = this.selectedExerciceSrcFinUpdate.montantRestant + this.allocatedAmount - this.sum;
        }
      } else {
        this.showAlert = true;
        this.progressBarValue = 0;
        this.cashRemaining = 0;
      }
    } else {
      this.depenseAllocationToUpdate.forEach(allocation => {
        this.sum += allocation.montantInitial;
      });
      if (this.sum <= (this.totalRecetteRestant + this.totalDepense)) {
        this.showAlert = false;
        this.progressBarValue
          = Math.floor(100 * ( (this.totalRecette - (this.totalRecetteRestant + this.totalDepense - this.sum))
            / this.totalRecette));
        if (param === 'first') {
          this.cashRemaining = this.totalRecetteRestant;
        } else {
          this.cashRemaining = this.totalRecetteRestant + this.totalDepense - this.sum;
        }
      } else {
        this.showAlert = true;
        this.progressBarValue = 0;
        this.cashRemaining = 0;
      }
    }

  }

  verifyAllocation(operation: 'depense' | 'recette' = 'recette') {
    let sum = 0;
    let containsNullAccount = false;
    if (operation === 'recette') {
      this.allocationRecettes.forEach(allocation => {
        sum += allocation.montantInitial;
        if (allocation.montantInitial === 0) {
          containsNullAccount = true;
        }
      });
      return !containsNullAccount && sum !== 0 && sum <= this.selectedExerciceSrcFin.montantRestant ? false : true;
    } else {
      this.allocationDepenses.forEach(allocation => {
        sum += allocation.montantInitial;
        if (allocation.montantInitial === 0) {
          containsNullAccount = true;
        }
      });
      return !containsNullAccount && sum !== 0 && sum <= this.totalRecetteRestant ? false : true;
    }
  }

  verifyAllocationForUpdate(operation: 'recette' | 'depense' = 'recette') {
    let sum = 0;
    let containsNullAccount = false;
    if (operation === 'recette') {
      this.recetteAllocationToUpdate.forEach(allocation => {
        sum += allocation.montantInitial;
        if (allocation.montantInitial === 0) {
          containsNullAccount = true;
        }
      });
      return !containsNullAccount
        && sum !== 0
        && sum <= this.selectedExerciceSrcFinUpdate.montantRestant + this.allocatedAmount
        ? false : true;
    } else {
      this.depenseAllocationToUpdate.forEach(allocation => {
        sum += allocation.montantInitial;
        if (allocation.montantInitial === 0) {
          containsNullAccount = true;
        }
      });
      return !containsNullAccount
        && sum !== 0
        && sum <= this.totalRecetteRestant + this.totalDepense
        ? false : true;
    }

  }

  handleRemovedItem(removedItem: any, operation: 'recette' | 'depense' = 'recette') {
    if (operation === 'recette') {
      this.allocationRecettes = this.allocationRecettes.filter(allocation => allocation.compte.numero !== removedItem.value.numero);
    } else {
      this.allocationDepenses = this.allocationDepenses.filter(allocation => allocation.compte.numero !== removedItem.value.numero)
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  onExpansionClicked(expansionPanel: MatExpansionPanel) {
    if (this.step !== 0) {
      expansionPanel.close();
    }
  }

  nextStep(param?: string, operation: 'recette' | 'depense' = 'recette') {
    this.step++;
    if (param === 'init-alloc') {

      if (operation === 'recette') {
        this.progressBarValue = Math.floor(100 * (this.allocatedAmount / this.selectedExerciceSrcFin.montantInitial));
        this.allocatedAmount = this.selectedExerciceSrcFin.montantInitial - this.selectedExerciceSrcFin.montantRestant;
        this.allocatedAccounts.forEach(allocatedAccount => {
          if (this.allocationRecettes.filter(allocation => allocation.compte.numero === allocatedAccount.numero).length === 0) {
            this.allocationRecettes.push({
              compte: allocatedAccount,
              montantInitial: 0
            });
          }
        });
        this.onAmountTyped();
      } else {
        this.progressBarValue = Math.floor(100 * (this.totalDepense / (this.totalRecetteRestant + this.totalDepense)));
        this.allocatedDepenseAccounts.forEach(allocatedAccount => {
          if (this.allocationDepenses.filter(allocation => allocation.compte.numero === allocatedAccount.numero).length === 0) {
            this.allocationDepenses.push({
              compte: allocatedAccount,
              montantInitial: 0
            });
          }
        });
        this.onAmountTyped('depense');
      }
    }
  }


  handleExSourceFinChange(param?: string) {
    this.sum = 0;
    if (param === 'update') {
      if (this.selectedExerciceSrcFinUpdate) {
        this.cashRemaining = this.selectedExerciceSrcFinUpdate.montantRestant;
        this.allocatedAmount
          = this.allocatedAmount + (this.selectedExerciceSrcFinUpdate.montantInitial - this.selectedExerciceSrcFinUpdate.montantRestant);
        this.findAllocationsByExerciceSrcFin();
      }

    } else {
      if (this.selectedExerciceSrcFin) {
        this.allocatedAmount
          = this.allocatedAmount + (this.selectedExerciceSrcFin.montantInitial - this.selectedExerciceSrcFin.montantRestant);
        this.cashRemaining = this.selectedExerciceSrcFin.montantRestant;
      }
    }
  }

  prevStep() {
    this.step--;
  }

  createAllocations(step: MatExpansionPanel) {
    step.close();
    this.step = 4;
    let sum = 0;
    const allocatedAccounts: Compte[] = [];
    this.allocationRecettes.forEach(allocation => {
      sum += allocation.montantInitial;
      allocatedAccounts.push(allocation.compte);
      allocation.compte = allocation.compte.id;
      allocation.exerciceSourceFinancement = this.selectedExerciceSrcFin.id;
    });
    this.allocationSrv.createMultipleAndUpdateSrcFinAmount(this.allocationRecettes)
      .subscribe((data: any) => {
        this.selectedExerciceSrcFin.montantRestant = this.selectedExerciceSrcFin.montantRestant - sum;
        if (this.selectedExerciceSrcFin.montantRestant === 0) {
          this.exerciceSourceFinancements = this.exerciceSourceFinancements.filter(esf => esf.id !== this.selectedExerciceSrcFin.id);
        }
        this.allExerciceSourceFinancements.forEach(esf => {
          if (esf.id === this.selectedExerciceSrcFin.id) {
            esf.montantRestant = this.selectedExerciceSrcFin.montantRestant;
          }
        });
        this.closeModal();
        this.refreshTreeTable();
        this.findCompteRecettes();
        this.findAllExerciceSourceFinancement();
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
      });
  }

  createAllocationDepenses(step: MatExpansionPanel) {
    step.close();
    this.step = 4;
    let sum = 0;
    this.allocationDepenses.forEach(allocation => {
      sum += allocation.montantInitial;
      allocation.compte = allocation.compte.id;
      allocation.budget = this.budget.id;
    });
    this.allocationSrv.createMultipleDepense(this.allocationDepenses)
      .subscribe((data: any) => {
        this.closeModal();
        this.refreshTreeTable();
        this.findCompteDepenses()
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
      });
  }

  /**
   * Trouve les allocations recette en fonction du ESF
   */
  findAllocationsByExerciceSrcFin() {
    let s = 0;
    this.allocationSrv.findRecetteByExerciceSrcFin(this.selectedExerciceSrcFinUpdate.id)
      .subscribe((data: any) => {
        data.forEach(allocation => {
          allocation.compte.bindLabel = allocation.compte.numero + ' - ' + allocation.compte.libelle;
          s += allocation.montantInitial;
        });
        this.recetteAllocationToUpdate = data;
        this.allocatedAmount = s;
        this.onAmountTypedForUpdate('first');
      }, error => {
        this.compteSrv.httpSrv.handleError(error);
      })
  }

  findAllocationsDepenseByBudget() {
    this.showSpinner = true;
    this.allocationSrv.findDepenseByBudget(this.budget.id)
      .subscribe((data: any) => {
        data.allocationDepenses.forEach(allocation => {
          allocation.compte.bindLabel = allocation.compte.numero + ' - ' + allocation.compte.libelle;
        });
        this.depenseAllocationToUpdate = data.allocationDepenses;
        this.totalRecetteRestant = parseFloat(data.totalRecette);
        this.totalDepense = parseFloat(data.totalDepense)
        this.totalRecette = this.totalRecetteRestant + this.totalDepense;
        this.onAmountTypedForUpdate('first', 'depense');
        this.showSpinner = false;
      }, error => {
        this.compteSrv.httpSrv.handleError(error);
        this.showSpinner = false;
      })
  }

  updateAllocations() {
    this.allocationSrv.updateMultipleAndSrcFinAmount(this.recetteAllocationToUpdate)
      .subscribe((data: any) => {
        this.selectedExerciceSrcFinUpdate.montantRestant
          = this.cashRemaining;
        this.exerciceSourceFinancements.forEach(esf => {
          if (esf.id === this.selectedExerciceSrcFinUpdate.id) {
            esf.montantRestant = this.selectedExerciceSrcFinUpdate.montantRestant;
          }
        });
        if (this.selectedExerciceSrcFinUpdate.montantRestant === 0) {
          this.exerciceSourceFinancements = this.exerciceSourceFinancements.filter(esf => esf.id !== this.selectedExerciceSrcFinUpdate.id);
        } else {
          if (this.exerciceSourceFinancements.filter(esf => esf.id === this.selectedExerciceSrcFinUpdate.id).length === 0) {
            this.exerciceSourceFinancements.push(this.selectedExerciceSrcFinUpdate);
          }
        }
        this.closeModal('update');
        this.refreshTreeTable();
        this.findAllExerciceSourceFinancement();
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
      })
  }

  updateAllocationDepenses() {
    this.allocationSrv.updateMultipleDepense(this.depenseAllocationToUpdate)
      .subscribe((data: any) => {
        this.closeModal('update', 'depense');
        this.refreshTreeTable();
      }, error => {
        this.allocationSrv.httpSrv.handleError(error);
      })
  }
}

