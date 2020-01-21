import { Component, OnInit } from '@angular/core';
import { SourceFinancement } from '../source_financement';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceFinancementService } from '../source_financement.service';
import { source_financementColumns, allowedSourceFinancementFieldsForFilter } from '../source_financement.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-source_financement-list',
  templateUrl: './source_financement-list.component.html',
  styleUrls: ['./source_financement-list.component.scss']
})
export class SourceFinancementListComponent implements OnInit {

  source_financements: SourceFinancement[] = [];
  selectedSourceFinancements: SourceFinancement[];
  selectedSourceFinancement: SourceFinancement;
  clonedSourceFinancements: SourceFinancement[];

  cMenuItems: MenuItem[]=[];

  tableColumns = source_financementColumns;
  //allowed fields for filter
  globalFilterFields = allowedSourceFinancementFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public source_financementSrv: SourceFinancementService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('SourceFinancement')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewSourceFinancement(this.selectedSourceFinancement) });
    }
    if(this.authSrv.checkEditAccess('SourceFinancement')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editSourceFinancement(this.selectedSourceFinancement) })
    }
    if(this.authSrv.checkCloneAccess('SourceFinancement')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneSourceFinancement(this.selectedSourceFinancement) })
    }
    if(this.authSrv.checkDeleteAccess('SourceFinancement')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteSourceFinancement(this.selectedSourceFinancement) })
    }

    this.source_financements = this.activatedRoute.snapshot.data['source_financements'];
  }

  viewSourceFinancement(source_financement: SourceFinancement) {
      this.router.navigate([this.source_financementSrv.getRoutePrefix(), source_financement.id]);

  }

  editSourceFinancement(source_financement: SourceFinancement) {
      this.router.navigate([this.source_financementSrv.getRoutePrefix(), source_financement.id, 'edit']);
  }

  cloneSourceFinancement(source_financement: SourceFinancement) {
      this.router.navigate([this.source_financementSrv.getRoutePrefix(), source_financement.id, 'clone']);
  }

  deleteSourceFinancement(source_financement: SourceFinancement) {
      this.source_financementSrv.remove(source_financement)
        .subscribe(data => this.refreshList(), error => this.source_financementSrv.httpSrv.handleError(error));
  }

  deleteSelectedSourceFinancements(source_financement: SourceFinancement) {
      if (this.selectedSourceFinancements) {
        this.source_financementSrv.removeSelection(this.selectedSourceFinancements)
          .subscribe(data => this.refreshList(), error => this.source_financementSrv.httpSrv.handleError(error));
      } else {
        this.source_financementSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.source_financementSrv.findAll()
      .subscribe((data: any) => this.source_financements = data, error => this.source_financementSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.source_financements, 'source_financements');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.source_financements);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}