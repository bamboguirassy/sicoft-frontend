import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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

  deletedItemSubject: Subject<Entite> = new Subject();
  @ViewChild('deletionConfirm', {static: false}) deletionModalContentRef: TemplateRef<any>;
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
    public notificationSrv: NotificationService, public modalSrv: NgbModal
  ) { }

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
    this.typeEntites.unshift(new TypeEntite('Tous les types d\'entité'));
    this.selectedTypeEntite = this.typeEntites[0];
    Object.assign(this.entiteParents, this.entites);
    this.entiteParents.unshift(new Entite('Toutes les entités parents'));
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
    this.toggleConfirmModal();
  }

  deleteSelectedEntites() {
    if (this.selectedEntites) {
      this.entiteSrv.removeSelection(this.selectedEntites).subscribe(
        (data: any) => {
          this.refreshList();
          this.notifyOrgChartComponent(data);
        },
        error => this.entiteSrv.httpSrv.handleError(error)
      );
    } else {
      window.scrollTo(0, 0);
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

  toggleConfirmModal() {
    this.modalSrv.open(this.deletionModalContentRef, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  deleteEntiteAfterConfirmation() {
    this.entiteSrv.remove(this.selectedEntite)
      .subscribe((data: any) => {
        this.refreshList();
        this.notifyOrgChartComponent(data);
        this.modalSrv.dismissAll();
        window.scrollTo(0, 0);
        this.notificationSrv.showInfo('Suppression réussi.');
      }, error => {
        if (error.error.code === 417) {
          window.scrollTo(0, 0);
          this.modalSrv.dismissAll();
          this.notificationSrv.showError('Suppression impossible. L\'Entite n\'est pas autonome.');
        } else {
          this.notificationSrv.showError(error.error.message)
        }
      })
  }

  dissmissModal(param: string) {
    this.modalSrv.dismissAll(param);
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
    if (this.selectedTypeEntite.id !== 0) {
      this.entites = this.originalEntites.filter(entite => {
        return entite.typeEntite.id === this.selectedTypeEntite.id;
      });
    }

    if (this.selectedEntiteParent.id !== 0) {
      this.entites = this.entites.filter(entite => {
        if (entite.entiteParent != null) {
          return entite.entiteParent.id === this.selectedEntiteParent.id;
        }
      });
    }

    if (this.selectedEtat.length === 1 && this.selectedEtat.includes('true')) {
      this.entites = this.entites.filter(entite => {
        return entite.etat === true;
      });
    }

    if (this.selectedEtat.length === 1 && this.selectedEtat.includes('false')) {
      this.entites = this.entites.filter(entite => {
        return entite.etat === false;
      });
    }
  }

  notifyOrgChartComponent(deletedEntite: Entite) {
    this.deletedItemSubject.next(deletedEntite);
  }
}
