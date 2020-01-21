import { Component, OnInit } from '@angular/core';
import { TypeSourceFinancement } from '../type_source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSourceFinancementService } from '../type_source_financement.service';
import { type_source_financementColumns, allowedTypeSourceFinancementFieldsForFilter } from '../type_source_financement.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-type_source_financement-list',
  templateUrl: './type_source_financement-list.component.html',
  styleUrls: ['./type_source_financement-list.component.scss']
})
export class TypeSourceFinancementListComponent implements OnInit {

  type_source_financements: TypeSourceFinancement[] = [];
  selectedTypeSourceFinancements: TypeSourceFinancement[];
  selectedTypeSourceFinancement: TypeSourceFinancement;
  clonedTypeSourceFinancements: TypeSourceFinancement[];

  cMenuItems: MenuItem[]=[];

  tableColumns = type_source_financementColumns;
  //allowed fields for filter
  globalFilterFields = allowedTypeSourceFinancementFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public type_source_financementSrv: TypeSourceFinancementService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('TypeSourceFinancement')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewTypeSourceFinancement(this.selectedTypeSourceFinancement) });
    }
    if(this.authSrv.checkEditAccess('TypeSourceFinancement')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editTypeSourceFinancement(this.selectedTypeSourceFinancement) })
    }
    if(this.authSrv.checkCloneAccess('TypeSourceFinancement')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneTypeSourceFinancement(this.selectedTypeSourceFinancement) })
    }
    if(this.authSrv.checkDeleteAccess('TypeSourceFinancement')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteTypeSourceFinancement(this.selectedTypeSourceFinancement) })
    }

    this.type_source_financements = this.activatedRoute.snapshot.data['type_source_financements'];
  }

  viewTypeSourceFinancement(type_source_financement: TypeSourceFinancement) {
      this.router.navigate([this.type_source_financementSrv.getRoutePrefix(), type_source_financement.id]);

  }

  editTypeSourceFinancement(type_source_financement: TypeSourceFinancement) {
      this.router.navigate([this.type_source_financementSrv.getRoutePrefix(), type_source_financement.id, 'edit']);
  }

  cloneTypeSourceFinancement(type_source_financement: TypeSourceFinancement) {
      this.router.navigate([this.type_source_financementSrv.getRoutePrefix(), type_source_financement.id, 'clone']);
  }

  deleteTypeSourceFinancement(type_source_financement: TypeSourceFinancement) {
      this.type_source_financementSrv.remove(type_source_financement)
        .subscribe(data => this.refreshList(), error => this.type_source_financementSrv.httpSrv.handleError(error));
  }

  deleteSelectedTypeSourceFinancements(type_source_financement: TypeSourceFinancement) {
      if (this.selectedTypeSourceFinancements) {
        this.type_source_financementSrv.removeSelection(this.selectedTypeSourceFinancements)
          .subscribe(data => this.refreshList(), error => this.type_source_financementSrv.httpSrv.handleError(error));
      } else {
        this.type_source_financementSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.type_source_financementSrv.findAll()
      .subscribe((data: any) => this.type_source_financements = data, error => this.type_source_financementSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.type_source_financements, 'type_source_financements');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.type_source_financements);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}