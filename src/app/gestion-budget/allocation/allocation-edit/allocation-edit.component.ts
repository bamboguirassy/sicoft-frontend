
import { Component, OnInit } from '@angular/core';
import { AllocationService } from '../allocation.service';
import { Allocation } from '../allocation';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-allocation-edit',
  templateUrl: './allocation-edit.component.html',
  styleUrls: ['./allocation-edit.component.scss']
})
export class AllocationEditComponent implements OnInit {

  allocation: Allocation;
  constructor(public allocationSrv: AllocationService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public location: Location,
    public notificationSrv: NotificationService) {
  }

  ngOnInit() {
    this.allocation = this.activatedRoute.snapshot.data['allocation'];
  }

  updateAllocation() {
    this.allocationSrv.update(this.allocation)
      .subscribe(data => this.location.back(),
        error => this.allocationSrv.httpSrv.handleError(error));
  }

}
