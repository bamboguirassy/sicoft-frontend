import { Component, OnInit } from '@angular/core';
import { Compte } from '../compte';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { compteColumns, allowedCompteFieldsForFilter } from '../compte.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.scss']
})
export class CompteListComponent implements OnInit {

  comptes: Compte[] = [];
  selectedComptes: Compte[];
  selectedCompte: Compte;
  clonedComptes: Compte[];

  cMenuItems: MenuItem[]=[];

  tableColumns = compteColumns;
  //allowed fields for filter
  globalFilterFields = allowedCompteFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public compteSrv: CompteService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('Compte')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewCompte(this.selectedCompte) });
    }
    if(this.authSrv.checkEditAccess('Compte')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editCompte(this.selectedCompte) })
    }
    if(this.authSrv.checkCloneAccess('Compte')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneCompte(this.selectedCompte) })
    }
    if(this.authSrv.checkDeleteAccess('Compte')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteCompte(this.selectedCompte) })
    }

    this.comptes = this.activatedRoute.snapshot.data['comptes'];
  }

  viewCompte(compte: Compte) {
      this.router.navigate([this.compteSrv.getRoutePrefix(), compte.id]);

  }

  editCompte(compte: Compte) {
      this.router.navigate([this.compteSrv.getRoutePrefix(), compte.id, 'edit']);
  }

  cloneCompte(compte: Compte) {
      this.router.navigate([this.compteSrv.getRoutePrefix(), compte.id, 'clone']);
  }

  deleteCompte(compte: Compte) {
      this.compteSrv.remove(compte)
        .subscribe(data => this.refreshList(), error => this.compteSrv.httpSrv.handleError(error));
  }

  deleteSelectedComptes(compte: Compte) {
      if (this.selectedComptes) {
        this.compteSrv.removeSelection(this.selectedComptes)
          .subscribe(data => this.refreshList(), error => this.compteSrv.httpSrv.handleError(error));
      } else {
        this.compteSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.compteSrv.findAll()
      .subscribe((data: any) => this.comptes = data, error => this.compteSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.comptes, 'comptes');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.comptes);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}