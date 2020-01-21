import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../fournisseur.service';
import { fournisseurColumns, allowedFournisseurFieldsForFilter } from '../fournisseur.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  selectedFournisseurs: Fournisseur[];
  selectedFournisseur: Fournisseur;
  clonedFournisseurs: Fournisseur[];

  cMenuItems: MenuItem[]=[];

  tableColumns = fournisseurColumns;
  //allowed fields for filter
  globalFilterFields = allowedFournisseurFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public fournisseurSrv: FournisseurService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('Fournisseur')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewFournisseur(this.selectedFournisseur) });
    }
    if(this.authSrv.checkEditAccess('Fournisseur')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editFournisseur(this.selectedFournisseur) })
    }
    if(this.authSrv.checkCloneAccess('Fournisseur')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneFournisseur(this.selectedFournisseur) })
    }
    if(this.authSrv.checkDeleteAccess('Fournisseur')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteFournisseur(this.selectedFournisseur) })
    }

    this.fournisseurs = this.activatedRoute.snapshot.data['fournisseurs'];
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
        .subscribe(data => this.refreshList(), error => this.fournisseurSrv.httpSrv.handleError(error));
  }

  deleteSelectedFournisseurs(fournisseur: Fournisseur) {
      if (this.selectedFournisseurs) {
        this.fournisseurSrv.removeSelection(this.selectedFournisseurs)
          .subscribe(data => this.refreshList(), error => this.fournisseurSrv.httpSrv.handleError(error));
      } else {
        this.fournisseurSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.fournisseurSrv.findAll()
      .subscribe((data: any) => this.fournisseurs = data, error => this.fournisseurSrv.httpSrv.handleError(error));
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

}