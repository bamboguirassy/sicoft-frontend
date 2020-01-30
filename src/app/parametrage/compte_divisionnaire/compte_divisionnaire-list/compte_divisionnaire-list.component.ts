import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { compte_divisionnaireColumns, allowedCompteDivisionnaireFieldsForFilter } from '../compte_divisionnaire.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { CompteDivisionnaire } from '../compte_divisionnaire';
import { CompteDivisionnaireService } from '../compte_divisionnaire.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-compte_divisionnaire-list',
  templateUrl: './compte_divisionnaire-list.component.html',
  styleUrls: ['./compte_divisionnaire-list.component.scss']
})
export class CompteDivisionnaireListComponent implements OnInit {

  compte_divisionnaires: CompteDivisionnaire[] = [];
  selectedCompteDivisionnaires: CompteDivisionnaire[];
  selectedCompteDivisionnaire: CompteDivisionnaire;
  clonedCompteDivisionnaires: CompteDivisionnaire[];

  cMenuItems: MenuItem[]=[];

  tableColumns = compte_divisionnaireColumns;
  //allowed fields for filter
  globalFilterFields = allowedCompteDivisionnaireFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public compte_divisionnaireSrv: CompteDivisionnaireService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('CompteDivisionnaire')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewCompteDivisionnaire(this.selectedCompteDivisionnaire) });
    }
    if(this.authSrv.checkEditAccess('CompteDivisionnaire')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editCompteDivisionnaire(this.selectedCompteDivisionnaire) })
    }
    if(this.authSrv.checkCloneAccess('CompteDivisionnaire')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneCompteDivisionnaire(this.selectedCompteDivisionnaire) })
    }
    if(this.authSrv.checkDeleteAccess('CompteDivisionnaire')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteCompteDivisionnaire(this.selectedCompteDivisionnaire) })
    }

    this.compte_divisionnaires = this.activatedRoute.snapshot.data['compte_divisionnaires'];
  }

  viewCompteDivisionnaire(compte_divisionnaire: CompteDivisionnaire) {
      this.router.navigate([this.compte_divisionnaireSrv.getRoutePrefix(), compte_divisionnaire.id]);

  }

  editCompteDivisionnaire(compte_divisionnaire: CompteDivisionnaire) {
      this.router.navigate([this.compte_divisionnaireSrv.getRoutePrefix(), compte_divisionnaire.id, 'edit']);
  }

  cloneCompteDivisionnaire(compte_divisionnaire: CompteDivisionnaire) {
      this.router.navigate([this.compte_divisionnaireSrv.getRoutePrefix(), compte_divisionnaire.id, 'clone']);
  }

  deleteCompteDivisionnaire(compte_divisionnaire: CompteDivisionnaire) {
      this.compte_divisionnaireSrv.remove(compte_divisionnaire)
        .subscribe(data => this.refreshList(), error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

  deleteSelectedCompteDivisionnaires(compte_divisionnaire: CompteDivisionnaire) {
    if(this.selectedCompteDivisionnaires){
      this.compte_divisionnaireSrv.removeSelection(this.selectedCompteDivisionnaires)
        .subscribe(data => this.refreshList(), error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
    } else {
      this.compte_divisionnaireSrv.httpSrv.notificationSrv.showError("Selectionner au moins un élement à supprimer");
    }
  }

  refreshList() {
    this.compte_divisionnaireSrv.findAll()
      .subscribe((data: any) => this.compte_divisionnaires = data, error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.compte_divisionnaires, 'compte_divisionnaires');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.compte_divisionnaires);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}