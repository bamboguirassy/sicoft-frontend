
import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../classe.service';
import { Location } from '@angular/common';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieClasse } from 'app/parametrage/categorie_classe/categorie_classe';
import { TypeClasse } from 'app/parametrage/type_classe/type_classe';

@Component({
  selector: 'app-classe-clone',
  templateUrl: './classe-clone.component.html',
  styleUrls: ['./classe-clone.component.scss']
})
export class ClasseCloneComponent implements OnInit {
  classe: Classe;
  original: Classe;
  typeClasses: TypeClasse[] = [];
  categorieClasses: CategorieClasse[] = [];


  constructor(public classeSrv: ClasseService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['classe'];
    this.classe = Object.assign({}, this.original);
    this.classe.id = null;
    this.typeClasses = this.activatedRoute.snapshot.data['typeClasses'];
    this.categorieClasses = this.activatedRoute.snapshot.data['categorieClasses'];
  }

  cloneClasse() {
    const tempTypeClasse = this.classe.typeClasse;
    const tempCategorieClasse = this.classe.categorieClasse;
    this.classe.typeClasse = this.classe.typeClasse.id;
    this.classe.categorieClasse = this.classe.categorieClasse.id;
    this.classeSrv.clone(this.original, this.classe)
      .subscribe((data: any) => {
        this.router.navigate([this.classeSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.classe.typeClasse = tempTypeClasse;
        this.classe.categorieClasse = tempCategorieClasse;
        this.classeSrv.httpSrv.handleError(error);
      });
  }

}
