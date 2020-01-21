
import { Component, OnInit } from '@angular/core';
import { TypePassationService } from '../type_passation.service';
import { TypePassation } from '../type_passation';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_passation-edit',
  templateUrl: './type_passation-edit.component.html',
  styleUrls: ['./type_passation-edit.component.scss']
})
export class TypePassationEditComponent implements OnInit {

  type_passation: TypePassation;
  constructor(public type_passationSrv: TypePassationService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_passation = this.activatedRoute.snapshot.data['type_passation'];
  }

  updateTypePassation() {
    this.type_passationSrv.update(this.type_passation)
      .subscribe(data => this.location.back(),
        error => this.type_passationSrv.httpSrv.handleError(error));
  }

}
