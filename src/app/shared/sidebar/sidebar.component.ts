import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, OnDestroy } from "@angular/core";

import { ROUTES } from './sidebar-routes.config';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { RouteInfo } from './sidebar.metadata';
import { AuthService } from '../services/auth.service';
import { MapPipe, ContainsPipe } from 'ng-pipes';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit,OnDestroy {

  @ViewChild('toggleIcon', { static: false }) toggleIcon: ElementRef;
  public menuItems: RouteInfo[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  subscription: Subscription;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    public authSrv: AuthService,
    private mapPipe: MapPipe,
    private containsPipe: ContainsPipe
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit() {
    this.config = this.configService.templateConf;
    this.menuItems = ROUTES;
    //handle menu views
    this.subscription=this.authSrv.getCurrentUser().subscribe(() => {
      this.menuItems.forEach(menuItem => {
        if (menuItem.submenu.length) {
          menuItem.submenu.forEach(submenu => {
            if (submenu.submenu.length) {
              submenu.submenu.forEach(subSubmenu => {
                if (subSubmenu.submenu.length) {
                  alert("L'hierarchie des routes est limitée à 3...");
                } else {
                  if (!subSubmenu.display) {
                    subSubmenu.display = this.authSrv.checkListAccess(subSubmenu.path.substr(1));
                  }
                }
              });
              //check if at least one submenu of menuItem is visible
              if (this.containsPipe.transform(this.mapPipe.transform(submenu.submenu, 'display'), true)) {
                submenu.display = true;
              }
            } else {
              if (!submenu.display) {
                submenu.display = this.authSrv.checkListAccess(submenu.path.substr(1));
              }
            }
          });
          //check if at least one submenu of menuItem is visible
          if (this.containsPipe.transform(this.mapPipe.transform(menuItem.submenu, 'display'), true)) {
            menuItem.display = true;
          }
        } else {
          if (!menuItem.display) {
            menuItem.display = this.authSrv.checkListAccess(menuItem.path.substr(1));
          }
        }
      });
    });




    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }


  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        }
        else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);


  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1)
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
  }
}
