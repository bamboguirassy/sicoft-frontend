
import { Component, OnInit } from '@angular/core';
import { AllocationService } from '../allocation.service';
import { Location } from '@angular/common';
import { Allocation } from '../allocation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allocation-clone',
  templateUrl: './allocation-clone.component.html',
  styleUrls: ['./allocation-clone.component.scss']
})
export class AllocationCloneComponent implements OnInit {
  allocation: Allocation;
  original: Allocation;
  constructor(public allocationSrv: AllocationService, public location: Location,
    public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.original = this.activatedRoute.snapshot.data['allocation'];
    this.allocation = Object.assign({}, this.original);
    this.allocation.id = null;
  }

  cloneAllocation() {
    console.log(this.allocation);
    this.allocationSrv.clone(this.original, this.allocation)
      .subscribe((data: any) => {
        this.router.navigate([this.allocationSrv.getRoutePrefix(), data.id]);
      }, error => this.allocationSrv.httpSrv.handleError(error));
  }

}
