
import { Component, OnInit } from '@angular/core';
import { CompteDivisionnaireService } from '../compte_divisionnaire.service';
import { Location } from '@angular/common';
import { CompteDivisionnaire } from '../compte_divisionnaire';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compte_divisionnaire-clone',
  templateUrl: './compte_divisionnaire-clone.component.html',
  styleUrls: ['./compte_divisionnaire-clone.component.scss']
})
export class CompteDivisionnaireCloneComponent implements OnInit {
  compte_divisionnaire: CompteDivisionnaire;
  original: CompteDivisionnaire;
  constructor(public compte_divisionnaireSrv: CompteDivisionnaireService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['compte_divisionnaire'];
    this.compte_divisionnaire = Object.assign({}, this.original);
    this.compte_divisionnaire.id = null;
  }

  cloneCompteDivisionnaire() {
    console.log(this.compte_divisionnaire);
    this.compte_divisionnaireSrv.clone(this.original, this.compte_divisionnaire)
      .subscribe((data: any) => {
        this.router.navigate([this.compte_divisionnaireSrv.getRoutePrefix(), data.id]);
      }, error => this.compte_divisionnaireSrv.httpSrv.handleError(error));
  }

}
