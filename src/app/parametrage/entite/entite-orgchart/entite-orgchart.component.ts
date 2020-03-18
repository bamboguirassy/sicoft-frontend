import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Entite } from './../entite';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-entite-orgchart',
  templateUrl: './entite-orgchart.component.html',
  styleUrls: ['./entite-orgchart.component.scss']
})
export class EntiteOrgchartComponent implements OnInit, OnDestroy {

  @Input() entites: Entite[];
  @Input() deletedItemNotifier: Subject<Boolean>;
  orgTree: TreeNode[];

  constructor() { }

  ngOnInit() {
    this.buildOrgChart();
    this.deletedItemNotifier.subscribe((deletedEntite: any) => {
      this.entites = this.entites.filter(entite => entite.code !== deletedEntite.code);
      this.orgTree = [];
      this.buildOrgChart();
    });
  }

  ngOnDestroy() {
    this.deletedItemNotifier.unsubscribe();
  }

  getChildrenOf(entite: Entite): {
    label: string,
    type: string,
    styleClass: string,
    expanded: boolean
    data: { name: string },
    children: any[]
  }[] {
    const childs: any[] = [];
    if (this.hasAtLeastOneChildren(entite)) {
      this.entites.forEach(currentEntite => {
        if (currentEntite.entiteParent && currentEntite.entiteParent.id === entite.id) {
          childs.push({
            label: currentEntite.code,
            type: 'person',
            styleClass: 'ui-person',
            expanded: this.hasAtLeastOneChildren(currentEntite) ? true : false,
            data: { name: currentEntite.nom },
            children: this.getChildrenOf(currentEntite)
          });
        }
      });

      return childs;

    } else {
      return [];
    }

  }

  hasAtLeastOneChildren(entite: Entite) {
    let founded = false;
    this.entites.forEach(currentEntite => {
      if (currentEntite.entiteParent && currentEntite.entiteParent.code === entite.code) {
        founded = true;
      }
    });
    return founded;
  }

  buildOrgChart() {
    const orgTree: any[] = [];
    this.entites.forEach(entite => {
      orgTree.push({
        label: entite.code,
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        data: { name: entite.nom },
        children: this.getChildrenOf(entite)
      });
    });
    this.orgTree = orgTree;
  }
}
