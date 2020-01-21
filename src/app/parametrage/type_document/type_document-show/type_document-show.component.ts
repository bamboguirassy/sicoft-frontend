import { Component, OnInit } from '@angular/core';
import { TypeDocument } from '../type_document';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeDocumentService } from '../type_document.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-type_document-show',
  templateUrl: './type_document-show.component.html',
  styleUrls: ['./type_document-show.component.scss']
})
export class TypeDocumentShowComponent implements OnInit {

  type_document: TypeDocument;
  constructor(public activatedRoute: ActivatedRoute,
    public type_documentSrv: TypeDocumentService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.type_document = this.activatedRoute.snapshot.data['type_document'];
  }

  removeTypeDocument() {
    this.type_documentSrv.remove(this.type_document)
      .subscribe(data => this.router.navigate([this.type_documentSrv.getRoutePrefix()]),
        error =>  this.type_documentSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.type_documentSrv.findOneById(this.type_document.id)
    .subscribe((data:any)=>this.type_document=data,
      error=>this.type_documentSrv.httpSrv.handleError(error));
  }

}

