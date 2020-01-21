
import { Component, OnInit } from '@angular/core';
import { TypePassationService } from '../type_passation.service';
import { Location } from '@angular/common';
import { TypePassation } from '../type_passation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type_passation-clone',
  templateUrl: './type_passation-clone.component.html',
  styleUrls: ['./type_passation-clone.component.scss']
})
export class TypePassationCloneComponent implements OnInit {
  type_passation: TypePassation;
  original: TypePassation;
  constructor(public type_passationSrv: TypePassationService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['type_passation'];
    this.type_passation = Object.assign({}, this.original);
    this.type_passation.id = null;
  }

  cloneTypePassation() {
    this.type_passationSrv.clone(this.original, this.type_passation)
      .subscribe((data: any) => {
        this.router.navigate([this.type_passationSrv.getRoutePrefix(), data.id]);
      }, error => this.type_passationSrv.httpSrv.handleError(error));
  }

}
