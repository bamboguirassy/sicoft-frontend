import { NgForm } from '@angular/forms';
import { SousClasseService } from './../../sous_classe/sous_classe.service';
import { SousClasse } from './../../sous_classe/sous_classe';
import { TypeClasse } from 'app/parametrage/type_classe/type_classe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseNewComponent } from './../classe-new/classe-new.component';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../classe.service';
import { classeColumns, allowedClasseFieldsForFilter } from '../classe.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem, TreeNode } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';



@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent implements OnInit {

  classes: Classe[] = [];
  selectedClasses: Classe[];
  selectedClasse: any;
  tableColumns = classeColumns;
  typeClasses: TypeClasse[] = [];
  categorieClasses: TypeClasse[] = [];
  isValidNumber = false;
  isValidLabel = false;
  isFormValid = false;
  inputObject: {
    id: number,
    value: SousClasse,
    isNumberValid: boolean,
    isLabelValid: boolean,
  }[] = [{
    id: 0,
    value: new SousClasse(),
    isNumberValid: false,
    isLabelValid: false,
  }];
  randIds = 1;
  selectedSousClasses: SousClasse[] = [];
  @ViewChild('subClassModal', { static: false }) subClassemodalContentRef: TemplateRef<any>;

  treeNodes: TreeNode[] = [];
  loading: boolean;

  cMenuItems: MenuItem[] = [];

  // allowed fields for filter
  globalFilterFields = allowedClasseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public classeSrv: ClasseService, public exportSrv: ExportService, public modalSrv: NgbModal,
    private router: Router, public authSrv: AuthService, public sousClasseSrv: SousClasseService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    this.loading = false;

    this.classes = this.activatedRoute.snapshot.data['classes'];
    this.typeClasses = this.activatedRoute.snapshot.data['typeClasses'];
    this.categorieClasses = this.activatedRoute.snapshot.data['categorieClasses'];
    this.treeNodes = this.getTreeNodes(this.classes);

    this.classes.forEach(classe => {
      classe.type = 'classe';
    });

    this.classes.forEach(classe => {
      classe.sousClasses.forEach(subClass => subClass.type = 'sousClasse');
    });
  }

  public getTreeNodes(classes: Classe[]): TreeNode[] {
    const treeNodes: TreeNode[] = [];
    classes.forEach(classe => {
      treeNodes.push({ data: classe, children: [], leaf: false });
    });
    return treeNodes;
  }

  onNodeExpand(event: any) {
    const node = event.node;

    if (node.data.type === 'classe') {
      this.fetchSubClasses(node);
    }
  }

  fetchSubClasses(node: any) {
    this.loading = true;
    this.classeSrv.findByClass(node.data.id)
      .subscribe((data: any) => {
        const subClassNode: TreeNode[] = [];
        data.forEach((subClass: any) => {
          subClassNode.push({ data: subClass, children: [], leaf: false })
        });
        node.children = subClassNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      } );

  }


  viewClasse(node: any) {
    console.log(node.data);

  }

  editClasse(classe: Classe) {
    this.router.navigate([this.classeSrv.getRoutePrefix(), classe.id, 'edit']);
  }

  cloneClasse(classe: Classe) {
    this.router.navigate([this.classeSrv.getRoutePrefix(), classe.id, 'clone']);
  }

  deleteClasse(classe: Classe) {
    this.classeSrv.remove(classe)
      .subscribe(data => this.refreshList(), error => this.classeSrv.httpSrv.handleError(error));
  }

  deleteSelectedClasses(classe: Classe) {
    if (this.selectedClasses) {
      this.classeSrv.removeSelection(this.selectedClasses)
        .subscribe(data => this.refreshList(), error => this.classeSrv.httpSrv.handleError(error));
    } else {
      this.classeSrv.httpSrv.notificationSrv.showWarning('Selectionner au moins un élement');
    }
  }

  refreshList() {
    this.loading = true;
    this.classeSrv.findAll()
      .subscribe((data: any) => {
        this.classes = data;
        this.treeNodes = this.getTreeNodes(this.classes);
        this.loading = false;
      }, error => {
        this.classeSrv.httpSrv.handleError(error);
        this.loading = false;
      });
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.classes, 'classes');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.classes);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

  toggleAddModal() {
    const modalRef = this.modalSrv.open(ClasseNewComponent, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
    modalRef.componentInstance.typeClasses = this.typeClasses;
    modalRef.componentInstance.categorieClasses = this.categorieClasses;
  }

  pushAddButton() {
    if (this.selectedClasse.data.type === 'classe') {
      this.showClassMenu();
    }
  }

  showClassMenu() {
    if (this.authSrv.checkCreateAccess('SousClasse') && this.authSrv.checkDeleteAccess('Classe')) {
      this.cMenuItems = [
        {
          label: 'Ajouter des sous classe', icon: 'pi pi-plus-circle',
          command: (event) => this.toggleSubClassModal(this.subClassemodalContentRef, this.selectedClasse)
        },
        {
          label: 'Supprimer', icon: 'pi pi-trash',
          command: (event) => this.deleteClasse(this.selectedClasse.data)
        }
      ]


    }
  }

  toggleSubClassModal(content: TemplateRef<any>, selectedClass: Classe) {
    this.modalSrv.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', centered: true });
  }

  addInputItem() {
    this.inputObject.push({ id: this.randIds, value: new SousClasse(), isLabelValid: false, isNumberValid: false });
    this.inputObject = [...this.inputObject];
    this.randIds++;
    this.isValidLabel = false;
    this.isValidNumber = false;
    this.isFormValid = false;
  }

  removeInputItem(inputId: number) {
    this.inputObject = this.inputObject.filter(inputNumber => inputNumber.id !== inputId);
    this.isFormValid = this.inputObject[this.inputObject.length-1].isLabelValid && this.inputObject[this.inputObject.length-1] ? true : false;
  }

  addSubclasse() {
    const subClassesToCreate: SousClasse[] = [];
    this.inputObject.forEach(currentInput => {
      currentInput.value.classe = this.selectedClasse.data.id;
      subClassesToCreate.push(currentInput.value);
    })
    this.sousClasseSrv.createMultiple(subClassesToCreate)
      .subscribe((createdSubClasses: any) => {
        createdSubClasses.forEach((createdSubclasse: any) => {
          this.notificationSrv.showInfo('Enregistrement Effectué.')
          const mutedTreeNode = this.treeNodes.filter(treeNode => treeNode.data.id === this.selectedClasse.data.id);
          const subClassNode: TreeNode[] = [];
          createdSubClasses.forEach((subClass: any) => {
            mutedTreeNode[0].children.push({ data: subClass, children: [], leaf: false })
          });
          this.treeNodes = [...this.treeNodes];
        })
      }, error => this.notificationSrv.showError(error.error.message));
  }

  validNumber(e: any) {
    this.isFormValid = false;
    this.isValidNumber = false;
    this.isValidNumber =
      e.isNumberValid = e.value.numero && e.value.numero.trim() !== '' && e.value.numero.startsWith(this.selectedClasse.data.numero) ? true : false;
    if (e.isNumberValid && e.isLabelValid && this.checkIfAllIsValid()) {
      this.isFormValid = true;
    }
  }

  labelValidator(e: any) {
    this.isFormValid = false;
    this.isValidLabel = false;
    this.isValidLabel =
      e.isLabelValid = e.value.libelle && e.value.libelle.trim() !== '' ? true : false;
    if (e.isNumberValid && e.isLabelValid && this.checkIfAllIsValid()) {
      this.isFormValid = true;
    }
  }

  closeModal() {
    this.inputObject = [{
      id: 0,
      value: new SousClasse(),
      isNumberValid: false,
      isLabelValid: false,
    }];
    this.randIds = 1;
    this.isFormValid = false;
    this.isValidLabel = false;
    this.isValidNumber = false;
    this.modalSrv.dismissAll('Cross click');
  }

  checkIfAllIsValid() {
    let validItems = 0;
    this.inputObject.forEach(input => {
      if (input.isLabelValid && input.isNumberValid) {
        validItems++;
      };
    });
    return validItems === this.inputObject.length ? true : false;
  }

}
