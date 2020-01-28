import { Component, OnInit } from '@angular/core';
import { TypeClasse } from '../type_classe';
import { TypeClasseService } from '../type_classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-type_classe-new',
  templateUrl: './type_classe-new.component.html',
  styleUrls: ['./type_classe-new.component.scss']
})
export class TypeClasseNewComponent implements OnInit {
  type_classe: TypeClasse;
  constructor(public type_classeSrv: TypeClasseService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.type_classe = new TypeClasse();
  }

  ngOnInit() {
  }

  saveTypeClasse() {
    this.type_classeSrv.create(this.type_classe)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('TypeClasse créé avec succès');
        this.type_classe = new TypeClasse();
      }, error => this.type_classeSrv.httpSrv.handleError(error));
  }

  saveTypeClasseAndExit() {
    this.type_classeSrv.create(this.type_classe)
      .subscribe((data: any) => {
        this.router.navigate([this.type_classeSrv.getRoutePrefix(), data.id]);
      }, error => this.type_classeSrv.httpSrv.handleError(error));
  }

}

