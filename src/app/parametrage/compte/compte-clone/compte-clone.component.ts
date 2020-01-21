
import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { Location } from '@angular/common';
import { Compte } from '../compte';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compte-clone',
  templateUrl: './compte-clone.component.html',
  styleUrls: ['./compte-clone.component.scss']
})
export class CompteCloneComponent implements OnInit {
  compte: Compte;
  original: Compte;
  constructor(public compteSrv: CompteService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['compte'];
    this.compte = Object.assign({}, this.original);
    this.compte.id = null;
  }

  cloneCompte() {
    this.compteSrv.clone(this.original, this.compte)
      .subscribe((data: any) => {
        this.router.navigate([this.compteSrv.getRoutePrefix(), data.id]);
      }, error => this.compteSrv.httpSrv.handleError(error));
  }

}
