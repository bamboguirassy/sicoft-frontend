import { UserService } from './../../user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtatMarche } from './../etat_marche';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
  index: number = 0;
  etat_marches: EtatMarche[] = [];
  selectedEtatMarches: EtatMarche[];
  selectedEtatMarche: EtatMarche;
  selectedUser: any[];
  users: any[] = [];
  clonedEtatMarches: EtatMarche[];
  items: MenuItem[];
  info: MenuItem;
  alert: any = null;
  loading: Boolean = false;
  @ViewChild('content', { static: false }) public modalContentRef: TemplateRef<any>;


  cMenuItems: MenuItem[] = [];

  tableColumns = etat_marcheColumns;
  //allowed fields for filter
  globalFilterFields = allowedEtatMarcheFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public etat_marcheSrv: EtatMarcheService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService, public userSrv: UserService,
    public notificationSrv: NotificationService,
    private modalSrv: NgbModal
  ) { }

  ngOnInit() {
    if (this.authSrv.checkShowAccess('EtatMarche')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewEtatMarche(this.selectedEtatMarche) });
    }
    if (this.authSrv.checkEditAccess('EtatMarche')) {
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editEtatMarche(this.selectedEtatMarche) })
    }
    if (this.authSrv.checkCloneAccess('EtatMarche')) {
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneEtatMarche(this.selectedEtatMarche) })
    }
    if (this.authSrv.checkDeleteAccess('EtatMarche')) {
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteEtatMarche(this.selectedEtatMarche) })
    }
    if (this.authSrv.checkCreateAccess('RoleSurMarche')) {
      // tslint:disable-next-line:max-line-length
      this.cMenuItems.push({ label: 'Utilisateurs', icon: 'pi pi-user', command: (event) => this.toggleSearchModal(this.modalContentRef, this.selectedEtatMarche) })
    }

    this.etat_marches = this.activatedRoute.snapshot.data['etat_marches'];
    this.info = { icon: 'pi pi-info' }
    this.fetchNextStates({ originalEvent: MouseEvent, index: 0 });
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
      this.etat_marcheSrv.httpSrv.notificationSrv.showWarning('Selectionner au moins un élement');
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

  openNext() {
    this.index = (this.index === this.etat_marches.length) ? 0 : this.index + 1;
    this.fetchNextStates({ originalEvent: MouseEvent, index: this.index })
  }

  openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
    this.fetchNextStates({ originalEvent: MouseEvent, index: this.index })
  }

  fetchNextStates(e: any) {
    this.items = [];
    let contains = false;
    if (this.etat_marches[e.index]) {
      this.items.push({ label: this.etat_marches[e.index].libelle });
      let etatMarche = this.etat_marches[e.index];
      while (etatMarche.etatSuivant) {
        contains = true;
        this.items.push({ label: etatMarche.etatSuivant.libelle });
        etatMarche = etatMarche.etatSuivant;
      }
      if (!contains) {
        this.items.push({ label: 'Aucun état suivant pour l\'instant' });
      }
    }

  }

  public toggleSearchModal(content: TemplateRef<any>, selectedEtatMarche: EtatMarche) {
    this.modalSrv.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
    this.etat_marcheSrv.fetchNotAddedUser(selectedEtatMarche.id).subscribe(data => this.users = data);
  }

  public closeModal() {
    this.modalSrv.dismissAll('Cross click');
    this.alert = null;
  }

  public addUser() {
    this.loading = true;
    if (this.selectedUser) {
      this.selectedEtatMarche.users = this.selectedEtatMarche.users.map(user => user.id);
      this.selectedUser.forEach(user => {
        this.selectedEtatMarche.users.push(user.id);
      });
      this.etat_marcheSrv.update(this.selectedEtatMarche).subscribe((data: any) => {
        this.alert = {
          type: 'success',
          message: 'Utilisateur ajouté avec succés.'
        }
        this.selectedEtatMarche.users = data.users;
        this.etat_marcheSrv.fetchNotAddedUser(this.selectedEtatMarche.id)
          .subscribe((innerData: any) => {
            this.users = innerData;
            this.users = this.users.slice(0);
          }, error => {
            this.loading = false;
            this.alert = {
              type: 'danger',
              message: 'Verifier que vous avez accés à internet.'
            };
          });
        this.loading = false;
        this.selectedUser = null;
      }, error => {
        this.alert = {
          type: 'danger',
          message: 'Verifier que vous avez accés à internet.'
        }
        this.loading = false;
      });
    }
  }

  public removeUser(user: any) {
    this.loading = true;
    this.selectedEtatMarche.users = this.selectedEtatMarche.users.filter(currentUser => currentUser !== user);
    this.selectedEtatMarche.users = this.selectedEtatMarche.users.map(addedUSer => addedUSer.id);
    this.etat_marcheSrv.update(this.selectedEtatMarche).subscribe((data: any) => {
      this.loading = false;
      this.selectedEtatMarche.users = data.users;
      this.alert = {
        type: 'success',
        message: 'Utilisateur supprimé avec succés.'
      };
      this.users.push(user);
      this.users = this.users.slice(0);
    }, error => {
      this.loading = false;
      this.alert = {
        type: 'danger',
        message: 'Verifier que vous avez accés à internet.'
      }
    });
  }

  public closeAlert() {
    this.alert = null;
    this.loading = false;
  }
}
