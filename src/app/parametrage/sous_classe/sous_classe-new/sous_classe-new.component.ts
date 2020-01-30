import { Component, OnInit } from '@angular/core';
import { SousClasse } from '../sous_classe';
import { SousClasseService } from '../sous_classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sous_classe-new',
  templateUrl: './sous_classe-new.component.html',
  styleUrls: ['./sous_classe-new.component.scss']
})
export class SousClasseNewComponent implements OnInit {
  sous_classe: SousClasse;
  constructor(public sous_classeSrv: SousClasseService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.sous_classe = new SousClasse();
  }

  ngOnInit() {
  }

  saveSousClasse() {
    this.sous_classeSrv.create(this.sous_classe)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('SousClasse créé avec succès');
        this.sous_classe = new SousClasse();
      }, error => this.sous_classeSrv.httpSrv.handleError(error));
  }

  saveSousClasseAndExit() {
    this.sous_classeSrv.create(this.sous_classe)
      .subscribe((data: any) => {
        this.router.navigate([this.sous_classeSrv.getRoutePrefix(), data.id]);
      }, error => this.sous_classeSrv.httpSrv.handleError(error));
  }

}

