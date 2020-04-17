import { Route } from "@angular/router";
import { AllocationListComponent } from './allocation-list/allocation-list.component';
import { AllocationNewComponent } from './allocation-new/allocation-new.component';
import { AllocationEditComponent } from './allocation-edit/allocation-edit.component';
import { AllocationCloneComponent } from './allocation-clone/allocation-clone.component';
import { AllocationShowComponent } from './allocation-show/allocation-show.component';
import { MultipleAllocationResolver } from './multiple-allocation.resolver';
import { OneAllocationResolver } from './one-allocation.resolver';

const allocationRoutes: Route = {
    path: 'allocation', children: [
        { path: '', component: AllocationListComponent, resolve: { allocations: MultipleAllocationResolver } },
        { path: 'new', component: AllocationNewComponent },
        { path: ':id/edit', component: AllocationEditComponent, resolve: { allocation: OneAllocationResolver } },
        { path: ':id/clone', component: AllocationCloneComponent, resolve: { allocation: OneAllocationResolver } },
        { path: ':id', component: AllocationShowComponent, resolve: { allocation: OneAllocationResolver } }
    ]

};

export { allocationRoutes }
