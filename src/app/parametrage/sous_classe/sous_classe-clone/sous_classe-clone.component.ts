
import { Component, OnInit } from '@angular/core';
import { SousClasseService } from '../sous_classe.service';
import { Location } from '@angular/common';
import { SousClasse } from '../sous_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from '../../classe/classe';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sous_classe-clone',
  templateUrl: './sous_classe-clone.component.html',
  styleUrls: ['./sous_classe-clone.component.scss']
})
export class SousClasseCloneComponent implements OnInit {
  sous_classe: SousClasse;
  classes: Classe[] = [];
  original: SousClasse;
  constructor(public sous_classeSrv: SousClasseService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['sous_classe'];
    this.sous_classe = Object.assign({}, this.original);
    this.sous_classe.id = null;
    this.classes = this.activatedRoute.snapshot.data['classes']
  }

  cloneSousClasse() {
    const tempClasse = this.sous_classe.classe;
    this.sous_classe.classe = this.sous_classe.classe.id;
    this.sous_classeSrv.clone(this.original, this.sous_classe)
      .subscribe((data: any) => {
        this.router.navigate([this.sous_classeSrv.getRoutePrefix(), data.id]);
      }, error => {
        this.sous_classe.classe = tempClasse;
        this.sous_classeSrv.httpSrv.handleError(error)});
  }

}
