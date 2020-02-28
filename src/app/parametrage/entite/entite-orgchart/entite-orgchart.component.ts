import { TreeNode } from 'primeng/api';
import { Entite } from './../entite';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entite-orgchart',
  templateUrl: './entite-orgchart.component.html',
  styleUrls: ['./entite-orgchart.component.scss']
})
export class EntiteOrgchartComponent implements OnInit {

  @Input() entites: Entite[];
  data: TreeNode[];
  rootEntite: Entite;


  constructor() { }

  ngOnInit() {
    this.buildOrgChart();
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
      this.entites = this.entites.filter(currentEntite => currentEntite.entiteParent !== null);
      this.entites.forEach(currentEntite => {
        if (currentEntite.entiteParent.id === entite.id) {
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
      if (currentEntite.entiteParent !== null) {
        founded = true;
      }
    });
    return founded;
  }

  getRootEntite(): Entite {
    let rootEntity: Entite = null;
    this.entites.forEach(entite => {
      if (entite.entiteParent == null) {
        rootEntity = entite;
      }
    });
    return rootEntity;
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
    this.data = orgTree;
  }
}
