import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TypeClasse } from 'app/parametrage/type_classe/type_classe';
import { CategorieClasse } from 'app/parametrage/categorie_classe/categorie_classe';

@Component({
  selector: 'app-classe-new',
  templateUrl: './classe-new.component.html',
  styleUrls: ['./classe-new.component.scss']
})
export class ClasseNewComponent implements OnInit {
  classe: Classe;
  typeClasses: TypeClasse[] = [];
  categorieClasses: CategorieClasse[] = [];



  constructor(public classeSrv: ClasseService,
    private activatedRoute: ActivatedRoute,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.classe = new Classe();
  }

  ngOnInit() {
    this.typeClasses = this.activatedRoute.snapshot.data['typeClasses'];
    this.categorieClasses = this.activatedRoute.snapshot.data['categorieClasses'];
  }

  saveClasse() {
    this.classe.typeClasse = this.classe.typeClasse.id;
    this.classe.categorieClasse = this.classe.categorieClasse.id;
    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Classe créé avec succès');
        this.classe = new Classe();
      }, error => this.classeSrv.httpSrv.handleError(error));
  }

  saveClasseAndExit() {
    this.classe.typeClasse = this.classe.typeClasse.id;
    this.classe.categorieClasse = this.classe.categorieClasse.id;
    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.router.navigate([this.classeSrv.getRoutePrefix(), data.id]);
      }, error => this.classeSrv.httpSrv.handleError(error));
  }

}

