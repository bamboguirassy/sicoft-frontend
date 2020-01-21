import { Component, OnInit } from '@angular/core';
import { TypeEntite } from '../type_entite';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEntiteService } from '../type_entite.service';
import { type_entiteColumns, allowedTypeEntiteFieldsForFilter } from '../type_entite.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-type_entite-list',
  templateUrl: './type_entite-list.component.html',
  styleUrls: ['./type_entite-list.component.scss']
})
export class TypeEntiteListComponent implements OnInit {

  type_entites: TypeEntite[] = [];
  selectedTypeEntites: TypeEntite[];
  selectedTypeEntite: TypeEntite;
  clonedTypeEntites: TypeEntite[];

  cMenuItems: MenuItem[]=[];

  tableColumns = type_entiteColumns;
  //allowed fields for filter
  globalFilterFields = allowedTypeEntiteFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public type_entiteSrv: TypeEntiteService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('TypeEntite')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewTypeEntite(this.selectedTypeEntite) });
    }
    if(this.authSrv.checkEditAccess('TypeEntite')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editTypeEntite(this.selectedTypeEntite) })
    }
    if(this.authSrv.checkCloneAccess('TypeEntite')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneTypeEntite(this.selectedTypeEntite) })
    }
    if(this.authSrv.checkDeleteAccess('TypeEntite')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteTypeEntite(this.selectedTypeEntite) })
    }

    this.type_entites = this.activatedRoute.snapshot.data['type_entites'];
  }

  viewTypeEntite(type_entite: TypeEntite) {
      this.router.navigate([this.type_entiteSrv.getRoutePrefix(), type_entite.id]);

  }

  editTypeEntite(type_entite: TypeEntite) {
      this.router.navigate([this.type_entiteSrv.getRoutePrefix(), type_entite.id, 'edit']);
  }

  cloneTypeEntite(type_entite: TypeEntite) {
      this.router.navigate([this.type_entiteSrv.getRoutePrefix(), type_entite.id, 'clone']);
  }

  deleteTypeEntite(type_entite: TypeEntite) {
      this.type_entiteSrv.remove(type_entite)
        .subscribe(data => this.refreshList(), error => this.type_entiteSrv.httpSrv.handleError(error));
  }

  deleteSelectedTypeEntites(type_entite: TypeEntite) {
      if (this.selectedTypeEntites) {
        this.type_entiteSrv.removeSelection(this.selectedTypeEntites)
          .subscribe(data => this.refreshList(), error => this.type_entiteSrv.httpSrv.handleError(error));
      } else {
        this.type_entiteSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.type_entiteSrv.findAll()
      .subscribe((data: any) => this.type_entites = data, error => this.type_entiteSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.type_entites, 'type_entites');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.type_entites);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}