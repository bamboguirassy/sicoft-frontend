import { Component, OnInit } from '@angular/core';
import { Allocation } from '../allocation';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from '../allocation.service';
import { allocationColumns, allowedAllocationFieldsForFilter } from '../allocation.columns';
import { ExportService } from 'app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'app/shared/services/auth.service';
import { NotificationService } from 'app/shared/services/notification.service';


@Component({
  selector: 'app-allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.scss']
})
export class AllocationListComponent implements OnInit {

  allocations: Allocation[] = [];
  selectedAllocations: Allocation[];
  selectedAllocation: Allocation;
  clonedAllocations: Allocation[];

  cMenuItems: MenuItem[]=[];

  tableColumns = allocationColumns;
  //allowed fields for filter
  globalFilterFields = allowedAllocationFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public allocationSrv: AllocationService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService) { }

  ngOnInit() {
    if(this.authSrv.checkShowAccess('Allocation')){
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewAllocation(this.selectedAllocation) });
    }
    if(this.authSrv.checkEditAccess('Allocation')){
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editAllocation(this.selectedAllocation) })
    }
    if(this.authSrv.checkCloneAccess('Allocation')){
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneAllocation(this.selectedAllocation) })
    }
    if(this.authSrv.checkDeleteAccess('Allocation')){
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteAllocation(this.selectedAllocation) })
    }

    this.allocations = this.activatedRoute.snapshot.data['allocations'];
  }

  viewAllocation(allocation: Allocation) {
      this.router.navigate([this.allocationSrv.getRoutePrefix(), allocation.id]);

  }

  editAllocation(allocation: Allocation) {
      this.router.navigate([this.allocationSrv.getRoutePrefix(), allocation.id, 'edit']);
  }

  cloneAllocation(allocation: Allocation) {
      this.router.navigate([this.allocationSrv.getRoutePrefix(), allocation.id, 'clone']);
  }

  deleteAllocation(allocation: Allocation) {
      this.allocationSrv.remove(allocation)
        .subscribe(data => this.refreshList(), error => this.allocationSrv.httpSrv.handleError(error));
  }

  deleteSelectedAllocations(allocation: Allocation) {
    if(this.selectedAllocations){
      this.allocationSrv.removeSelection(this.selectedAllocations)
      .subscribe(data => this.refreshList(), error => this.allocationSrv.httpSrv.handleError(error));
      } else {
      this.allocationSrv.httpSrv.notificationSrv.showError("Selectionner au moins un élement à supprimer");
    }
  }

  refreshList() {
    this.allocationSrv.findAll()
      .subscribe((data: any) => this.allocations = data, error => this.allocationSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.allocations, 'allocations');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.allocations);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}