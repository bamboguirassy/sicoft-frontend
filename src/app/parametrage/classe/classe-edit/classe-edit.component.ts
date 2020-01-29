
import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../classe.service';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { CategorieClasse } from 'app/parametrage/categorie_classe/categorie_classe';
import { TypeClasse } from 'app/parametrage/type_classe/type_classe';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit {

  classe: Classe;
  typeClasses: TypeClasse[] = [];
  categorieClasses: CategorieClasse[] = [];

  constructor(public classeSrv: ClasseService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.classe = this.activatedRoute.snapshot.data['classe'];
    this.typeClasses = this.activatedRoute.snapshot.data['typeClasses'];
    this.categorieClasses = this.activatedRoute.snapshot.data['categorieClasses'];
  }

  updateClasse() {
    const tempTypeClasse = this.classe.typeClasse;
    const tempCategorieClasse = this.classe.categorieClasse;
    this.classe.typeClasse = this.classe.typeClasse.id;
    this.classe.categorieClasse = this.classe.categorieClasse.id;
    this.classeSrv.update(this.classe)
      .subscribe(data => this.location.back(),
      error => {
        this.classe.typeClasse = tempTypeClasse;
        this.classe.categorieClasse = tempCategorieClasse;
        this.classeSrv.httpSrv.handleError(error);
      });
  }

}
