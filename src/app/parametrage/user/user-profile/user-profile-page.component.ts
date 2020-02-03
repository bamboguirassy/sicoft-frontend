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

    type_entites: TypeEntite[] = [];
  selectedTypeEntites: TypeEntite[];
  selectedTypeEntite: TypeEntite;

    // Variable Declaration
    currentPage: string = 'About'

    constructor(public authSrv: AuthService,
        public modalProfil: NgbModal,
        public userSrv: UserService) { }

    ngOnInit() {
        return this.authSrv.currentUserProvider.subscribe((user: any) => {
            this.user = user;
        });
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    toggleModal(content){
        this.modalProfil.open(content, {size: 'lg', backdropClass: 'light-blue-backdrop', centered: true});
    }
    updatePassword() {
        this.user.currentPassword = this.user.currentPassword;
        this.user.newPassword = this.user.newPassword,
        this.user.confirmPassword = this.user.confirmPassword;
        this.userSrv.updatePassword(this.user)
        .subscribe(
            (data:any) => this.userSrv.httpSrv.notificationSrv.showInfo('Mot de passe modifié avec succés'),
            error => this.userSrv.httpSrv.handleError(error));    
    }
   
}
