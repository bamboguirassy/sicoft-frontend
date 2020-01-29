
import { Component, OnInit } from '@angular/core';
import { CategorieClasseService } from '../categorie_classe.service';
import { Location } from '@angular/common';
import { CategorieClasse } from '../categorie_classe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie_classe-clone',
  templateUrl: './categorie_classe-clone.component.html',
  styleUrls: ['./categorie_classe-clone.component.scss']
})
export class CategorieClasseCloneComponent implements OnInit {
  categorie_classe: CategorieClasse;
  original: CategorieClasse;
  constructor(public categorie_classeSrv: CategorieClasseService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['categorie_classe'];
    this.categorie_classe = Object.assign({}, this.original);
    this.categorie_classe.id = null;
  }

  cloneCategorieClasse() {
    this.categorie_classeSrv.clone(this.original, this.categorie_classe)
      .subscribe((data: any) => {
        this.router.navigate([this.categorie_classeSrv.getRoutePrefix(), data.id]);
      }, error => this.categorie_classeSrv.httpSrv.handleError(error));
  }

}
