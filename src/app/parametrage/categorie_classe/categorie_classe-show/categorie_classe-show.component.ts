import { Component, OnInit } from '@angular/core';
import { CategorieClasse } from '../categorie_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieClasseService } from '../categorie_classe.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-categorie_classe-show',
  templateUrl: './categorie_classe-show.component.html',
  styleUrls: ['./categorie_classe-show.component.scss']
})
export class CategorieClasseShowComponent implements OnInit {

  categorie_classe: CategorieClasse;
  constructor(public activatedRoute: ActivatedRoute,
    public categorie_classeSrv: CategorieClasseService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.categorie_classe = this.activatedRoute.snapshot.data['categorie_classe'];
  }

  removeCategorieClasse() {
    this.categorie_classeSrv.remove(this.categorie_classe)
      .subscribe(data => this.router.navigate([this.categorie_classeSrv.getRoutePrefix()]),
        error =>  this.categorie_classeSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.categorie_classeSrv.findOneById(this.categorie_classe.id)
    .subscribe((data:any)=>this.categorie_classe=data,
      error=>this.categorie_classeSrv.httpSrv.handleError(error));
  }

}

