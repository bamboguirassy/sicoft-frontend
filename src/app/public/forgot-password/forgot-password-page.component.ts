import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from 'app/parametrage/user/user.service';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    email: string;
    constructor(private router: Router,
        private route: ActivatedRoute,
        public userSrv: UserService) { }

    // On submit click, reset form fields
    onSubmit() {
        this.userSrv.askResetPassword(this.email)
            .subscribe(data => {
                this.email = '';
                this.userSrv.httpSrv.notificationSrv.showInfo('Un lien de réinitialisation est envoyé au mail indiqué')
            },
                error => this.userSrv.httpSrv.notificationSrv.showError(error.error.message));

    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
