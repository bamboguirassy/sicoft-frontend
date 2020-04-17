import { Component, OnInit } from '@angular/core';
import { Allocation } from '../allocation';
import { AllocationService } from '../allocation.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-allocation-new',
  templateUrl: './allocation-new.component.html',
  styleUrls: ['./allocation-new.component.scss']
})
export class AllocationNewComponent implements OnInit {
  allocation: Allocation;
  constructor(public allocationSrv: AllocationService,
    public notificationSrv: NotificationService,
    public router: Router, public location: Location) {
    this.allocation = new Allocation();
  }

  ngOnInit() {
  }

  saveAllocation() {
    this.allocationSrv.create(this.allocation)
      .subscribe((data: any) => {
        this.notificationSrv.showInfo('Allocation créé avec succès');
        this.allocation = new Allocation();
      }, error => this.allocationSrv.httpSrv.handleError(error));
  }

  saveAllocationAndExit() {
    this.allocationSrv.create(this.allocation)
      .subscribe((data: any) => {
        this.router.navigate([this.allocationSrv.getRoutePrefix(), data.id]);
      }, error => this.allocationSrv.httpSrv.handleError(error));
  }

}

