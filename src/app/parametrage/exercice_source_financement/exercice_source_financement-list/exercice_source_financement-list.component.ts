import { Component, OnInit } from '@angular/core';
import { ExerciceSourceFinancement } from '../exercice_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceSourceFinancementService } from '../exercice_source_financement.service';
import { exercice_source_financementColumns, allowedExerciceSourceFinancementFieldsForFilter } from '../exercice_source_financement.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-exercice_source_financement-list',
  templateUrl: './exercice_source_financement-list.component.html',
  styleUrls: ['./exercice_source_financement-list.component.scss']
})
export class ExerciceSourceFinancementListComponent implements OnInit {

  exercice_source_financements: ExerciceSourceFinancement[] = [];
  selectedExerciceSourceFinancements: ExerciceSourceFinancement[];
  selectedExerciceSourceFinancement: ExerciceSourceFinancement;
  clonedExerciceSourceFinancements: ExerciceSourceFinancement[];

  cMenuItems: MenuItem[]=[];

  tableColumns = exercice_source_financementColumns;
  //allowed fields for filter
  globalFilterFields = allowedExerciceSourceFinancementFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public exercice_source_financementSrv: ExerciceSourceFinancementService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('ExerciceSourceFinancement')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewExerciceSourceFinancement(this.selectedExerciceSourceFinancement) });
    }
    if(this.authSrv.checkEditAccess('ExerciceSourceFinancement')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editExerciceSourceFinancement(this.selectedExerciceSourceFinancement) })
    }
    if(this.authSrv.checkCloneAccess('ExerciceSourceFinancement')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneExerciceSourceFinancement(this.selectedExerciceSourceFinancement) })
    }
    if(this.authSrv.checkDeleteAccess('ExerciceSourceFinancement')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteExerciceSourceFinancement(this.selectedExerciceSourceFinancement) })
    }

    this.exercice_source_financements = this.activatedRoute.snapshot.data['exercice_source_financements'];
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

  deleteExerciceSourceFinancement(exercice_source_financement: ExerciceSourceFinancement) {
      this.exercice_source_financementSrv.remove(exercice_source_financement)
        .subscribe(data => this.refreshList(), error => this.exercice_source_financementSrv.httpSrv.handleError(error));
  }

  deleteSelectedExerciceSourceFinancements(exercice_source_financement: ExerciceSourceFinancement) {
    if(this.selectedExerciceSourceFinancements){
      this.exercice_source_financementSrv.removeSelection(this.selectedExerciceSourceFinancements)
      .subscribe(data => this.refreshList(), error => this.exercice_source_financementSrv.httpSrv.handleError(error));
      } else {
      this.exercice_source_financementSrv.httpSrv.notificationSrv.showError("Selectionner au moins un élement à supprimer");
    }
  }

  refreshList() {
    this.exercice_source_financementSrv.findAll()
      .subscribe((data: any) => this.exercice_source_financements = data, error => this.exercice_source_financementSrv.httpSrv.handleError(error));
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

}