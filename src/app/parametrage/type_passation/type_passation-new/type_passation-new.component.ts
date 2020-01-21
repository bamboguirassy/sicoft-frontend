import { Component, OnInit } from '@angular/core';
import { TypePassation } from '../type_passation';
import { TypePassationService } from '../type_passation.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-type_passation-new',
  templateUrl: './type_passation-new.component.html',
  styleUrls: ['./type_passation-new.component.scss']
})
export class TypePassationNewComponent implements OnInit {
  type_passation: TypePassation;
  constructor(public type_passationSrv: TypePassationService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.type_passation = new TypePassation();
  }

  ngOnInit() {
  }

  saveTypePassation() {
    this.type_passationSrv.create(this.type_passation)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('TypePassation créé avec succès');
        this.type_passation = new TypePassation();
      }, error => this.type_passationSrv.httpSrv.handleError(error));
  }

  saveTypePassationAndExit() {
    this.type_passationSrv.create(this.type_passation)
      .subscribe((data: any) => {
        this.router.navigate([this.type_passationSrv.getRoutePrefix(), data.id]);
      }, error => this.type_passationSrv.httpSrv.handleError(error));
  }

}

