import { Component, OnInit } from '@angular/core';
import { CategorieClasse } from '../categorie_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieClasseService } from '../categorie_classe.service';
import { categorie_classeColumns, allowedCategorieClasseFieldsForFilter } from '../categorie_classe.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-categorie_classe-list',
  templateUrl: './categorie_classe-list.component.html',
  styleUrls: ['./categorie_classe-list.component.scss']
})
export class CategorieClasseListComponent implements OnInit {

  categorie_classes: CategorieClasse[] = [];
  selectedCategorieClasses: CategorieClasse[];
  selectedCategorieClasse: CategorieClasse;
  clonedCategorieClasses: CategorieClasse[];

  cMenuItems: MenuItem[]=[];

  tableColumns = categorie_classeColumns;
  //allowed fields for filter
  globalFilterFields = allowedCategorieClasseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public categorie_classeSrv: CategorieClasseService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('CategorieClasse')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewCategorieClasse(this.selectedCategorieClasse) });
    }
    if(this.authSrv.checkEditAccess('CategorieClasse')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editCategorieClasse(this.selectedCategorieClasse) })
    }
    if(this.authSrv.checkCloneAccess('CategorieClasse')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneCategorieClasse(this.selectedCategorieClasse) })
    }
    if(this.authSrv.checkDeleteAccess('CategorieClasse')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteCategorieClasse(this.selectedCategorieClasse) })
    }

    this.categorie_classes = this.activatedRoute.snapshot.data['categorie_classes'];
  }

  viewCategorieClasse(categorie_classe: CategorieClasse) {
      this.router.navigate([this.categorie_classeSrv.getRoutePrefix(), categorie_classe.id]);

  }

  editCategorieClasse(categorie_classe: CategorieClasse) {
      this.router.navigate([this.categorie_classeSrv.getRoutePrefix(), categorie_classe.id, 'edit']);
  }

  cloneCategorieClasse(categorie_classe: CategorieClasse) {
      this.router.navigate([this.categorie_classeSrv.getRoutePrefix(), categorie_classe.id, 'clone']);
  }

  deleteCategorieClasse(categorie_classe: CategorieClasse) {
      this.categorie_classeSrv.remove(categorie_classe)
        .subscribe(data => this.refreshList(), error => this.categorie_classeSrv.httpSrv.handleError(error));
  }

  deleteSelectedCategorieClasses(categorie_classe: CategorieClasse) {
      if (this.selectedCategorieClasses) {
        this.categorie_classeSrv.removeSelection(this.selectedCategorieClasses)
          .subscribe(data => this.refreshList(), error => this.categorie_classeSrv.httpSrv.handleError(error));
      } else {
        this.categorie_classeSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.categorie_classeSrv.findAll()
      .subscribe((data: any) => this.categorie_classes = data, error => this.categorie_classeSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.categorie_classes, 'categorie_classes');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.categorie_classes);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}