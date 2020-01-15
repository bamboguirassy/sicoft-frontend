import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/services/auth.service';
import { TokenManagerService } from 'app/shared/services/token-manager.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    user = { username: '', password: '' };
    constructor(private router: Router,
        private route: ActivatedRoute,
        public authSrv: AuthService,
        public tokenMgr: TokenManagerService) { }

    // On submit button click
    onSubmit() {
        this.authSrv.login(this.user)
            .subscribe((data:any) => {
                this.tokenMgr.setToken(data.token);
                this.authSrv.getCurrentUser();
                this.router.navigate(['']);
            }, error => {
                this.authSrv.httpSrv.handleError(error);
            })
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
}
