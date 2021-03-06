import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgPipesModule, ContainsPipe, MapPipe } from 'ng-pipes';

// COMPONENTS
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';

// DIRECTIVES
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { ClonablePipe } from './pipes/clonable.pipe';
import { EditablePipe } from './pipes/editable.pipe';
import { CreablePipe } from './pipes/creable.pipe';
import { ListablePipe } from './pipes/listable.pipe';
import { ShowablePipe } from './pipes/showable.pipe';
import { DeletablePipe } from './pipes/deletable.pipe';
import { RoMsChipsComponent } from './ro-ms-chips/ro-ms-chips.component';
import { ProcessFlowDiagramComponent } from './process-flow-diagram/process-flow-diagram.component';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        RoMsChipsComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        NgbModule,
        TranslateModule,
        ClonablePipe,
        EditablePipe,
        CreablePipe,
        ListablePipe,
        ShowablePipe,
        DeletablePipe,
        ProcessFlowDiagramComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        PerfectScrollbarModule,
        NgPipesModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        ClonablePipe,
        EditablePipe,
        CreablePipe,
        ListablePipe,
        ShowablePipe,
        DeletablePipe,
        RoMsChipsComponent,
        ProcessFlowDiagramComponent
    ],
    providers: [
        ContainsPipe,
        MapPipe
    ]
})
export class SharedModule { }
