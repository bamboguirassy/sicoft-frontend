import { Component, OnInit } from '@angular/core';
import { TypePassation } from '../type_passation';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePassationService } from '../type_passation.service';
import { type_passationColumns, allowedTypePassationFieldsForFilter } from '../type_passation.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-type_passation-list',
  templateUrl: './type_passation-list.component.html',
  styleUrls: ['./type_passation-list.component.scss']
})
export class TypePassationListComponent implements OnInit {

  type_passations: TypePassation[] = [];
  selectedTypePassations: TypePassation[];
  selectedTypePassation: TypePassation;
  clonedTypePassations: TypePassation[];

  cMenuItems: MenuItem[]=[];

  tableColumns = type_passationColumns;
  //allowed fields for filter
  globalFilterFields = allowedTypePassationFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public type_passationSrv: TypePassationService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('TypePassation')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewTypePassation(this.selectedTypePassation) });
    }
    if(this.authSrv.checkEditAccess('TypePassation')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editTypePassation(this.selectedTypePassation) })
    }
    if(this.authSrv.checkCloneAccess('TypePassation')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneTypePassation(this.selectedTypePassation) })
    }
    if(this.authSrv.checkDeleteAccess('TypePassation')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteTypePassation(this.selectedTypePassation) })
    }

    this.type_passations = this.activatedRoute.snapshot.data['type_passations'];
  }

  viewTypePassation(type_passation: TypePassation) {
      this.router.navigate([this.type_passationSrv.getRoutePrefix(), type_passation.id]);

  }

  editTypePassation(type_passation: TypePassation) {
      this.router.navigate([this.type_passationSrv.getRoutePrefix(), type_passation.id, 'edit']);
  }

  cloneTypePassation(type_passation: TypePassation) {
      this.router.navigate([this.type_passationSrv.getRoutePrefix(), type_passation.id, 'clone']);
  }

  deleteTypePassation(type_passation: TypePassation) {
      this.type_passationSrv.remove(type_passation)
        .subscribe(data => this.refreshList(), error => this.type_passationSrv.httpSrv.handleError(error));
  }

  deleteSelectedTypePassations(type_passation: TypePassation) {
      if (this.selectedTypePassations) {
        this.type_passationSrv.removeSelection(this.selectedTypePassations)
          .subscribe(data => this.refreshList(), error => this.type_passationSrv.httpSrv.handleError(error));
      } else {
        this.type_passationSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.type_passationSrv.findAll()
      .subscribe((data: any) => this.type_passations = data, error => this.type_passationSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.type_passations, 'type_passations');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.type_passations);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}