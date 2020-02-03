
import { Component, OnInit } from '@angular/core';
import { SousClasseService } from '../sous_classe.service';
import { SousClasse } from '../sous_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { Classe } from '../../classe/classe';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sous_classe-edit',
  templateUrl: './sous_classe-edit.component.html',
  styleUrls: ['./sous_classe-edit.component.scss']
})
export class SousClasseEditComponent implements OnInit {

  sous_classe: SousClasse;
  classes: Classe[] = [];
  constructor(public sous_classeSrv: SousClasseService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.classes = this.activatedRoute.snapshot.data['classes'];
    this.sous_classe = this.activatedRoute.snapshot.data['sous_classe'];
  }

  updateSousClasse() {
    const tempClasse = this.sous_classe.classe;
    this.sous_classe.classe = this.sous_classe.classe.id;
    this.sous_classeSrv.update(this.sous_classe)
      .subscribe(data => this.location.back(),
        error => {
          this.sous_classe.classe = tempClasse;
           this.sous_classeSrv.httpSrv.handleError(error)
          });
  }

}
