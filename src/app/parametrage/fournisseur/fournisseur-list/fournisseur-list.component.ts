import { Secteur } from './../../secteur/secteur';
import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../fournisseur.service';
import { fournisseurColumns, allowedFournisseurFieldsForFilter } from '../fournisseur.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { SecteurService } from '../../secteur/secteur.service';


@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  originalFournisseurs: Fournisseur[] = [];
  selectedFournisseurs: Fournisseur[];
  selectedFournisseur: Fournisseur;
  clonedFournisseurs: Fournisseur[];
  secteurs: Secteur[] = [];
  strict: boolean;
  checkedSectors: Secteur[] = [];

  cMenuItems: MenuItem[] = [];

  tableColumns = fournisseurColumns;
  // allowed fields for filter
  globalFilterFields = allowedFournisseurFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public fournisseurSrv: FournisseurService,
    public secteurSrv: SecteurService,
     public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if (this.authSrv.checkShowAccess('Fournisseur')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (_event) => this.viewFournisseur(this.selectedFournisseur) });
    }
    if (this.authSrv.checkEditAccess('Fournisseur')) {
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (_event) => this.editFournisseur(this.selectedFournisseur) })
    }
    if (this.authSrv.checkCloneAccess('Fournisseur')) {
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (_event) => this.cloneFournisseur(this.selectedFournisseur) })
    }
    if (this.authSrv.checkDeleteAccess('Fournisseur')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (_event) => this.deleteFournisseur(this.selectedFournisseur) })
    }

    this.fournisseurs = this.activatedRoute.snapshot.data['fournisseurs'];
    this.originalFournisseurs = this.activatedRoute.snapshot.data['fournisseurs'];
    this.secteurs = this.activatedRoute.snapshot.data['secteurs'];
  }

  viewFournisseur(fournisseur: Fournisseur) {
    this.router.navigate([this.fournisseurSrv.getRoutePrefix(), fournisseur.id]);

  }

  editFournisseur(fournisseur: Fournisseur) {
    this.router.navigate([this.fournisseurSrv.getRoutePrefix(), fournisseur.id, 'edit']);
  }

  cloneFournisseur(fournisseur: Fournisseur) {
    this.router.navigate([this.fournisseurSrv.getRoutePrefix(), fournisseur.id, 'clone']);
  }

  deleteFournisseur(fournisseur: Fournisseur) {
    this.fournisseurSrv.remove(fournisseur)
      .subscribe(_data => {
        this.refreshList();
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

  deleteSelectedFournisseurs(_fournisseur: Fournisseur) {
    if (this.selectedFournisseurs) {
      this.fournisseurSrv.removeSelection(this.selectedFournisseurs)
        .subscribe(_data => {
          this.refreshList();
        }, error => this.fournisseurSrv.httpSrv.handleError(error));
    } else {
      this.fournisseurSrv.httpSrv.notificationSrv.showWarning('Selectionner au moins un élement');
    }
  }

  refreshList() {
    this.fournisseurSrv.findAll()
      .subscribe((data: any) => {
        this.fournisseurs = data;
        this.originalFournisseurs = data;
      }, error => this.fournisseurSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.fournisseurs, 'fournisseurs');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.fournisseurs);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

  handleChange(e: any) {
    this.filterProvidersBySectors(e);
  }

  handleSwitchChange() {
    this.filterProvidersBySectors(this.checkedSectors);
  }

  filterProvidersBySectors(checkedSectors: any) {
    const tempFournisseurs = new Array();
    Object.assign(tempFournisseurs, this.originalFournisseurs);
    if (tempFournisseurs.length !== this.fournisseurs.length) {
      this.fournisseurs = tempFournisseurs;
    }
    this.checkedSectors = checkedSectors;
    const filteredProviders: Fournisseur[] = new Array();
    let founded: boolean;
    this.fournisseurs.forEach(fournisseur => {
      let foundedItem = 0;
      fournisseur.secteurs.forEach(secteur => {
        founded = false;
        this.checkedSectors.forEach(checkedSector => {
          if (secteur.code === checkedSector.code) {
            founded = true;
            foundedItem++;
          }
        })
        if (founded && !(filteredProviders.filter(provider => provider.id === fournisseur.id).length)) {
          if (this.strict) {
            if (foundedItem === this.checkedSectors.length) {
              filteredProviders.push(fournisseur);
            }
          } else {
            filteredProviders.push(fournisseur);
          }

        }
      })
    })
    if (filteredProviders.length) {
      this.fournisseurs = filteredProviders;
    } else {
      if (this.checkedSectors.length) {
        window.scrollTo(0, 0);
        this.notificationSrv.showWarning('Attention aucun fournisseur ne dispose de ces critéres.');
        this.fournisseurs = this.originalFournisseurs;
      }
    }
  }
}
