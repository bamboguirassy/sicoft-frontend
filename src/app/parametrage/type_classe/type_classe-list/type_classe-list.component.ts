import { Component, OnInit } from '@angular/core';
import { TypeClasse } from '../type_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeClasseService } from '../type_classe.service';
import { type_classeColumns, allowedTypeClasseFieldsForFilter } from '../type_classe.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-type_classe-list',
  templateUrl: './type_classe-list.component.html',
  styleUrls: ['./type_classe-list.component.scss']
})
export class TypeClasseListComponent implements OnInit {

  type_classes: TypeClasse[] = [];
  selectedTypeClasses: TypeClasse[];
  selectedTypeClasse: TypeClasse;
  clonedTypeClasses: TypeClasse[];

  cMenuItems: MenuItem[]=[];

  tableColumns = type_classeColumns;
  //allowed fields for filter
  globalFilterFields = allowedTypeClasseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public type_classeSrv: TypeClasseService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('TypeClasse')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewTypeClasse(this.selectedTypeClasse) });
    }
    if(this.authSrv.checkEditAccess('TypeClasse')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editTypeClasse(this.selectedTypeClasse) })
    }
    if(this.authSrv.checkCloneAccess('TypeClasse')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneTypeClasse(this.selectedTypeClasse) })
    }
    if(this.authSrv.checkDeleteAccess('TypeClasse')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteTypeClasse(this.selectedTypeClasse) })
    }

    this.type_classes = this.activatedRoute.snapshot.data['type_classes'];
  }

  viewTypeClasse(type_classe: TypeClasse) {
      this.router.navigate([this.type_classeSrv.getRoutePrefix(), type_classe.id]);

  }

  editTypeClasse(type_classe: TypeClasse) {
      this.router.navigate([this.type_classeSrv.getRoutePrefix(), type_classe.id, 'edit']);
  }

  cloneTypeClasse(type_classe: TypeClasse) {
      this.router.navigate([this.type_classeSrv.getRoutePrefix(), type_classe.id, 'clone']);
  }

  deleteTypeClasse(type_classe: TypeClasse) {
      this.type_classeSrv.remove(type_classe)
        .subscribe(data => this.refreshList(), error => this.type_classeSrv.httpSrv.handleError(error));
  }

  deleteSelectedTypeClasses(type_classe: TypeClasse) {
      if (this.selectedTypeClasses) {
        this.type_classeSrv.removeSelection(this.selectedTypeClasses)
          .subscribe(data => this.refreshList(), error => this.type_classeSrv.httpSrv.handleError(error));
      } else {
        this.type_classeSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.type_classeSrv.findAll()
      .subscribe((data: any) => this.type_classes = data, error => this.type_classeSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.type_classes, 'type_classes');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.type_classes);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}