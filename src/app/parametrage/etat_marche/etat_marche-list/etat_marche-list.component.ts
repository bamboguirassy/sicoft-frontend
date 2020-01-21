import { Component, OnInit } from '@angular/core';
import { EtatMarche } from '../etat_marche';
import { ActivatedRoute, Router } from '@angular/router';
import { EtatMarcheService } from '../etat_marche.service';
import { etat_marcheColumns, allowedEtatMarcheFieldsForFilter } from '../etat_marche.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-etat_marche-list',
  templateUrl: './etat_marche-list.component.html',
  styleUrls: ['./etat_marche-list.component.scss']
})
export class EtatMarcheListComponent implements OnInit {

  etat_marches: EtatMarche[] = [];
  selectedEtatMarches: EtatMarche[];
  selectedEtatMarche: EtatMarche;
  clonedEtatMarches: EtatMarche[];

  cMenuItems: MenuItem[]=[];

  tableColumns = etat_marcheColumns;
  //allowed fields for filter
  globalFilterFields = allowedEtatMarcheFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public etat_marcheSrv: EtatMarcheService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('EtatMarche')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewEtatMarche(this.selectedEtatMarche) });
    }
    if(this.authSrv.checkEditAccess('EtatMarche')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editEtatMarche(this.selectedEtatMarche) })
    }
    if(this.authSrv.checkCloneAccess('EtatMarche')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneEtatMarche(this.selectedEtatMarche) })
    }
    if(this.authSrv.checkDeleteAccess('EtatMarche')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteEtatMarche(this.selectedEtatMarche) })
    }

    this.etat_marches = this.activatedRoute.snapshot.data['etat_marches'];
  }

  viewEtatMarche(etat_marche: EtatMarche) {
      this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), etat_marche.id]);

  }

  editEtatMarche(etat_marche: EtatMarche) {
      this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), etat_marche.id, 'edit']);
  }

  cloneEtatMarche(etat_marche: EtatMarche) {
      this.router.navigate([this.etat_marcheSrv.getRoutePrefix(), etat_marche.id, 'clone']);
  }

  deleteEtatMarche(etat_marche: EtatMarche) {
      this.etat_marcheSrv.remove(etat_marche)
        .subscribe(data => this.refreshList(), error => this.etat_marcheSrv.httpSrv.handleError(error));
  }

  deleteSelectedEtatMarches(etat_marche: EtatMarche) {
      if (this.selectedEtatMarches) {
        this.etat_marcheSrv.removeSelection(this.selectedEtatMarches)
          .subscribe(data => this.refreshList(), error => this.etat_marcheSrv.httpSrv.handleError(error));
      } else {
        this.etat_marcheSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.etat_marcheSrv.findAll()
      .subscribe((data: any) => this.etat_marches = data, error => this.etat_marcheSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.etat_marches, 'etat_marches');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.etat_marches);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}