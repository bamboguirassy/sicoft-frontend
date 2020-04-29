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
    selecetedFile: File = null;
    imagePreview: any;
    imageUrl: File = null;
    fileToUpload: File;
    type_entites: TypeEntite[] = [];
    selectedTypeEntites: TypeEntite[];
    selectedTypeEntite: TypeEntite;
    uploadedFiles: any[] = [];
    // Variable Declaration
    currentPage = 'About';


    constructor(public authSrv: AuthService,
        public modalProfil: NgbModal,
        public modalPhoto: NgbModal,
        public userSrv: UserService,
        public modalService: NgbModal, public activatedRoute: ActivatedRoute) { }
    contenu: string;

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
        this.modalProfil.open(content, {
            size: 'lg',
            backdropClass: 'light-blue-backdrop',
            centered: true,
            keyboard: false,
            backdrop: 'static'
        });
    }
    toggle1Modal(content1) {
        this.modalService.open(content1, {
            size: 'lg',
            keyboard: false,
            backdrop: 'static',
            backdropClass: 'light-blue-backdrop',
            centered: true
        });
    }
    /*toggleModalPhoto(contentPhoto) {
        this.modalPhoto.open(contentPhoto, {
            size: 'lg',
            backdropClass: 'light-blue-backdrop',
            centered: true,
            keyboard: false,
            backdrop: 'static'
        });
    }*/
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

    /*onFileSelected(event) {
        this.fileToUpload = <File>event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
    };*/

    onUpload(event) {
        let file : any;
        let stringFile : string;
        this.fileToUpload = event.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = function(){
            //file = reader.result.split(',')[1];
            console.log(file);
        }
         stringFile = file;
         this.userSrv.uploadFileProfil(stringFile)
            .subscribe((data: any) => {
                console.log(stringFile);
            }, error => this.userSrv.httpSrv.handleError(error)
            );
    }

    modalClosePhoto() {
        this.modalProfil.dismissAll('Cross click');
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
        this.user.photoUrl = this.user.photoUrl;

        this.userSrv.editProfil(this.user).subscribe(
            (data: any) => {
                this.userSrv.httpSrv.notificationSrv.showInfo('Utilisateur modifié avec succès');
                this.showAlert1 = true;
                this.modalClose1();
                console.log(this.user);
            },
            error => this.userSrv.httpSrv.handleError(error));


    }
}
