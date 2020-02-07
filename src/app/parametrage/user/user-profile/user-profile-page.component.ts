import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';
import { AuthService } from 'app/shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {

    user: User;
    content: any;
    content1: any;
    showAlert: any;
    showAlert1: any;


    type_entites: TypeEntite[] = [];
    selectedTypeEntites: TypeEntite[];
    selectedTypeEntite: TypeEntite;

    // Variable Declaration
    currentPage = 'About';

    constructor(public authSrv: AuthService,
        public modalProfil: NgbModal,
        public userSrv: UserService,
        public modalService: NgbModal, public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        return this.authSrv.currentUserProvider.subscribe((user: any) => {
            this.user = user;
        });
        this.user = this.activatedRoute.snapshot.data['user'];
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    toggleModal(content) {
           this.modalProfil.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
    }
    toggle1Modal(content1) {
        this.modalService.open(content1, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
    }
    updatePassword() {
        this.showAlert = false;
        this.user.currentPassword = this.user.currentPassword;
        this.user.newPassword = this.user.newPassword,
            this.user.confirmPassword = this.user.confirmPassword;
        this.userSrv.updatePassword(this.user)
            .subscribe(
                (data: any) => {
                    this.userSrv.httpSrv.notificationSrv.showInfo('Mot de passe modifié avec succés');
                    this.showAlert = true;
                    this.modalClose();
                },
                error => this.userSrv.httpSrv.handleError(error));
    }

     modalClose() {
        this.modalProfil.dismissAll('Cross click');
    }
    modalClose1() {
        this.modalService.dismissAll('Cross click');
    }
    alertClose() {
        this.showAlert = false;
    }
    alertClose1() {
        this.showAlert1 = false;
    }
  editProfilUser(modal: any) {
    this.showAlert1 = false;
        this.userSrv.editProfil(this.user).subscribe(
            (data: any) => {
                this.userSrv.httpSrv.notificationSrv.showInfo('Utilisateur modifié avec succès');
                this.showAlert1 = true;
                this.modalClose1();
            },
        error => this.userSrv.httpSrv.handleError(error));


  }
}
