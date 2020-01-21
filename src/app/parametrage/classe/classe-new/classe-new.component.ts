import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classe-new',
  templateUrl: './classe-new.component.html',
  styleUrls: ['./classe-new.component.scss']
})
export class ClasseNewComponent implements OnInit {
  classe: Classe;
  constructor(public classeSrv: ClasseService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.classe = new Classe();
  }

  ngOnInit() {
  }

  saveClasse() {
    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Classe créé avec succès');
        this.classe = new Classe();
      }, error => this.classeSrv.httpSrv.handleError(error));
  }

  saveClasseAndExit() {
    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.router.navigate([this.classeSrv.getRoutePrefix(), data.id]);
      }, error => this.classeSrv.httpSrv.handleError(error));
  }

}

