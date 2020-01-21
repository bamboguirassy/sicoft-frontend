
import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../classe.service';
import { Location } from '@angular/common';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classe-clone',
  templateUrl: './classe-clone.component.html',
  styleUrls: ['./classe-clone.component.scss']
})
export class ClasseCloneComponent implements OnInit {
  classe: Classe;
  original: Classe;
  constructor(public classeSrv: ClasseService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['classe'];
    this.classe = Object.assign({}, this.original);
    this.classe.id = null;
  }

  cloneClasse() {
    this.classeSrv.clone(this.original, this.classe)
      .subscribe((data: any) => {
        this.router.navigate([this.classeSrv.getRoutePrefix(), data.id]);
      }, error => this.classeSrv.httpSrv.handleError(error));
  }

}
