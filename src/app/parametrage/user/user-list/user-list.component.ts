import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { userColumns, allowedUserFieldsForFilter } from '../user.columns';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { ExportService } from 'app/shared/services/export.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[];
  selectedUser: User;
  clonedUsers: User[];

  cMenuItems: MenuItem[] = [];

  tableColumns = userColumns;
  // allowed fields for filter
  globalFilterFields = allowedUserFieldsForFilter;

  constructor(
    private activatedRoute: ActivatedRoute,
    public userSrv: UserService,
    public exportSrv: ExportService,
    private router: Router,
    public authSrv: AuthService,
    public notificationSrv: NotificationService
  ) {}

  ngOnInit() {
    if (this.authSrv.checkShowAccess('User')) {
      this.cMenuItems.push({
        label: 'Afficher détails',
        icon: 'pi pi-eye',
        command: event => this.viewUser(this.selectedUser)
      });
    }
    if (this.authSrv.checkEditAccess('User')) {
      this.cMenuItems.push({
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: event => this.editUser(this.selectedUser)
      });
    }
    if (this.authSrv.checkCloneAccess('User')) {
      this.cMenuItems.push({
        label: 'Cloner',
        icon: 'pi pi-clone',
        command: event => this.cloneUser(this.selectedUser)
      });
    }
    if (this.authSrv.checkDeleteAccess('User')) {
      this.cMenuItems.push({
        label: 'Supprimer',
        icon: 'pi pi-times',
        command: event => this.deleteUser(this.selectedUser)
      });
    }

    this.users = this.activatedRoute.snapshot.data['users'];
  }

  viewUser(user: User) {
    this.router.navigate([this.userSrv.getRoutePrefix(), user.id]);
  }

  editUser(user: User) {
    this.router.navigate([this.userSrv.getRoutePrefix(), user.id, 'edit']);
  }

  cloneUser(user: User) {
    this.router.navigate([this.userSrv.getRoutePrefix(), user.id, 'clone']);
  }

  deleteUser(user: User) {
    this.userSrv.remove(user).subscribe(
      data => this.refreshList(),
      error => this.userSrv.httpSrv.handleError(error)
    );
  }

  deleteSelectedUsers(user: User) {
    this.userSrv.removeSelection(this.selectedUsers).subscribe(
      data => this.refreshList(),
      error => this.userSrv.httpSrv.handleError(error)
    );
  }

  refreshList() {
    this.userSrv.findAll().subscribe(
      (data: any) => (this.users = data),
      error => this.userSrv.httpSrv.handleError(error)
    );
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.users, 'users');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.users);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }
}
