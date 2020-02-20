import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TypeClasse } from 'app/parametrage/type_classe/type_classe';
import { CategorieClasse } from 'app/parametrage/categorie_classe/categorie_classe';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-classe-new',
  templateUrl: './classe-new.component.html',
  styleUrls: ['./classe-new.component.scss']
})
export class ClasseNewComponent implements OnInit {
  classe: Classe;
  @Input() typeClasses: TypeClasse[] = [];
  @Input() categorieClasses: CategorieClasse[] = [];
  @Output() onAddedClasse: EventEmitter<any> = new EventEmitter();
  types: SelectItem[];
  validNumero: boolean;



  constructor(public classeSrv: ClasseService,
    private activatedRoute: ActivatedRoute, public modalSrv: NgbModal,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.classe = new Classe();
  }

  ngOnInit() {
  }

  saveClasse() {
    const tempClass = new Classe();
    Object.assign(tempClass, this.classe);
    this.classe.typeClasse = this.classe.typeClasse.id;
    this.classe.categorieClasse = this.classe.categorieClasse.id;
    this.classeSrv.create(this.classe)
      .subscribe((data: any) => {
        this.onAddedClasse.emit(data);
        this.notificationSrv.showInfo('Classe créé avec succès');
        this.classe = new Classe();
      }, error => {
        this.classe = tempClass;
        this.classeSrv.httpSrv.handleError(error);
      });
  }

  public closeModal() {
    this.modalSrv.dismissAll('Cross click');
  }

  addSubclasse() {
    
  }


}