
import { Component, OnInit } from '@angular/core';
import { SousClasseService } from '../sous_classe.service';
import { SousClasse } from '../sous_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-sous_classe-edit',
  templateUrl: './sous_classe-edit.component.html',
  styleUrls: ['./sous_classe-edit.component.scss']
})
export class SousClasseEditComponent implements OnInit {

  sous_classe: SousClasse;
  constructor(public sous_classeSrv: SousClasseService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.sous_classe = this.activatedRoute.snapshot.data['sous_classe'];
  }

  updateSousClasse() {
    this.sous_classeSrv.update(this.sous_classe)
      .subscribe(data => this.location.back(),
        error => this.sous_classeSrv.httpSrv.handleError(error));
  }

}
