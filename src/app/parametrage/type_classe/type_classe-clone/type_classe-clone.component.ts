
import { Component, OnInit } from '@angular/core';
import { TypeClasseService } from '../type_classe.service';
import { Location } from '@angular/common';
import { TypeClasse } from '../type_classe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type_classe-clone',
  templateUrl: './type_classe-clone.component.html',
  styleUrls: ['./type_classe-clone.component.scss']
})
export class TypeClasseCloneComponent implements OnInit {
  type_classe: TypeClasse;
  original: TypeClasse;
  constructor(public type_classeSrv: TypeClasseService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['type_classe'];
    this.type_classe = Object.assign({}, this.original);
    this.type_classe.id = null;
  }

  cloneTypeClasse() {
    this.type_classeSrv.clone(this.original, this.type_classe)
      .subscribe((data: any) => {
        this.router.navigate([this.type_classeSrv.getRoutePrefix(), data.id]);
      }, error => this.type_classeSrv.httpSrv.handleError(error));
  }

}
