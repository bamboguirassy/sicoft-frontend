
import { Component, OnInit } from '@angular/core';
import { TypeClasseService } from '../type_classe.service';
import { TypeClasse } from '../type_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_classe-edit',
  templateUrl: './type_classe-edit.component.html',
  styleUrls: ['./type_classe-edit.component.scss']
})
export class TypeClasseEditComponent implements OnInit {

  type_classe: TypeClasse;
  constructor(public type_classeSrv: TypeClasseService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_classe = this.activatedRoute.snapshot.data['type_classe'];
  }

  updateTypeClasse() {
    this.type_classeSrv.update(this.type_classe)
      .subscribe(data => this.location.back(),
        error => this.type_classeSrv.httpSrv.handleError(error));
  }

}
