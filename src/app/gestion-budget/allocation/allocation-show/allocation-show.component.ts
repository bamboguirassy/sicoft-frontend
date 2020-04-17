import { Component, OnInit } from '@angular/core';
import { Allocation } from '../allocation';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from '../allocation.service';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-allocation-show',
  templateUrl: './allocation-show.component.html',
  styleUrls: ['./allocation-show.component.scss']
})
export class AllocationShowComponent implements OnInit {

  allocation: Allocation;
  constructor(public activatedRoute: ActivatedRoute,
    public allocationSrv: AllocationService, public location: Location,
    public router: Router, public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.allocation = this.activatedRoute.snapshot.data['allocation'];
  }

  removeAllocation() {
    this.allocationSrv.remove(this.allocation)
      .subscribe(data => this.router.navigate([this.allocationSrv.getRoutePrefix()]),
        error =>  this.allocationSrv.httpSrv.handleError(error));
  }
  
  refresh(){
    this.allocationSrv.findOneById(this.allocation.id)
    .subscribe((data:any)=>this.allocation=data,
      error=>this.allocationSrv.httpSrv.handleError(error));
  }

}

