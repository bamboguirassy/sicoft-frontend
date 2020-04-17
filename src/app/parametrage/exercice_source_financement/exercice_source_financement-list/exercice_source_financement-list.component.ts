import { Component, OnInit, Input } from '@angular/core';
import { ExerciceSourceFinancement } from '../exercice_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceSourceFinancementService } from '../exercice_source_financement.service';
// tslint:disable-next-line:max-line-length
import { exercice_source_financementColumns, allowedExerciceSourceFinancementFieldsForFilter } from '../exercice_source_financement.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Exercice } from 'app/parametrage/exercice/exercice';
import { Entite } from 'app/parametrage/entite/entite';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from 'app/gestion-budget/budget/budget';
import { BudgetService } from 'app/gestion-budget/budget/budget.service';
import { ExerciceService } from 'app/parametrage/exercice/exercice.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-exercice_source_financement-list',
  templateUrl: './exercice_source_financement-list.component.html',
  styleUrls: ['./exercice_source_financement-list.component.scss']
})
export class ExerciceSourceFinancementListComponent implements OnInit {

  exercice_source_financements: ExerciceSourceFinancement[] = [];
  exerciceSourceFinancements: ExerciceSourceFinancement[] = []
  selectedExerciceSourceFinancements: ExerciceSourceFinancement[];
  selectedExerciceSourceFinancement: ExerciceSourceFinancement;
  clonedExerciceSourceFinancements: ExerciceSourceFinancement[];
  verouille: any;
  exercice: Exercice;
  exercices: Exercice[] = [];
  entites: Entite[] = [];
  budgets: Budget[] = [];
  existeBudget = false;
  tempTabParamMontant: any;
  exerciceSouceFinancement: ExerciceSourceFinancement;
  sourceFinancements: ExerciceSourceFinancement[];
  paramTabExerciceSourceFinancements: any;
  tab_choiceDatas: ExerciceSourceFinancement[];
  tabParamMontant: ExerciceSourceFinancement[] = [];
  display = false;
  step = 0;
  part3 = 0;
  activeField = 0;
  activeModif1 = 0;
  activeModif2 = 0;
  closeResult: string;

  cMenuItems: MenuItem[] = [];

