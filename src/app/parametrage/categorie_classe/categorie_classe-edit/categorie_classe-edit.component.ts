
import { Component, OnInit } from '@angular/core';
import { CategorieClasseService } from '../categorie_classe.service';
import { CategorieClasse } from '../categorie_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-categorie_classe-edit',
  templateUrl: './categorie_classe-edit.component.html',
  styleUrls: ['./categorie_classe-edit.component.scss']
})
export class CategorieClasseEditComponent implements OnInit {

  categorie_classe: CategorieClasse;
  constructor(public categorie_classeSrv: CategorieClasseService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.categorie_classe = this.activatedRoute.snapshot.data['categorie_classe'];
  }

  updateCategorieClasse() {
    this.categorie_classeSrv.update(this.categorie_classe)
      .subscribe(data => this.location.back(),
        error => this.categorie_classeSrv.httpSrv.handleError(error));
  }

}
