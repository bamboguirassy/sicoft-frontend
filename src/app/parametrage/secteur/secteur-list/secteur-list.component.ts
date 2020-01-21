import { Component, OnInit } from '@angular/core';
import { Secteur } from '../secteur';
import { ActivatedRoute, Router } from '@angular/router';
import { SecteurService } from '../secteur.service';
import { secteurColumns, allowedSecteurFieldsForFilter } from '../secteur.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-secteur-list',
  templateUrl: './secteur-list.component.html',
  styleUrls: ['./secteur-list.component.scss']
})
export class SecteurListComponent implements OnInit {

  secteurs: Secteur[] = [];
  selectedSecteurs: Secteur[];
  selectedSecteur: Secteur;
  clonedSecteurs: Secteur[];

  cMenuItems: MenuItem[]=[];

  tableColumns = secteurColumns;
  //allowed fields for filter
  globalFilterFields = allowedSecteurFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public secteurSrv: SecteurService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('Secteur')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewSecteur(this.selectedSecteur) });
    }
    if(this.authSrv.checkEditAccess('Secteur')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editSecteur(this.selectedSecteur) })
    }
    if(this.authSrv.checkCloneAccess('Secteur')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneSecteur(this.selectedSecteur) })
    }
    if(this.authSrv.checkDeleteAccess('Secteur')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteSecteur(this.selectedSecteur) })
    }

    this.secteurs = this.activatedRoute.snapshot.data['secteurs'];
  }

  viewSecteur(secteur: Secteur) {
      this.router.navigate([this.secteurSrv.getRoutePrefix(), secteur.id]);

  }

  editSecteur(secteur: Secteur) {
      this.router.navigate([this.secteurSrv.getRoutePrefix(), secteur.id, 'edit']);
  }

  cloneSecteur(secteur: Secteur) {
      this.router.navigate([this.secteurSrv.getRoutePrefix(), secteur.id, 'clone']);
  }

  deleteSecteur(secteur: Secteur) {
      this.secteurSrv.remove(secteur)
        .subscribe(data => this.refreshList(), error => this.secteurSrv.httpSrv.handleError(error));
  }

  deleteSelectedSecteurs(secteur: Secteur) {
      if (this.selectedSecteurs) {
        this.secteurSrv.removeSelection(this.selectedSecteurs)
          .subscribe(data => this.refreshList(), error => this.secteurSrv.httpSrv.handleError(error));
      } else {
        this.secteurSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.secteurSrv.findAll()
      .subscribe((data: any) => this.secteurs = data, error => this.secteurSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.secteurs, 'secteurs');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.secteurs);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}