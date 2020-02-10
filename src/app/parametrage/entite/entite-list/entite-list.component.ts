<<<<<<< HEAD
import { Component, OnInit } from "@angular/core";
import { Entite } from "../entite";
import { ActivatedRoute, Router } from "@angular/router";
import { EntiteService } from "../entite.service";
import { entiteColumns, allowedEntiteFieldsForFilter } from "../entite.columns";
import { ExportService } from "app/shared/services/export.service";
import { MenuItem, SelectItem } from "primeng/api";
import { AuthService } from "app/shared/services/auth.service";
import { NotificationService } from "app/shared/services/notification.service";
import { TypeEntite } from "app/parametrage/type_entite/type_entite";
import { equal } from "assert";
=======
import {Component, OnInit} from '@angular/core';
import {Entite} from '../entite';
import {ActivatedRoute, Router} from '@angular/router';
import {EntiteService} from '../entite.service';
import {entiteColumns, allowedEntiteFieldsForFilter} from '../entite.columns';
import {ExportService} from 'app/shared/services/export.service';
import {MenuItem} from 'primeng/api';
import {AuthService} from 'app/shared/services/auth.service';
import {NotificationService} from 'app/shared/services/notification.service';
import { User } from '../../user/user';

>>>>>>> ac45c95babba549c67f1986f85811b2cb0a4da73

@Component({
  selector: "app-entite-list",
  templateUrl: "./entite-list.component.html",
  styleUrls: ["./entite-list.component.scss"]
})
export class EntiteListComponent implements OnInit {
<<<<<<< HEAD
  entites: Entite[] = [];
  dropdownEntites: Entite[] = [];
  originalEntites: Entite[] = [];
  filteredEntites: Entite[] = [];
  selectedEntites: Entite[];
  selectedEntite: Entite;
  selectedTypeEntite: TypeEntite;
  selectedEntiteParent: Entite;
  selectedEtat: any;
  clonedEntites: Entite[];

  cMenuItems: MenuItem[] = [];

  cols: any[];
  tableColumns = entiteColumns;

  etats: any[] = [];
  entiteParents: any[] = [];
  typeEntites: TypeEntite[] = [];
  // allowed fields for filter
  globalFilterFields = allowedEntiteFieldsForFilter;

  constructor(
    private activatedRoute: ActivatedRoute,
    public entiteSrv: EntiteService,
    public exportSrv: ExportService,
    private router: Router,
    public authSrv: AuthService,
    public notificationSrv: NotificationService
  ) {}

  ngOnInit() {
    if (this.authSrv.checkShowAccess("Entite")) {
      this.cMenuItems.push({
        label: "Afficher détails",
        icon: "pi pi-eye",
        command: event => this.viewEntite(this.selectedEntite)
      });
    }
    if (this.authSrv.checkEditAccess("Entite")) {
      this.cMenuItems.push({
        label: "Modifier",
        icon: "pi pi-pencil",
        command: event => this.editEntite(this.selectedEntite)
      });
=======

    entites: Entite[] = [];
    selectedEntites: Entite[];
    selectedEntite: Entite;
    clonedEntites: Entite[];
    AllUsers: User[] = [];

    cMenuItems: MenuItem[] = [];

    tableColumns = entiteColumns;
    // allowed fields for filter
    globalFilterFields = allowedEntiteFieldsForFilter;

    constructor(
        private activatedRoute: ActivatedRoute,
        public entiteSrv: EntiteService, public exportSrv: ExportService,
        private router: Router, public authSrv: AuthService,
        public notificationSrv: NotificationService) {
    }

    ngOnInit() {
        if (this.authSrv.checkShowAccess('Entite')) {
            this.cMenuItems.push({label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewEntite(this.selectedEntite)});
        }
        if (this.authSrv.checkEditAccess('Entite')) {
            this.cMenuItems.push({label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editEntite(this.selectedEntite)})
        }
        if (this.authSrv.checkCloneAccess('Entite')) {
            this.cMenuItems.push({label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneEntite(this.selectedEntite)})
        }
        if (this.authSrv.checkDeleteAccess('Entite')) {
            this.cMenuItems.push({label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteEntite(this.selectedEntite)})
        }

        this.entites = this.activatedRoute.snapshot.data['entites'];
        this.AllUsers =  this.activatedRoute.snapshot.data['AllUsers'];
>>>>>>> ac45c95babba549c67f1986f85811b2cb0a4da73
    }
    if (this.authSrv.checkCloneAccess("Entite")) {
      this.cMenuItems.push({
        label: "Cloner",
        icon: "pi pi-clone",
        command: event => this.cloneEntite(this.selectedEntite)
      });
    }
    if (this.authSrv.checkDeleteAccess("Entite")) {
      this.cMenuItems.push({
        label: "Supprimer",
        icon: "pi pi-times",
        command: event => this.deleteEntite(this.selectedEntite)
      });
    }

    this.entites = this.activatedRoute.snapshot.data["entites"];
    this.dropdownEntites = this.activatedRoute.snapshot.data["entites"];
    this.typeEntites = this.activatedRoute.snapshot.data["typeEntites"];
    Object.assign(this.originalEntites, this.entites);

    this.etats = [
      { label: "Actif", value: "true" },
      { label: "Inactif", value: "false" }
    ];
  }

  viewEntite(entite: Entite) {
    this.router.navigate([this.entiteSrv.getRoutePrefix(), entite.id]);
  }

  editEntite(entite: Entite) {
    this.router.navigate([this.entiteSrv.getRoutePrefix(), entite.id, "edit"]);
  }

  cloneEntite(entite: Entite) {
    this.router.navigate([this.entiteSrv.getRoutePrefix(), entite.id, "clone"]);
  }

  deleteEntite(entite: Entite) {
    this.entiteSrv.remove(entite).subscribe(
      data => this.refreshList(),
      error => this.entiteSrv.httpSrv.handleError(error)
    );
  }

  deleteSelectedEntites() {
    if (this.selectedEntites) {
      this.entiteSrv.removeSelection(this.selectedEntites).subscribe(
        data => this.refreshList(),
        error => this.entiteSrv.httpSrv.handleError(error)
      );
    } else {
      this.entiteSrv.httpSrv.notificationSrv.showWarning(
        "Selectionner au moins un élement"
      );
    }
  }

  refreshList() {
    this.entiteSrv.findAll().subscribe(
      (data: any) => (this.entites = data),
      error => this.entiteSrv.httpSrv.handleError(error)
    );
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.entites, "entites");
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.entites);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

