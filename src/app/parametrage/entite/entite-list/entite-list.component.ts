import { Component, OnInit } from '@angular/core';
import { Entite } from '../entite';
import { ActivatedRoute, Router } from '@angular/router';
import { EntiteService } from '../entite.service';
import { entiteColumns, allowedEntiteFieldsForFilter } from '../entite.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';
import { equal } from 'assert';

@Component({
  selector: 'app-entite-list',
  templateUrl: './entite-list.component.html',
  styleUrls: ['./entite-list.component.scss']
})
export class EntiteListComponent implements OnInit {
  entites: Entite[] = [];
  originalEntites: Entite[] = [];
  filteredEntites: Entite[] = [];
  selectedEntites: Entite[];
  selectedEntite: Entite;
  selectedTypeEntite: TypeEntite;
  selectedEntiteParent: Entite;
  selectedEtat: any[] = [];
  clonedEntites: Entite[];

  cMenuItems: MenuItem[] = [];

  cols: any[];
  tableColumns = entiteColumns;

  etats: any[] = [];
  entiteParents: any[] = [];
  typeEntites: TypeEntite[] = [];
  // allowed fields for filter
  globalFilterFields = allowedEntiteFieldsForFilter;

  constructor(
    private activatedRoute: ActivatedRoute,
    public entiteSrv: EntiteService,
    public exportSrv: ExportService,
    private router: Router,
    public authSrv: AuthService,
    public notificationSrv: NotificationService
  ) {}

  ngOnInit() {
    if (this.authSrv.checkShowAccess('Entite')) {
      this.cMenuItems.push({
        label: 'Afficher détails',
        icon: 'pi pi-eye',
        command: event => this.viewEntite(this.selectedEntite)
      });
    }
    if (this.authSrv.checkEditAccess('Entite')) {
      this.cMenuItems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: event => this.editEntite(this.selectedEntite)
      });
    }
    if (this.authSrv.checkCloneAccess('Entite')) {
      this.cMenuItems.push({
        label: 'Cloner',
        icon: 'pi pi-clone',
        command: event => this.cloneEntite(this.selectedEntite)
      });
    }
    if (this.authSrv.checkDeleteAccess('Entite')) {
      this.cMenuItems.push({
        label: 'Supprimer',
        icon: 'pi pi-times',
        command: event => this.deleteEntite(this.selectedEntite)
      });
    }

    this.entites = this.activatedRoute.snapshot.data['entites'];
    this.typeEntites = this.activatedRoute.snapshot.data['typeEntites'];
    this.typeEntites.unshift(new TypeEntite('Tous les types entité'));
    this.selectedTypeEntite = this.typeEntites[0];
    Object.assign(this.entiteParents, this.entites);
    this.entiteParents.unshift(new Entite('Toutes les entités parent'));
    this.selectedEntiteParent = this.entiteParents[0];
    Object.assign(this.originalEntites, this.entites);
    

    this.etats = [
      { label: 'Actif', value: 'true' },
      { label: 'Inactif', value: 'false' }
    ];
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
    this.entiteSrv.remove(entite).subscribe(
      data => this.refreshList(),
      error => this.entiteSrv.httpSrv.handleError(error)
    );
  }

  deleteSelectedEntites() {
    if (this.selectedEntites) {
      this.entiteSrv.removeSelection(this.selectedEntites).subscribe(
        data => this.refreshList(),
        error => this.entiteSrv.httpSrv.handleError(error)
      );
    } else {
      this.entiteSrv.httpSrv.notificationSrv.showWarning(
        'Selectionner au moins un élement'
      );
    }
  }

  refreshList() {
    this.entiteSrv.findAll().subscribe(
      (data: any) => (this.entites = data),
      error => this.entiteSrv.httpSrv.handleError(error)
    );
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

  filter() {
      Object.assign(this.entites, this.originalEntites);
      if (this.selectedTypeEntite.id !== 0){
        this.entites = this.originalEntites.filter(entite => {
          return entite.typeEntite.id === this.selectedTypeEntite.id;
        });
      }

     if (this.selectedEntiteParent.id !== 0){
        this.entites = this.entites.filter(entite => {
          if (entite.entiteParent != null) {
            return entite.entiteParent.id === this.selectedEntiteParent.id;
          }
        });
      }

      if (this.selectedEtat.includes('true')){
        console.log('we are in true');
        console.log(this.selectedEtat);
        this.entites = this.entites.filter(entite => {
          return entite.etat === true;
        });
      }

      if (this.selectedEtat.includes('false')){
        console.log('we are in false');
        console.log(this.selectedEtat);
        this.entites = this.entites.filter(entite => {
          return entite.etat === false;
        });
      }
      // this.selectedEtat.forEach((etat: any) => {
      //   this.originalEntites.forEach((entite: Entite) => {
      //     if (etat === "true" && entite.etat === true) {
      //       this.entites.push(entite);
      //     }
      //     if (etat === "false" && entite.etat === false) {
      //       this.entites.push(entite);
      //     }
      //   });
      // });
  }
}
