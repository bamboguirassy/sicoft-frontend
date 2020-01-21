import { Component, OnInit } from '@angular/core';
import { TypeDocument } from '../type_document';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeDocumentService } from '../type_document.service';
import { type_documentColumns, allowedTypeDocumentFieldsForFilter } from '../type_document.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-type_document-list',
  templateUrl: './type_document-list.component.html',
  styleUrls: ['./type_document-list.component.scss']
})
export class TypeDocumentListComponent implements OnInit {

  type_documents: TypeDocument[] = [];
  selectedTypeDocuments: TypeDocument[];
  selectedTypeDocument: TypeDocument;
  clonedTypeDocuments: TypeDocument[];

  cMenuItems: MenuItem[]=[];

  tableColumns = type_documentColumns;
  //allowed fields for filter
  globalFilterFields = allowedTypeDocumentFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public type_documentSrv: TypeDocumentService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('TypeDocument')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewTypeDocument(this.selectedTypeDocument) });
    }
    if(this.authSrv.checkEditAccess('TypeDocument')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editTypeDocument(this.selectedTypeDocument) })
    }
    if(this.authSrv.checkCloneAccess('TypeDocument')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneTypeDocument(this.selectedTypeDocument) })
    }
    if(this.authSrv.checkDeleteAccess('TypeDocument')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteTypeDocument(this.selectedTypeDocument) })
    }

    this.type_documents = this.activatedRoute.snapshot.data['type_documents'];
  }

  viewTypeDocument(type_document: TypeDocument) {
      this.router.navigate([this.type_documentSrv.getRoutePrefix(), type_document.id]);

  }

  editTypeDocument(type_document: TypeDocument) {
      this.router.navigate([this.type_documentSrv.getRoutePrefix(), type_document.id, 'edit']);
  }

  cloneTypeDocument(type_document: TypeDocument) {
      this.router.navigate([this.type_documentSrv.getRoutePrefix(), type_document.id, 'clone']);
  }

  deleteTypeDocument(type_document: TypeDocument) {
      this.type_documentSrv.remove(type_document)
        .subscribe(data => this.refreshList(), error => this.type_documentSrv.httpSrv.handleError(error));
  }

  deleteSelectedTypeDocuments(type_document: TypeDocument) {
      if (this.selectedTypeDocuments) {
        this.type_documentSrv.removeSelection(this.selectedTypeDocuments)
          .subscribe(data => this.refreshList(), error => this.type_documentSrv.httpSrv.handleError(error));
      } else {
        this.type_documentSrv.httpSrv.notificationSrv.showWarning("Selectionner au moins un élement");
      }
  }

  refreshList() {
    this.type_documentSrv.findAll()
      .subscribe((data: any) => this.type_documents = data, error => this.type_documentSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.type_documents, 'type_documents');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.type_documents);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}