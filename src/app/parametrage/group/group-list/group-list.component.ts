import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { groupColumns, allowedGroupFieldsForFilter } from '../group.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];
  selectedGroups: Group[];
  selectedGroup: Group;
  clonedGroups: Group[];

  cMenuItems: MenuItem[] = [];

  tableColumns = groupColumns;
  //allowed fields for filter
  globalFilterFields = allowedGroupFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public groupSrv: GroupService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if (this.authSrv.checkShowAccess('Group')) {
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewGroup(this.selectedGroup) });
    }
    if (this.authSrv.checkEditAccess('Group')) {
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editGroup(this.selectedGroup) })
    }
    if (this.authSrv.checkCloneAccess('Group')) {
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneGroup(this.selectedGroup) })
    }
    if (this.authSrv.checkDeleteAccess('Group')) {
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteGroup(this.selectedGroup) })
    }

    this.groups = this.activatedRoute.snapshot.data['groups'];
  }

  viewGroup(group: Group) {
    this.router.navigate([this.groupSrv.getRoutePrefix(), group.id]);

  }

  editGroup(group: Group) {
    this.router.navigate([this.groupSrv.getRoutePrefix(), group.id, 'edit']);
  }

  cloneGroup(group: Group) {
    this.router.navigate([this.groupSrv.getRoutePrefix(), group.id, 'clone']);
  }

  deleteGroup(group: Group) {
    this.groupSrv.remove(group)
      .subscribe(data => this.refreshList(), error => this.groupSrv.httpSrv.handleError(error));
  }

  deleteSelectedGroups(group: Group) {
    if (this.selectedGroups) {
      this.groupSrv.removeSelection(this.selectedGroups)
        .subscribe(data => this.refreshList(), error => this.groupSrv.httpSrv.handleError(error));
    } else {
      this.groupSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
    }
  }

  refreshList() {
    this.groupSrv.findAll()
      .subscribe((data: any) => this.groups = data, error => this.groupSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.groups, 'groups');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.groups);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}