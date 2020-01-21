import { Component, OnInit } from '@angular/core';
import { TypeDocument } from '../type_document';
import { TypeDocumentService } from '../type_document.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-type_document-new',
  templateUrl: './type_document-new.component.html',
  styleUrls: ['./type_document-new.component.scss']
})
export class TypeDocumentNewComponent implements OnInit {
  type_document: TypeDocument;
  constructor(public type_documentSrv: TypeDocumentService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.type_document = new TypeDocument();
  }

  ngOnInit() {
  }

  saveTypeDocument() {
    this.type_documentSrv.create(this.type_document)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('TypeDocument créé avec succès');
        this.type_document = new TypeDocument();
      }, error => this.type_documentSrv.httpSrv.handleError(error));
  }

  saveTypeDocumentAndExit() {
    this.type_documentSrv.create(this.type_document)
      .subscribe((data: any) => {
        this.router.navigate([this.type_documentSrv.getRoutePrefix(), data.id]);
      }, error => this.type_documentSrv.httpSrv.handleError(error));
  }

}

