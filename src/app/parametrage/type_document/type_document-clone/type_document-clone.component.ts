
import { Component, OnInit } from '@angular/core';
import { TypeDocumentService } from '../type_document.service';
import { Location } from '@angular/common';
import { TypeDocument } from '../type_document';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type_document-clone',
  templateUrl: './type_document-clone.component.html',
  styleUrls: ['./type_document-clone.component.scss']
})
export class TypeDocumentCloneComponent implements OnInit {
  type_document: TypeDocument;
  original: TypeDocument;
  constructor(public type_documentSrv: TypeDocumentService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['type_document'];
    this.type_document = Object.assign({}, this.original);
    this.type_document.id = null;
  }

  cloneTypeDocument() {
    this.type_documentSrv.clone(this.original, this.type_document)
      .subscribe((data: any) => {
        this.router.navigate([this.type_documentSrv.getRoutePrefix(), data.id]);
      }, error => this.type_documentSrv.httpSrv.handleError(error));
  }

}
