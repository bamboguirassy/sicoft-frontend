
import { Component, OnInit } from '@angular/core';
import { TypeDocumentService } from '../type_document.service';
import { TypeDocument } from '../type_document';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_document-edit',
  templateUrl: './type_document-edit.component.html',
  styleUrls: ['./type_document-edit.component.scss']
})
export class TypeDocumentEditComponent implements OnInit {

  type_document: TypeDocument;
  constructor(public type_documentSrv: TypeDocumentService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_document = this.activatedRoute.snapshot.data['type_document'];
  }

  updateTypeDocument() {
    this.type_documentSrv.update(this.type_document)
      .subscribe(data => this.location.back(),
        error => this.type_documentSrv.httpSrv.handleError(error));
  }

}
