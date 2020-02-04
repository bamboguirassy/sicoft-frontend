import { Component, OnInit } from "@angular/core";
import { Secteur } from "../secteur";
import { ActivatedRoute, Router } from "@angular/router";
import { SecteurService } from "../secteur.service";
import { Location } from "@angular/common";
import { NotificationService } from "app/shared/services/notification.service";
import { FournisseurService } from "app/parametrage/fournisseur/fournisseur.service";
import { Fournisseur } from "app/parametrage/fournisseur/fournisseur";
import { allowedEntiteFieldsForFilter } from "app/parametrage/entite/entite.columns";

@Component({
  selector: "app-secteur-show",
  templateUrl: "./secteur-show.component.html",
  styleUrls: ["./secteur-show.component.scss"]
})
export class SecteurShowComponent implements OnInit {
  secteur: Secteur;
  selectedFournisseurs: any[];
  selectedId: number[] = [];
  fournisseurId: number[] = [];
  notSelectedFournisseurs: any[];
  globalFilterFields = allowedEntiteFieldsForFilter;
  loading: Boolean = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fournisseurSrv: FournisseurService,
    public secteurSrv: SecteurService,
    public location: Location,
    public router: Router,
    public notificationSrv: NotificationService
  ) {}

  ngOnInit() {
    this.secteur = this.activatedRoute.snapshot.data["secteur"];
  }

  removeSecteur() {
    this.secteurSrv.remove(this.secteur).subscribe(
      data => this.router.navigate([this.secteurSrv.getRoutePrefix()]),
      error => this.secteurSrv.httpSrv.handleError(error)
    );
  }

  refresh() {
    this.secteurSrv.findOneById(this.secteur.id).subscribe(
      (data: any) => (this.secteur = data),
      error => this.secteurSrv.httpSrv.handleError(error)
    );
  }

  

  deleteSelectedFournisseurs() {
    if (this.selectedFournisseurs) {
      this.loading = true;
      this.notSelectedFournisseurs = this.secteur.fournisseurs.filter(o => this.selectedFournisseurs.some(({id}) => o.id !== id));
      this.secteur.fournisseurs = this.notSelectedFournisseurs;
      this.secteur.fournisseurs = this.secteur.fournisseurs.map(data => data.id);
      this.secteurSrv.update(this.secteur).subscribe(
        (data: any ) => {
          this.loading = false;
          this.secteur.fournisseurs = data.fournisseurs;
        }, error => this.secteurSrv.httpSrv.handleError(error)
      );
    } else {
      this.secteurSrv.httpSrv.notificationSrv.showWarning(
        "Selectionner au moins un élement"
      );
     }
  }
}
