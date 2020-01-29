import { Component, OnInit } from '@angular/core';
import { CategorieClasse } from '../categorie_classe';
import { CategorieClasseService } from '../categorie_classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categorie_classe-new',
  templateUrl: './categorie_classe-new.component.html',
  styleUrls: ['./categorie_classe-new.component.scss']
})
export class CategorieClasseNewComponent implements OnInit {
  categorie_classe: CategorieClasse;
  constructor(public categorie_classeSrv: CategorieClasseService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.categorie_classe = new CategorieClasse();
  }

  ngOnInit() {
  }

  saveCategorieClasse() {
    this.categorie_classeSrv.create(this.categorie_classe)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('CategorieClasse créé avec succès');
        this.categorie_classe = new CategorieClasse();
      }, error => this.categorie_classeSrv.httpSrv.handleError(error));
  }

  saveCategorieClasseAndExit() {
    this.categorie_classeSrv.create(this.categorie_classe)
      .subscribe((data: any) => {
        this.router.navigate([this.categorie_classeSrv.getRoutePrefix(), data.id]);
      }, error => this.categorie_classeSrv.httpSrv.handleError(error));
  }

}

