import { Component, OnInit } from '@angular/core';
import { TypeClasse } from '../type_classe';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeClasseService } from '../type_classe.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_classe-show',
  templateUrl: './type_classe-show.component.html',
  styleUrls: ['./type_classe-show.component.scss']
})
export class TypeClasseShowComponent implements OnInit {

  type_classe: TypeClasse;
  constructor(public activatedRoute: ActivatedRoute,
    public type_classeSrv: TypeClasseService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_classe = this.activatedRoute.snapshot.data['type_classe'];
  }

  removeTypeClasse() {
    this.type_classeSrv.remove(this.type_classe)
      .subscribe(data => this.router.navigate([this.type_classeSrv.getRoutePrefix()]),
        error =>  this.type_classeSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.type_classeSrv.findOneById(this.type_classe.id)
    .subscribe((data:any)=>this.type_classe=data,
      error=>this.type_classeSrv.httpSrv.handleError(error));
  }

}

