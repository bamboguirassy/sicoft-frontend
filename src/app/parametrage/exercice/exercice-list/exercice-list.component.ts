import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from '../exercice.service';
import {
  exerciceColumns,
  allowedExerciceFieldsForFilter
} from '../exercice.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.component.html',
  styleUrls: ['./exercice-list.component.scss']
})
export class ExerciceListComponent implements OnInit {
  exercices: Exercice[] = [];
  exercicePrecedent: Exercice;
  confirmation: Boolean;
  selectedExercices: Exercice[];
  selectedExercice: Exercice;
  clonedExercices: Exercice[];

  cMenuItems: MenuItem[] = [];

  tableColumns = exerciceColumns;
  // allowed fields for filter
  globalFilterFields = allowedExerciceFieldsForFilter;
  @ViewChild('confirm', { static: false }) public modalContentRef: TemplateRef<
    any
  >;

  constructor(
    private activatedRoute: ActivatedRoute,
    public exerciceSrv: ExerciceService,
    public exportSrv: ExportService,
    private router: Router,
    public authSrv: AuthService,
    private modalSrv: NgbModal,
    public notificationSrv: NotificationService
  ) {}

  ngOnInit() {
    if (this.authSrv.checkShowAccess('Exercice')) {
      this.cMenuItems.push({
        label: 'Afficher détails',
        icon: 'pi pi-eye',
        command: event => this.viewExercice(this.selectedExercice)
      });
    }
    if (this.authSrv.checkEditAccess('Exercice')) {
      this.cMenuItems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: event => this.editExercice(this.selectedExercice)
      });
    }
    if (this.authSrv.checkCloneAccess('Exercice')) {
      this.cMenuItems.push({
        label: 'Cloner',
        icon: 'pi pi-clone',
        command: event => this.cloneExercice(this.selectedExercice)
      });
    }
    if (this.authSrv.checkDeleteAccess('Exercice')) {
      this.cMenuItems.push({
        label: 'Supprimer',
        icon: 'pi pi-times',
        command: event => this.deleteExercice(this.selectedExercice)
      });
    }

    this.exercices = this.activatedRoute.snapshot.data['exercices'];
    console.log(this.selectedExercices);
  }

  viewExercice(exercice: Exercice) {
    this.router.navigate([this.exerciceSrv.getRoutePrefix(), exercice.id]);
  }

  editExercice(exercice: Exercice) {
    this.router.navigate([
      this.exerciceSrv.getRoutePrefix(),
      exercice.id,
      'edit'
    ]);
  }

  cloneExercice(exercice: Exercice) {
    this.router.navigate([
      this.exerciceSrv.getRoutePrefix(),
      exercice.id,
      'clone'
    ]);
  }

  deleteAfterConfirmation(exercice: Exercice) {
      this.exerciceSrv.remove(exercice).subscribe(
        () => {
          this.refreshList(),
          this.modalSrv.dismissAll();
        },
        error => this.exerciceSrv.httpSrv.handleError(error)
      );
  }

  deleteExercice(exercice: Exercice) {
    this.exerciceSrv.findExercicePrecedent(exercice).subscribe(
      (data: any) => {
        this.exercicePrecedent = data;
        this.confirmation = true;
        this.toggleConfirmModal(this.modalContentRef);
      }, 
      error => {
        if (error.error.code === 404) {
          this.confirmation = false;
          this.toggleConfirmModal(this.modalContentRef);
        }
      }
    );
  }

  // deleteSelectedExercices(exercice: Exercice) {
  //   if (this.selectedExercices) {
  //     this.exerciceSrv.removeSelection(this.selectedExercices).subscribe(
  //       data => this.refreshList(),
  //       error => this.exerciceSrv.httpSrv.handleError(error)
  //     );
  //   } else {
  //     this.exerciceSrv.httpSrv.notificationSrv.showWarning(
  //       'Selectionner au moins un élement'
  //     );
  //   }
  // }

  refreshList() {
    this.exerciceSrv.findAll().subscribe(
      (data: any) => (this.exercices = data),
      error => this.exerciceSrv.httpSrv.handleError(error)
    );
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.exercices, 'exercices');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.exercices);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

  public toggleConfirmModal(content: TemplateRef<any>) {
    this.modalSrv.open(content, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true
    });
  }

  dissmissModal(param: string) {
    this.modalSrv.dismissAll(param);
  }
}
