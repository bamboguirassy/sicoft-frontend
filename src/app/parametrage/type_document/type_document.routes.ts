import { Route } from "@angular/router";
import { TypeDocumentListComponent } from './type_document-list/type_document-list.component';
import { TypeDocumentNewComponent } from './type_document-new/type_document-new.component';
import { TypeDocumentEditComponent } from './type_document-edit/type_document-edit.component';
import { TypeDocumentCloneComponent } from './type_document-clone/type_document-clone.component';
import { TypeDocumentShowComponent } from './type_document-show/type_document-show.component';
import { MultipleTypeDocumentResolver } from './multiple-type_document.resolver';
import { OneTypeDocumentResolver } from './one-type_document.resolver';

const type_documentRoutes: Route = {
    path: 'typeDocument', children: [
        { path: '', component: TypeDocumentListComponent, resolve: { type_documents: MultipleTypeDocumentResolver } },
        { path: 'new', component: TypeDocumentNewComponent },
        { path: ':id/edit', component: TypeDocumentEditComponent, resolve: { type_document: OneTypeDocumentResolver } },
        { path: ':id/clone', component: TypeDocumentCloneComponent, resolve: { type_document: OneTypeDocumentResolver } },
        { path: ':id', component: TypeDocumentShowComponent, resolve: { type_document: OneTypeDocumentResolver } }
    ]

};

export { type_documentRoutes }