  filterTypeEntite() {
    if (this.filteredEntites.length === 0) {
      if (this.entites.length === 0) {
        this.entites = this.originalEntites;
      }
      const tempEntites: Entite[] = new Array();
      Object.assign(this.entites, this.originalEntites);
      this.entites.forEach(entite => {
        if (entite.typeEntite.id === this.selectedTypeEntite.id) {
          tempEntites.push(entite);
        }
      });
      this.entites = tempEntites;
      Object.assign(this.filteredEntites, tempEntites);
    } else {
      // if (this.entites.length === 0) {
      //   this.entites = this.originalEntites;
      // }
      Object.assign(this.entites, this.originalEntites);
      const tempEntites: Entite[] = new Array();
      this.filteredEntites.forEach(entite => {
        if (entite.typeEntite.id === this.selectedTypeEntite.id) {
          tempEntites.push(entite);
        }
      });
      this.entites = tempEntites;
      Object.assign(this.filteredEntites, tempEntites);
    }
  }

  filterEntiteParent() {
    if (this.filteredEntites.length === 0) {
      if (this.entites.length === 0) {
        this.entites = this.originalEntites;
      }
      const tempEntites: Entite[] = new Array();
      Object.assign(this.entites, this.originalEntites);
      this.entites.forEach(entite => {
        if (
          entite.entiteParent !== null &&
          entite.entiteParent.id === this.selectedEntiteParent.id
        ) {
          tempEntites.push(entite);
        }
      });
      this.entites = tempEntites;
      Object.assign(this.filteredEntites, tempEntites);
    } else {
      // if (this.entites.length === 0) {
      //   this.entites = this.originalEntites;
      // }
      Object.assign(this.entites, this.originalEntites);
      const tempEntites: Entite[] = new Array();
      this.filteredEntites.forEach(entite => {
        if (
          entite.entiteParent !== null &&
          entite.entiteParent.id === this.selectedEntiteParent.id
        ) {
          tempEntites.push(entite);
        }
      });
      this.entites = tempEntites;
      Object.assign(this.filteredEntites, tempEntites);
    }
  }

  filterEtat() {
    console.log(this.filteredEntites);
    if (this.filteredEntites.length === 0) {
      const tempEntites: Entite[] = new Array();
      Object.assign(this.entites, this.originalEntites);
      this.selectedEtat.forEach((etat: any) => {
        this.entites.forEach((entite: Entite) => {
          if (etat === "true" && entite.etat === true) {
            tempEntites.push(entite);
          }
          if (etat === "false" && entite.etat === false) {
            tempEntites.push(entite);
          }
        });
      });
      this.entites = tempEntites;
      Object.assign(this.filteredEntites, tempEntites);
      // if (this.entites.length === 0) {
      //   this.entites = this.originalEntites;
      // }
    } else {
      console.log("Il est dans le else de etat");
      Object.assign(this.entites, this.originalEntites);
      const tempEntites: Entite[] = new Array();
      this.selectedEtat.forEach((etat: any) => {
        this.filteredEntites.forEach((entite: Entite) => {
          if (etat === "true" && entite.etat === true) {
            tempEntites.push(entite);
          }
          if (etat === "false" && entite.etat === false) {
            tempEntites.push(entite);
          }
        });
      });
      this.entites = tempEntites;
      Object.assign(this.filteredEntites, tempEntites);
      // if (this.entites.length === 0) {
      //   this.entites = this.originalEntites;
      // }
      console.log(this.filteredEntites);
    }
  }
}
