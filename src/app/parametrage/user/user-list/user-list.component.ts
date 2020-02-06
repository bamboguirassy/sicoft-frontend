import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {userColumns, allowedUserFieldsForFilter} from '../user.columns';
import {MenuItem} from 'primeng/api';
import {AuthService} from 'app/shared/services/auth.service';
import {NotificationService} from 'app/shared/services/notification.service';
import {ExportService} from 'app/shared/services/export.service';
import {Group} from '../../group/group';

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

    groups: Group[] = [];
    strict: boolean;
    active = false;
    checkedGroups: Group[] = [];
    originalUsers: User[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        public userSrv: UserService,
        public exportSrv: ExportService,
        private router: Router,
        public authSrv: AuthService,
        public notificationSrv: NotificationService
    ) {
    }

    ngOnInit() {

        this.users = this.activatedRoute.snapshot.data['users'];
        this.originalUsers = this.users.slice();
        this.groups = this.activatedRoute.snapshot.data['groups'];

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

    deleteSelectedUsers() {
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

    updateEtat(user: User) {
        user.enabled = !user.enabled;
        this.userSrv.update(user)
            .subscribe(
                (data: any) => {
                    if (user.enabled) {
                        this.notificationSrv.showInfo('Utilisateur activé!');
                    } else {
                        this.notificationSrv.showInfo('Utilisateur désactivé');
                    }
                }
                , error => this.userSrv.httpSrv.handleError(error));
    }

    showButtonActivationUser() {
        this.cMenuItems = this.cMenuItems.filter(data => data.label !== 'Activer');
        this.cMenuItems = this.cMenuItems.filter(data => data.label !== 'Désactiver');
        const activeUser = this.selectedUser.enabled ? 'Désactiver' : 'Activer';
        const activeIcone = this.selectedUser.enabled ? 'pi pi-lock' : 'pi pi-unlock';
        if (this.authSrv.checkEditAccess('User')) {
            this.cMenuItems.push({
                label: activeUser,
                icon: activeIcone,
                command: event => this.updateEtatUser(this.selectedUser)
            });
        }
    }

    updateEtatUser(user) {
        user.enabled = !user.enabled;
        this.userSrv.update(user)
            .subscribe((data: any) => this.userSrv.findAll(),
                error => this.userSrv.httpSrv.handleError(error));
    }

    handleChange(data: any) {
        this.filterUsers(data);
    }

    filterUsers(groups: any) {
        this.checkedGroups = groups;
        if (this.originalUsers.length !== this.users.length) { this.users = this.originalUsers; }
        if (this.active) {
            this.displayUsers(this.filterByGroup(this.users).filter(user => user.enabled));
        } else {
            this.displayUsers(this.filterByGroup(this.users).filter(user => !user.enabled));
        }
    }

    filterByGroup(users: User[]) {
        const selectedUsers: User[] = [];
        let found: boolean;
        this.users.forEach(user => {
            let foundItem = 0;
            user.groups.forEach(group => {
                found = false;
                this.checkedGroups.forEach(checkedGroup => {
                    if (group.name === checkedGroup.name) {
                        found = true;
                        foundItem++;
                    }
                });
                if (found && !(selectedUsers.filter(selectedUser => selectedUser.id === user.id).length)) {
                    if (this.strict) {
                        if (foundItem === this.checkedGroups.length) {
                            selectedUsers.push(user);
                        }
                    } else {
                        selectedUsers.push(user);
                    }

                }
            })
        });

        return selectedUsers;
    }

    displayUsers(selectedUsers: User[]) {
        if (selectedUsers.length) {
            this.users = selectedUsers;
        } else {
            if (this.checkedGroups.length) {
                window.scrollTo(0, 0);
                this.notificationSrv.showWarning('Aucun utilisateur trouvé');
                this.users = this.originalUsers;
            }
        }
    }

    onStricSwitched() {
        this.filterUsers(this.checkedGroups);
    }

    filterActiveInactive () {
        this.filterUsers(this.checkedGroups);
        if (this.active) {
            this.users = this.users.filter(user => user.enabled);
        } else {
            this.users = this.users.filter(user => !user.enabled);
        }
    }
}
