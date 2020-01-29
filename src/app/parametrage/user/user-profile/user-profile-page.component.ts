import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {

    user: User;

    type_entites: TypeEntite[] = [];
  selectedTypeEntites: TypeEntite[];
  selectedTypeEntite: TypeEntite;

    // Variable Declaration
    currentPage: string = 'About'

    constructor(public authSrv: AuthService) { }

    ngOnInit() {
        return this.authSrv.currentUserProvider.subscribe((user: any) => {
            this.user = user;
        });
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}
