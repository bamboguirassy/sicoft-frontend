import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TypeClasse } from 'app/parametrage/type_classe/type_classe';
import { CategorieClasse } from 'app/parametrage/categorie_classe/categorie_classe';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-classe-new',
  templateUrl: './classe-new.component.html',
  styleUrls: ['./classe-new.component.scss']
})
export class ClasseNewComponent implements OnInit {
  classe: Classe;
  typeClasses: TypeClasse[] = [];
  categorieClasses: CategorieClasse[] = [];
  types: SelectItem[];
  validNumero: boolean;



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
    const tempCategorie = new CategorieClasse();
    tempCategorie.code = this.classe.categorieClasse.code;
    tempCategorie.id = this.classe.categorieClasse.id;
    tempCategorie.nom = this.classe.categorieClasse.nom;

    const tempTypeClasse = new TypeClasse();
    tempTypeClasse.id = this.classe.typeClasse.id;
    tempTypeClasse.code = this.classe.typeClasse.code;
    tempTypeClasse.nom = this.classe.typeClasse.nom;

    this.classe.typeClasse = this.classe.typeClasse.id;
    this.classe.categorieClasse = this.classe.categorieClasse.id;
    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Classe créé avec succès');
        this.classe = new Classe();
        this.classe.categorieClasse = tempCategorie;
      }, error => {
        this.classe.typeClasse = tempTypeClasse;
        this.classe.categorieClasse = tempCategorie;
        this.classeSrv.httpSrv.handleError(error);
      });
  }

  saveClasseAndExit() {
    const tempTypeClasse = new TypeClasse();
    tempTypeClasse.id = this.classe.typeClasse.id;
    tempTypeClasse.code = this.classe.typeClasse.code;
    tempTypeClasse.nom = this.classe.typeClasse.nom;

    const tempCategorieClasse = new CategorieClasse();
    tempCategorieClasse.code = this.classe.categorieClasse.code;
    tempCategorieClasse.id = this.classe.categorieClasse.id;
    tempCategorieClasse.nom = this.classe.categorieClasse.nom;

    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.router.navigate([this.classeSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.classe.typeClasse = tempTypeClasse;
        this.classe.categorieClasse = tempCategorieClasse;
        this.classeSrv.httpSrv.handleError(error);
      });
  }

}

