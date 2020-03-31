import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Exercice } from '../exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from '../exercice.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercice-show',
  templateUrl: './exercice-show.component.html',
  styleUrls: ['./exercice-show.component.scss']
})
export class ExerciceShowComponent implements OnInit {

  exercice: Exercice;
  exercicePrecedent: Exercice;
  exerciceLabel: string;
  @ViewChild('confirm', { static: false }) public modalContentRef: TemplateRef<any>;
  @ViewChild('simpleConfirm', { static: false }) public simpleModalContentRef: TemplateRef<any>;
  constructor(public activatedRoute: ActivatedRoute,
    public exerciceSrv: ExerciceService, public location: Location, private modalSrv: NgbModal,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.exercice = this.activatedRoute.snapshot.data['exercice'];
    this.exerciceLabel = `Exercice: ${this.exercice.libelle}`;
  }

  deleteAfterConfirmation(exercice: Exercice) {
    if (this.exercicePrecedent !== undefined) {
      this.exercicePrecedent.exerciceSuivant = null;
      this.exerciceSrv.update(this.exercicePrecedent).subscribe(data => data);

      this.exerciceSrv.remove(exercice).subscribe(
        data => this.router.navigate([this.exerciceSrv.getRoutePrefix()]),
        error => this.exerciceSrv.httpSrv.handleError(error)
      );
      this.modalSrv.dismissAll();
      this.exercicePrecedent = undefined;
    } else {
      this.exerciceSrv.remove(exercice).subscribe(
        data => this.router.navigate([this.exerciceSrv.getRoutePrefix()]),
        error => this.exerciceSrv.httpSrv.handleError(error)
      );
      this.modalSrv.dismissAll();
    }
  }

  getExercicePrecedent() {
    this.exerciceSrv.findExercicePrecedent(this.exercice).subscribe(
      (data: any) => (this.exercicePrecedent = data),
      error => {
        if (error.error.code === 404) {
          this.toggleConfirmModal(this.simpleModalContentRef);
        }
      }
    );
  }

  removeExercice() {
    this.getExercicePrecedent();
    if (this.exercicePrecedent !== undefined) {
      this.exerciceSrv.remove(this.exercice).subscribe(
        data => data,
        error => {
          if (error.error.code === 417) {
            this.toggleConfirmModal(this.modalContentRef);
          }
        }
      );
    }
  }

  public toggleConfirmModal(content: TemplateRef<any>) {
    this.modalSrv.open(content, {
      size: 'lg',
      backdropClass: 'light-blue-backdrop',
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  dissmissModal(param: string) {
    this.modalSrv.dismissAll(param);
  }

  refresh() {
    this.exerciceSrv.findOneById(this.exercice.id)
      .subscribe((data: any) => this.exercice = data,
        error => this.exerciceSrv.httpSrv.handleError(error));
  }

}

