import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { TypeEntite } from 'app/parametrage/type_entite/type_entite';

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

    constructor(private activatedRoute: ActivatedRoute, public userSrv: UserService) { }

    ngOnInit() {
        this.user = this.activatedRoute.snapshot.data['user'];
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}