  tableColumns = exercice_source_financementColumns;
  // allowed fields for filter
  globalFilterFields = allowedExerciceSourceFinancementFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public exercice_source_financementSrv: ExerciceSourceFinancementService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService,
    public budgetSvr: BudgetService, public exerciceSrv: ExerciceService,
    public modalService: NgbModal, ) {
    this.exerciceSouceFinancement = new ExerciceSourceFinancement();
  }

  ngOnInit() {
    if (this.authSrv.checkShowAccess('ExerciceSourceFinancement')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewExerciceSourceFinancement(this.selectedExerciceSourceFinancement) });
    }
    if (this.authSrv.checkEditAccess('ExerciceSourceFinancement')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editExerciceSourceFinancement(this.selectedExerciceSourceFinancement) })
    }
    if (this.authSrv.checkCloneAccess('ExerciceSourceFinancement')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneExerciceSourceFinancement(this.selectedExerciceSourceFinancement) })
    }
    if (this.authSrv.checkDeleteAccess('ExerciceSourceFinancement')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteExerciceSourceFinancement(this.selectedExerciceSourceFinancement) })
    }

    this.exercice_source_financements = this.activatedRoute.snapshot.data['exercice_source_financements'];
    this.exercices = this.activatedRoute.snapshot.data['exercices'];
    // this.entites = this.activatedRoute.snapshot.data['entites'];
    // this.budgets = this.activatedRoute.snapshot.data['budgets'];
    // this.findExerciceEncours();
  }

  viewExerciceSourceFinancement(exercice_source_financement: ExerciceSourceFinancement) {
    this.router.navigate([this.exercice_source_financementSrv.getRoutePrefix(), exercice_source_financement.id]);

  }

  editExerciceSourceFinancement(exercice_source_financement: ExerciceSourceFinancement) {
    this.router.navigate([this.exercice_source_financementSrv.getRoutePrefix(), exercice_source_financement.id, 'edit']);
  }

  cloneExerciceSourceFinancement(exercice_source_financement: ExerciceSourceFinancement) {
    this.router.navigate([this.exercice_source_financementSrv.getRoutePrefix(), exercice_source_financement.id, 'clone']);
  }

  deleteSelectedExerciceSourceFinancements(exercice_source_financement: ExerciceSourceFinancement) {
    if (this.selectedExerciceSourceFinancements) {
      this.exercice_source_financementSrv.removeSelection(this.selectedExerciceSourceFinancements)
        .subscribe(data => this.refreshList(), error => this.exercice_source_financementSrv.httpSrv.handleError(error));
    } else {
      this.exercice_source_financementSrv.httpSrv.notificationSrv.showError('Selectionner au moins un élement à supprimer');
    }
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.exercice_source_financements, 'exercice_source_financements');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.exercice_source_financements);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }
  refreshList() {
    this.exercice_source_financementSrv.findExerciceSourceFinancementByBudget(this.exerciceSouceFinancement.budget)
      .subscribe((data: any) => {
      this.paramTabExerciceSourceFinancements = data;
        this.tempTabParamMontant = this.paramTabExerciceSourceFinancements;
      }
        , error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  findExerciceEncours() {
    this.exerciceSrv.findExerciceEncours()
      .subscribe(
        (data: any) => { this.exercices = data; },
        error => this.notificationSrv.showError(error)
      );
  }

  findSourceFinancementDisponible() {
    this.sourceFinancements = [];
    // this.tabExerciceSourceFinancements = [];
    this.tab_choiceDatas = [];
    this.step = 1;
    this.activeField = 1;
    this.activeModif1 = 1;
    // let tempExercice = this.exerciceSouceFinancement.exercice;
    const tempBudget = this.exerciceSouceFinancement.budget;
    this.verouille = this.exerciceSouceFinancement.budget.verrouille;

    /* if (this.exerciceSouceFinancement.exercice) {
       this.exerciceSouceFinancement.exercice = this.exerciceSouceFinancement.exercice.id;
     }*/

    if (this.exerciceSouceFinancement.budget) {
      this.exerciceSouceFinancement.budget = this.exerciceSouceFinancement.budget.id;
    }
    this.exercice_source_financementSrv.findSourceFinancementDisponible(this.exerciceSouceFinancement.budget)
      .subscribe(
        (data: any) => {
        this.sourceFinancements = data;

          this.refreshList();
          // this.exerciceSouceFinancement.exercice = tempExercice;
          this.exerciceSouceFinancement.budget = tempBudget;
          if (!this.verouille) {
            this.step = 4;
          }

        },
        error => this.exercice_source_financementSrv.httpSrv.handleError(error)
      );

  }

  findBudgetByEntiteAccessAndExercice(event) {
    this.existeBudget = false;
    if (event.value == null) {
      this.budgetSvr.findAll()
        .subscribe(
          (data: any) => this.budgets = data,
          error => this.exercice_source_financementSrv.httpSrv.handleError(error)
        );
    } else {
      this.exercice = event.value;
      this.budgetSvr.findBudgetByEntiteAccessAndExercice(this.exercice.id)
        .subscribe(
          (data: any) => {
          this.budgets = data;
            if (this.budgets.length === 0) {
              this.existeBudget = true;
            }
          },
          error => this.budgetSvr.httpSrv.handleError(error)
        );
    }
  }

  updateField() {
    this.activeField = 0;
    this.activeModif1 = 0;
  }
  previousPickList() {
    this.activeField = 0;
    this.activeModif1 = 0;
    this.step = 4;
    this.part3 = 0;
  }
  activePicklist() {
    this.activeModif2 = 1;
    this.step = 1;
    this.part3 = 0;
  }
  activeStepParamMontant() {
    // this.findSourceFinancementByExerciceAndEntite();
    this.step = 4;
    this.part3 = 1;
    this.tab_choiceDatas.forEach(element => {
      this.tabParamMontant = this.tabParamMontant.filter(data => data.id !== element.id);
      this.tabParamMontant.push(element);
    });
  }
  previousParamMontant() {
    // console.log(this.tab_choiceDatas);
    this.tabParamMontant = [];
    this.activeModif2 = 1;
    this.step = 1;
    this.part3 = 0;
  }
  savaExerciceSourceFinancement(tab_choiceData) {
    // let tempExercice = this.exerciceSouceFinancement.exercice;
    const tempBudget = this.exerciceSouceFinancement.budget;
    this.exerciceSouceFinancement.budget = this.exerciceSouceFinancement.budget.id;
    // this.exerciceSouceFinancement.exercice = this.exerciceSouceFinancement.exercice.id;
    this.exerciceSouceFinancement.sourceFinancement = tab_choiceData.id;
    this.exerciceSouceFinancement.montant = tab_choiceData.montant;
    this.exercice_source_financementSrv.create(this.exerciceSouceFinancement)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Exercice Source-Financement créé avec succès');
        this.refreshList();
        // this.exerciceSouceFinancement.exercice = tempExercice;
        this.exerciceSouceFinancement.budget = tempBudget;
        this.tab_choiceDatas = [];
      }, error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  deletedItemSelect(tab_choiceData) {
    this.tab_choiceDatas = this.tab_choiceDatas.filter(data => data.id !== tab_choiceData.id);
    this.tabParamMontant = this.tabParamMontant.filter(data => data.id !== tab_choiceData.id);
    this.sourceFinancements.push(tab_choiceData);
    // this.part3 = 0;
  }
  createMultiple(tab_choiceDatas) {
    let exerciceSouceFinancementItem: ExerciceSourceFinancement;
    // let tempExercice = this.exerciceSouceFinancement.exercice;
    const tempBudget = this.exerciceSouceFinancement.budget;
    this.exerciceSourceFinancements = [];
    tab_choiceDatas.forEach(element => {
      exerciceSouceFinancementItem = new ExerciceSourceFinancement();
      // exerciceSouceFinancementItem.exercice = tempExercice.id;
      exerciceSouceFinancementItem.budget = tempBudget.id;
      exerciceSouceFinancementItem.sourceFinancement = element.id;
      exerciceSouceFinancementItem.montant = element.montant;
      this.exerciceSourceFinancements.push(exerciceSouceFinancementItem);
    });
    this.exercice_source_financementSrv.createMultiple(this.exerciceSourceFinancements)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Enregistrement réussi');
        // this.exerciceSouceFinancement.exercice = tempExercice.id;
        this.exerciceSouceFinancement.budget = tempBudget.id;
        this.refreshList();
        this.part3 = 0;
        // this.exerciceSouceFinancement.exercice = tempExercice;
        this.exerciceSouceFinancement.budget = tempBudget;
        this.tab_choiceDatas = [];
        this.tabParamMontant = [];
      }, error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  deleteExerciceSourceFinancement(exerciceSourceFin: ExerciceSourceFinancement) {
    this.exercice_source_financementSrv.remove(exerciceSourceFin)
      .subscribe(data => {
        ;
        // tslint:disable-next-line:max-line-length
        // this.paramTabExerciceSourceFinancements.tabExerciceSourceFinancements = this.paramTabExerciceSourceFinancements.tabExerciceSourceFinancements.filter(data => data.id !== exerciceSourceFin.id);

      },
        error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  updateExerciceSourceFinancement(exerciceSourceFin) {
    this.exercice_source_financementSrv.update(exerciceSourceFin)
      .subscribe((data: any) => {

      },
        error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  modalUpdateMontant(exerciceSourceFin) {
    // let tempExerice = this.exerciceSouceFinancement.exercice;
    const tempBudget = this.exerciceSouceFinancement.budget;
    Swal.fire({

      title: 'Saisir le nouveau montant',
      text: 'Source Financement: ' + exerciceSourceFin.sourceFinancement.libelle + ',' + ' Montant: ' + exerciceSourceFin.montant,
      input: 'text',
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enregistrer',
    }).then((result) => {
      if (result.value === ' ') {
        Swal.fire({
          icon: 'error',
          titleText: 'Aucun montant saisi!',
          showCancelButton: true,
          showConfirmButton: false,
        });
      }
      if (result.value) {
        exerciceSourceFin.montant = result.value;
        this.updateExerciceSourceFinancement(exerciceSourceFin);
        // this.exerciceSouceFinancement.exercice = tempExerice.id;
        this.exerciceSouceFinancement.budget = tempBudget.id;
        this.refreshList();
        // this.exerciceSouceFinancement.exercice = tempExerice;
        this.exerciceSouceFinancement.budget = tempBudget;
      }

    })
  }

  handleConfirmeDeleted(exerciceSourceFin) {
    Swal.fire({
      title: 'Etes vous sure de vouloir supprimer?',
      text: 'Source Financement: ' + exerciceSourceFin.sourceFinancement.libelle + ',' + ' Montant: ' + exerciceSourceFin.montant,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer'
    }).then((result) => {
      if (result.value) {
        this.deleteExerciceSourceFinancement(exerciceSourceFin);
        // tslint:disable-next-line:max-line-length
        this.paramTabExerciceSourceFinancements.tabExerciceSourceFinancements = this.paramTabExerciceSourceFinancements.tabExerciceSourceFinancements.filter(data => data.id !== exerciceSourceFin.id);
        this.sourceFinancements.push(exerciceSourceFin.sourceFinancement);
        // tslint:disable-next-line:max-line-length
        this.paramTabExerciceSourceFinancements.montantTotal = this.paramTabExerciceSourceFinancements.montantTotal - exerciceSourceFin.montant;
        // this.tempTabParamMontant.tabExerciceSourceFinancements.length = this.tempTabParamMontant.tabExerciceSourceFinancements.length-1;
        if (this.tempTabParamMontant.tabExerciceSourceFinancements.length === 0) {
          this.step = 1;
        }
      }
    })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
