import { CompteService } from './../../compte/compte.service';
import { CompteDivisionnaireService } from './../../compte_divisionnaire/compte_divisionnaire.service';
import { Compte } from './../../compte/compte';
import { CompteDivisionnaire } from './../../compte_divisionnaire/compte_divisionnaire';
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
  selectedItem: TreeNode;
  tableColumns = classeColumns;
  typeClasses: TypeClasse[] = [];
  categorieClasses: TypeClasse[] = [];
  isValidNumber = false;
  isValidLabel = false;
  modalTitle: string;
  maxlength: number = 2;
  isFormValid = false;
  inputObject: {
    id: number,
    value: SousClasse | CompteDivisionnaire | Compte | any,
    plainNumber: any,
    isNumberValid: boolean,
    isLabelValid: boolean,
  }[] = [{
    id: 0,
    value: new Object(),
    plainNumber: '',
    isNumberValid: false,
    isLabelValid: false,
  }];
  randIds = 1;
  nativeType: string;
  selectedSousClasses: SousClasse[] = [];
  @ViewChild('subClassModal', { static: false }) subClassemodalContentRef: TemplateRef<any>;
  @ViewChild('deletionConfirm', { static: false }) deletionModalContentRef: TemplateRef<any>;

  treeNodes: TreeNode[] = [];
  loading: boolean;

  cMenuItems: MenuItem[] = [];

  // allowed fields for filter
  globalFilterFields = allowedClasseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public classeSrv: ClasseService, public exportSrv: ExportService, public modalSrv: NgbModal,
    private router: Router, public authSrv: AuthService, public sousClasseSrv: SousClasseService,
    public compteDivisionnaireSrv: CompteDivisionnaireService, public compteSrv: CompteService,
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
    } else if (node.data.type === 'sousClasse') {
      this.fetchDivsionalAccount(node);
    } else if (node.data.type === 'compteDivisionnaire') {
      this.fetchAccount(node);
    }
  }
  fetchAccount(node: any) {
    this.loading = true;
    this.compteSrv.findByCompteDivisionnaire(node.data.id)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.loading = false;
          window.scrollTo(0, 0);
          this.notificationSrv.showWarning('Aucun compte trouvé.');
          return;
        }
        const accountNode: TreeNode[] = [];
        data.forEach((account: any) => {
          account.type = 'compte';
          accountNode.push({ data: account, children: [], leaf: true, parent: node });
        });
        node.children = accountNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      })
  }

  fetchDivsionalAccount(node: any) {
    this.loading = true;
    this.compteDivisionnaireSrv.findBySousClasse(node.data.id)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.loading = false;
          window.scrollTo(0, 0);
          this.notificationSrv.showWarning('Aucun compte divisionnaire trouvé.');
          return;
        }
        const divisionalAccountNode: TreeNode[] = [];
        data.forEach((divisionalAccount: any) => {
          divisionalAccount.type = 'compteDivisionnaire';
          divisionalAccountNode.push({ data: divisionalAccount, children: [], leaf: false, parent: node });
        });
        node.children = divisionalAccountNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      })
  }

  fetchSubClasses(node: any) {
    this.loading = true;
    this.classeSrv.findByClass(node.data.id)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.loading = false;
          window.scrollTo(0, 0);
          this.notificationSrv.showWarning('Aucune Sous classe trouvé.');
          return;
        }
        const subClassNode: TreeNode[] = [];
        data.forEach((subClass: any) => {
          subClass.type = 'sousClasse';
          subClassNode.push({ data: subClass, children: [], leaf: false, parent: node });
        });
        node.children = subClassNode;
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      });

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

  /** Fonction de suppressions **/
  deleteClasse(classe: Classe) {
    this.classeSrv.remove(classe)
      .subscribe(data => {
        this.refreshList();
        this.modalSrv.dismissAll();
        this.notificationSrv.showInfo('Suppression réussi.');
      }, error => {
        if (error.error.code === 417) {
          window.scrollTo(0, 0);
          this.modalSrv.dismissAll();
          this.notificationSrv.showError('Suppression impossible. La sous classe n\'est pas vide.');
        } else {
          this.notificationSrv.showError(error.error.message)
        }
      })
  }


  deleteSubClasse(sousClasse: SousClasse) {
    this.sousClasseSrv.remove(sousClasse)
      .subscribe((data: any) => {
        this.modalSrv.dismissAll();
        this.refreshParentWithoutChild(data);
        this.notificationSrv.showInfo('Suppression réussi');
      }, error => {
        if (error.error.code === 417) {
          window.scrollTo(0, 0);
          this.modalSrv.dismissAll();
          this.notificationSrv.showError('Suppression impossible. La sous classe n\'est pas vide.');
        } else {
          this.notificationSrv.showError(error.error.message);
        }
      })
  }

  deleteDivisionalAccount(compteDivisionnaire: CompteDivisionnaire) {
    this.compteDivisionnaireSrv.remove(compteDivisionnaire)
      .subscribe(data => {
        this.modalSrv.dismissAll();
        this.refreshParentWithoutChild(data);
        this.notificationSrv.showInfo('Suppression réussi');
      }, error => {
        if (error.error.code === 417) {
          window.scrollTo(0, 0);
          this.modalSrv.dismissAll();
          this.notificationSrv.showError('Suppression impossible. La sous classe n\'est pas vide.');
        } else {
          this.modalSrv.dismissAll();
          this.notificationSrv.showError(error.error.message);
        }
      })
  }

  deleteAccount(compte: Compte) {
    this.compteSrv.remove(compte)
      .subscribe((data: any) => {
        this.modalSrv.dismissAll();
        this.refreshParentWithoutChild(data);
        this.notificationSrv.showInfo('Suppression réussi');
      }, error => {
        this.modalSrv.dismissAll();
        this.notificationSrv.showError(error.error.message);
      })
  }

  /** fin Fonction de suppressions **/

  refreshParentWithoutChild(data: any) {
    const parent = this.selectedItem.parent;
    parent.children = parent.children.filter(child => child.data.numero !== data.numero)
    this.treeNodes = [...this.treeNodes];
  }

  refreshNodeChild(node: TreeNode) {
    switch (node.data.type) {
      case 'classe': {
        this.fetchSubClasses(node);
        break;
      }
      case 'sousClasse': {
        this.fetchDivsionalAccount(node);
        break;
      }
      case 'compteDivisionnaire': {
        this.fetchAccount(node);
        break;
      }
      default:
        console.log('can\'t handle this type');
    }

  }

  toggleConfirmModal() {
    if (this.selectedItem.data.type === 'classe') {
      this.nativeType = 'la Classe';
    } else if (this.selectedItem.data.type === 'sousClasse') {
      this.nativeType = 'la Sous Classe';
    } else if (this.selectedItem.data.type === 'compteDivisionnaire') {
      this.nativeType = 'le Compte Divisionnaire';
    } else if (this.selectedItem.data.type === 'compte') {
      this.nativeType = 'le Compte';
    }
    this.modalSrv.open(this.deletionModalContentRef, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  deleteItemAfterConfirmation(item: any): void {
    if (item.data.type === 'classe') {
      this.deleteClasse(item.data);
    } else if (item.data.type === 'sousClasse') {
      this.deleteSubClasse(item.data)
    } else if (item.data.type === 'compteDivisionnaire') {
      this.deleteDivisionalAccount(item.data);
    } else if (item.data.type === 'compte') {
      this.deleteAccount(item.data);
    }

  }

  dissmissModal(param: string) {
    this.modalSrv.dismissAll(param);
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
        this.classes.forEach(classe => {
          classe.type = 'classe';
        })
        this.treeNodes = this.getTreeNodes(this.classes);
        this.treeNodes = [...this.treeNodes];
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
    const modalRef = this.modalSrv.open(ClasseNewComponent, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.componentInstance.typeClasses = this.typeClasses;
    modalRef.componentInstance.categorieClasses = this.categorieClasses;
    modalRef.componentInstance.onAddedClasse
      .subscribe((data: any) => {
        this.treeNodes.push({ data: data, children: [], leaf: false });
        this.treeNodes = [...this.treeNodes];
      }, (error: any) => this.classeSrv.httpSrv.handleError(error));
  }

  /** Gestion du menu contextuelle dynamique **/
  toggleContextMenu() {
    // this.maxlength = this.selectedItem.data.type === 'classe' ? 1 : (this.selectedItem.data.type === 'sousClasse' ? 1 : 1);
    this.maxlength = 1;
    if (this.selectedItem.data.type === 'classe') {
      this.modalTitle = 'Sous Classe - ' + this.selectedItem.data.libelle;
      this.showClassMenu();
    } else if (this.selectedItem.data.type === 'sousClasse') {
      this.modalTitle = 'Compte Divisionnaire - ' + this.selectedItem.data.libelle;
      this.showSubClassMenu();
    } else if (this.selectedItem.data.type === 'compteDivisionnaire') {
      this.modalTitle = 'Compte - ' + this.selectedItem.data.libelle;
      this.showDivisionalAccountMenu();
    } else if (this.selectedItem.data.type === 'compte') {
      this.showLeafMenu();
    }
  }

  showLeafMenu() {
    if (this.authSrv.checkDeleteAccess('Compte')) {
      this.cMenuItems = [
        {
          label: 'Supprimer', icon: 'pi pi-trash',
          command: (event) => this.toggleConfirmModal()
        }
      ]
    }
  }

  showDivisionalAccountMenu() {
    if (this.authSrv.checkCreateAccess('Compte') && this.authSrv.checkDeleteAccess('Compte')) {
      this.cMenuItems = [
        {
          label: 'Ajouter des comptes ', icon: 'pi pi-plus-circle',
          command: (event) => this.toggleSubClassModal(this.subClassemodalContentRef)
        },
        {
          label: 'Supprimer', icon: 'pi pi-trash',
          command: (event) => this.toggleConfirmModal()
        }
      ]
    }
  }


  showSubClassMenu() {
    if (this.authSrv.checkCreateAccess('CompteDivisionnaire') && this.authSrv.checkDeleteAccess('CompteDivisionnaire')) {
      this.cMenuItems = [
        {
          label: 'Ajouter des compte divisionnaire', icon: 'pi pi-plus-circle',
          command: (event) => this.toggleSubClassModal(this.subClassemodalContentRef)
        },
        {
          label: 'Supprimer', icon: 'pi pi-trash',
          command: (event) => this.toggleConfirmModal()
        }
      ]
    }
  }

  showClassMenu() {
    if (this.authSrv.checkCreateAccess('SousClasse') && this.authSrv.checkDeleteAccess('Classe')) {
      this.cMenuItems = [
        {
          label: 'Ajouter des sous classe', icon: 'pi pi-plus-circle',
          command: (event) => this.toggleSubClassModal(this.subClassemodalContentRef)
        },
        {
          label: 'Supprimer', icon: 'pi pi-trash',
          command: (event) => this.toggleConfirmModal()
        }
      ]
    }
  }

  /** fin Gestion du menu contextuelle dynamique **/


  toggleSubClassModal(content: TemplateRef<any>) {
    this.modalSrv.open(content, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  /** Gestion du formulaire dynamique **/
  addInputItem() {
    this.inputObject.push({ id: this.randIds, value: new SousClasse(), plainNumber: '', isLabelValid: false, isNumberValid: false });
    this.inputObject = [...this.inputObject];
    this.randIds++;
    this.isValidLabel = false;
    this.isValidNumber = false;
    this.isFormValid = false;
  }

  removeInputItem(inputId: number) {
    this.inputObject = this.inputObject.filter(inputNumber => inputNumber.id !== inputId);
    this.isFormValid =
      this.inputObject[this.inputObject.length - 1].isLabelValid && this.inputObject[this.inputObject.length - 1] ? true : false;
  }

  refeshAddForm() {
    this.inputObject = [{
      id: 0,
      value: new Object(),
      plainNumber: '',
      isNumberValid: false,
      isLabelValid: false,
    }];
  }
  /** fin Gestion du formulaire dynamique **/
  /**** fonctions pour la fonctionnalité d'ajout multiple.  ******/

  addItems() {

    if (this.selectedItem.data.type === 'classe') {
      this.addSubClass();
    } else if (this.selectedItem.data.type === 'sousClasse') {
      this.addCompteDivisionnaire();
    } else if (this.selectedItem.data.type === 'compteDivisionnaire') {
      this.addAccount();
    }
  }

  addAccount() {
    const accountToCreate: Compte[] = [];
    this.inputObject.forEach(currentInput => {
      currentInput.value.compteDivisionnaire = this.selectedItem.data.id;
      currentInput.value.numero = `${this.selectedItem.data.numero}${currentInput.plainNumber}`;
      accountToCreate.push(currentInput.value);
    })
    this.loading = true;
    this.compteSrv.createMultiple(accountToCreate)
      .subscribe((createdAccounts: any) => {
        const mutedTreeNode: TreeNode = this.selectedItem
        createdAccounts.forEach((createdAccount: any) => {
          createdAccount.type = 'compte';
          mutedTreeNode.children.push({ data: createdAccount, children: [], leaf: true })
        });
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
        this.notificationSrv.showInfo('Enregistrement Effectué');
        this.refeshAddForm();
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      })
  }

  addCompteDivisionnaire() {
    const divisionalAccountToCreate: CompteDivisionnaire[] = [];
    this.inputObject.forEach(currentInput => {
      currentInput.value.sousClasse = this.selectedItem.data.id;
      currentInput.value.numero = `${this.selectedItem.data.numero}${currentInput.plainNumber}`;
      divisionalAccountToCreate.push(currentInput.value);
    })
    this.loading = true;
    this.compteDivisionnaireSrv.createMultiple(divisionalAccountToCreate)
      .subscribe((createdDivisionalAccounts: any) => {
        const mutedTreeNode: TreeNode = this.selectedItem;
        createdDivisionalAccounts.forEach((createdDivisionalAccount: any) => {
          createdDivisionalAccount.type = 'compteDivisionnaire';
          mutedTreeNode.children.push({ data: createdDivisionalAccount, children: [], leaf: false })
        });
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
        this.notificationSrv.showInfo('Enregistrement Effectué.');
        this.refeshAddForm();
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      })

  }


  addSubClass() {
    const subClassesToCreate: SousClasse[] = [];
    this.inputObject.forEach(currentInput => {
      currentInput.value.classe = this.selectedItem.data.id;
      currentInput.value.numero = `${this.selectedItem.data.numero}${currentInput.plainNumber}`;
      subClassesToCreate.push(currentInput.value);
    });
    this.loading = true;
    this.sousClasseSrv.createMultiple(subClassesToCreate)
      .subscribe((createdSubClasses: any) => {
        this.notificationSrv.showInfo('Enregistrement Effectué.');
        const mutedTreeNode = this.treeNodes.filter(treeNode => treeNode.data.id === this.selectedItem.data.id);
        createdSubClasses.forEach((createdSubClasse: any) => {
          createdSubClasse.type = 'sousClasse';
          mutedTreeNode[0].children.push({ data: createdSubClasse, children: [], leaf: false })
        })
        this.treeNodes = [...this.treeNodes];
        this.loading = false;
        this.refeshAddForm();
      }, error => {
        this.notificationSrv.showError(error.error.message);
        this.loading = false;
      });
  }
  /**** fin fonctions pour la fonctionnalité d'ajout multiple.  ******/



  /**** fonction de mise à jour pour la modification inline  */
  update(e: any) {
    switch (e.data.node.data.type) {
      case 'classe': {
        this.updateClasse(e.data.node.data);
        break;
      }

      case 'sousClasse': {
        this.updateSubClasse(e.data.node);
        break;
      }

      case 'compteDivisionnaire': {
        this.updateDivisionalAccount(e.data.node);
        break;
      }

      case 'compte': {
        this.updateAccount(e.data.node);
        break;
      }
      default: {
        console.log('cant handle this type');
        break;
      }

    }
  }

  updateClasse(classe: Classe) {
    if ((classe.numero && classe.numero.toString().length === 1) && (classe.libelle && classe.libelle.trim().length !== 0)) {
      this.classeSrv.update(classe)
        .subscribe(updatedClasse => {
        }, error => {
          this.notificationSrv.showError(error.error.message);
        })
    } else {
      this.notificationSrv.showWarning('Le numero de la classe doit comporter au plus 1 chiffres et son libelle ne peut être vide.');
      this.refreshList();
    }

  }

  updateSubClasse(sousClasseNode: TreeNode) {
    if (this.hasValidNumero(sousClasseNode) && this.hasValidLibelle(sousClasseNode)) {
      this.sousClasseSrv.update(sousClasseNode.data)
        .subscribe(updatedSubClasse => {
        }, error => {
          this.notificationSrv.showError(error.error.message);
        })
    } else {
      this.rollbackChildChanges(sousClasseNode);
    }

  }


  updateDivisionalAccount(compteDivisionnaireNode: TreeNode) {
    if (this.hasValidNumero(compteDivisionnaireNode) && this.hasValidLibelle(compteDivisionnaireNode)) {
      this.compteDivisionnaireSrv.update(compteDivisionnaireNode.data)
        .subscribe(updatedDivisionnalAccount => {
        }, error => {
          this.notificationSrv.showError(error.error.message);
        })
    } else {
      this.rollbackChildChanges(compteDivisionnaireNode);
    }

  }

  updateAccount(compteNode: TreeNode) {
    if (this.hasValidNumero(compteNode) && this.hasValidLibelle(compteNode)) {
      this.compteSrv.update(compteNode.data)
        .subscribe(updatedAccount => {

        }, error => {
          this.notificationSrv.showError(error.error.message);
        });
    } else {
      this.rollbackChildChanges(compteNode);
    }
  }

  /**** fin fonction de mise à jour pour la modification inline  */

  /************ Validation functions  *********************/
  validNumber(e: any) {
    this.isFormValid = false;
    this.isValidNumber = false;
    this.isValidNumber =
      e.isNumberValid =
      e.plainNumber && e.plainNumber.trim() !== '' && /^[0-9]+$/.test(e.plainNumber) ? true : false;
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

  checkIfAllIsValid() {
    let validItems = 0;
    this.inputObject.forEach(input => {
      if (input.isLabelValid && input.isNumberValid) {
        validItems++;
      };
    });
    return validItems === this.inputObject.length ? true : false;
  }

  /************ end Validation functions  *********************/

  closeModal() {
    this.inputObject = [{
      id: 0,
      value: new SousClasse(),
      isNumberValid: false,
      isLabelValid: false,
      plainNumber: '',
    }];
    this.randIds = 1;
    this.isFormValid = false;
    this.isValidLabel = false;
    this.isValidNumber = false;
    this.modalSrv.dismissAll('Cross click');
  }

  rollbackChanges(e: any) {
    this.refreshList();
  }

  rollbackChildChanges(node: TreeNode) {
    let msg = '';
    const validLength = node.parent.data.numero.toString().length + 1;
    if (!this.hasValidNumero(node)) {
      msg += 'Le numero doit commencer par ' + node.parent.data.numero + '.\n';
    }
    if (!this.hasValidLibelle(node)) {
      msg += 'La valeur du libelle ne peut être vide.\n';
    }
    if (node.data.numero && node.data.numero.toString().length > validLength) {
      msg += ' et doit contenir au plus ' + validLength + ' chiffres.\n'
    }
    window.scrollTo(0, 0);
    this.notificationSrv.showWarning(msg);
    this.refreshNodeChild(node.parent);
  }

  hasValidNumero(node: TreeNode): boolean {
    const validLength = node.parent.data.numero.toString().length + 1;
    return node.data.numero && node.data.numero.toString().startsWith(node.parent.data.numero)
      && node.data.numero.toString().length <= validLength
      ? true : false;
  }
  hasValidLibelle(node: TreeNode): boolean {
    if (!node.data.libelle) {
      return false;
    }
    if (node.data.libelle === '') {
      return false;
    }

    return true;
  }
}
