import { Component, OnInit } from '@angular/core';
import { User } from 'app/parametrage/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';
import { UserService } from 'app/parametrage/user/user.service';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordModel = { password: '', confirmPassword: '' };
  user: User;
  constructor(public activatedRoute: ActivatedRoute,
    public notificationSrv: NotificationService,
    public userSrv: UserService, public router: Router,
    public authSrv: AuthService) { }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  onSubmit() {
    if (this.passwordModel.password.length < 7) {
      this.notificationSrv.showError('Mot de passe court, 8 Caractères minimum obligatoire');
    } else if (this.passwordModel.password != this.passwordModel.confirmPassword) {
      this.notificationSrv.showError("Les mots de passe ne correspondent pas");
    } else {
      this.userSrv.changePassword(this.user.id,this.passwordModel.password).subscribe(
        () => {
          this.authSrv.login({ username: this.user.username, password: this.passwordModel.password })
            .subscribe(() => this.router.navigate(['']));
        }
      )
    }
  }

}
