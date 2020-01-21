import { Component, OnInit } from '@angular/core';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { EntiteService } from '../entite.service';
import { entiteColumns, allowedEntiteFieldsForFilter } from '../entite.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-entite-list',
  templateUrl: './entite-list.component.html',
  styleUrls: ['./entite-list.component.scss']
})
export class EntiteListComponent implements OnInit {

  entites: Entite[] = [];
  selectedEntites: Entite[];
  selectedEntite: Entite;
  clonedEntites: Entite[];

  cMenuItems: MenuItem[]=[];

  tableColumns = entiteColumns;
  //allowed fields for filter
  globalFilterFields = allowedEntiteFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public entiteSrv: EntiteService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('Entite')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewEntite(this.selectedEntite) });
    }
    if(this.authSrv.checkEditAccess('Entite')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editEntite(this.selectedEntite) })
    }
    if(this.authSrv.checkCloneAccess('Entite')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneEntite(this.selectedEntite) })
    }
    if(this.authSrv.checkDeleteAccess('Entite')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteEntite(this.selectedEntite) })
    }

    this.entites = this.activatedRoute.snapshot.data['entites'];
  }

  viewEntite(entite: Entite) {
      this.router.navigate([this.entiteSrv.getRoutePrefix(), entite.id]);

  }

  editEntite(entite: Entite) {
      this.router.navigate([this.entiteSrv.getRoutePrefix(), entite.id, 'edit']);
  }

  cloneEntite(entite: Entite) {
      this.router.navigate([this.entiteSrv.getRoutePrefix(), entite.id, 'clone']);
  }

  deleteEntite(entite: Entite) {
      this.entiteSrv.remove(entite)
        .subscribe(data => this.refreshList(), error => this.entiteSrv.httpSrv.handleError(error));
  }

  deleteSelectedEntites(entite: Entite) {
      if (this.selectedEntites) {
        this.entiteSrv.removeSelection(this.selectedEntites)
          .subscribe(data => this.refreshList(), error => this.entiteSrv.httpSrv.handleError(error));
      } else {
        this.entiteSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.entiteSrv.findAll()
      .subscribe((data: any) => this.entites = data, error => this.entiteSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.entites, 'entites');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.entites);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}