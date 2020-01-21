import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../classe.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-classe-show',
  templateUrl: './classe-show.component.html',
  styleUrls: ['./classe-show.component.scss']
})
export class ClasseShowComponent implements OnInit {

  classe: Classe;
  constructor(public activatedRoute: ActivatedRoute,
    public classeSrv: ClasseService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.classe = this.activatedRoute.snapshot.data['classe'];
  }

  removeClasse() {
    this.classeSrv.remove(this.classe)
      .subscribe(data => this.router.navigate([this.classeSrv.getRoutePrefix()]),
        error =>  this.classeSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.classeSrv.findOneById(this.classe.id)
    .subscribe((data:any)=>this.classe=data,
      error=>this.classeSrv.httpSrv.handleError(error));
  }

}

