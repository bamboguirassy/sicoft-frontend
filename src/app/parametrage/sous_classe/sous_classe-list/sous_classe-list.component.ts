import { Component, OnInit } from '@angular/core';
import { SousClasse } from '../sous_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { SousClasseService } from '../sous_classe.service';
import { sous_classeColumns, allowedSousClasseFieldsForFilter } from '../sous_classe.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-sous_classe-list',
  templateUrl: './sous_classe-list.component.html',
  styleUrls: ['./sous_classe-list.component.scss']
})
export class SousClasseListComponent implements OnInit {

  sous_classes: SousClasse[] = [];
  selectedSousClasses: SousClasse[];
  selectedSousClasse: SousClasse;
  clonedSousClasses: SousClasse[];

  cMenuItems: MenuItem[]=[];

  tableColumns = sous_classeColumns;
  //allowed fields for filter
  globalFilterFields = allowedSousClasseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public sous_classeSrv: SousClasseService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('SousClasse')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewSousClasse(this.selectedSousClasse) });
    }
    if(this.authSrv.checkEditAccess('SousClasse')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editSousClasse(this.selectedSousClasse) })
    }
    if(this.authSrv.checkCloneAccess('SousClasse')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneSousClasse(this.selectedSousClasse) })
    }
    if(this.authSrv.checkDeleteAccess('SousClasse')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteSousClasse(this.selectedSousClasse) })
    }

    this.sous_classes = this.activatedRoute.snapshot.data['sous_classes'];
  }

  viewSousClasse(sous_classe: SousClasse) {
      this.router.navigate([this.sous_classeSrv.getRoutePrefix(), sous_classe.id]);

  }

  editSousClasse(sous_classe: SousClasse) {
      this.router.navigate([this.sous_classeSrv.getRoutePrefix(), sous_classe.id, 'edit']);
  }

  cloneSousClasse(sous_classe: SousClasse) {
      this.router.navigate([this.sous_classeSrv.getRoutePrefix(), sous_classe.id, 'clone']);
  }

  deleteSousClasse(sous_classe: SousClasse) {
      this.sous_classeSrv.remove(sous_classe)
        .subscribe(data => this.refreshList(), error => this.sous_classeSrv.httpSrv.handleError(error));
  }

  deleteSelectedSousClasses(sous_classe: SousClasse) {
    if(this.selectedSousClasses){
      this.sous_classeSrv.removeSelection(this.selectedSousClasses)
      .subscribe(data => this.refreshList(), error => this.sous_classeSrv.httpSrv.handleError(error));
      } else {
      this.sous_classeSrv.httpSrv.notificationSrv.showError("Selectionner au moins un élement à supprimer");
    }
  }

  refreshList() {
    this.sous_classeSrv.findAll()
      .subscribe((data: any) => this.sous_classes = data, error => this.sous_classeSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.sous_classes, 'sous_classes');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.sous_classes);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}