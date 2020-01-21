
import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../classe.service';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit {

  classe: Classe;
  constructor(public classeSrv: ClasseService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.classe = this.activatedRoute.snapshot.data['classe'];
  }

  updateClasse() {
    this.classeSrv.update(this.classe)
      .subscribe(data => this.location.back(),
        error => this.classeSrv.httpSrv.handleError(error));
  }

}
