import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-process-flow-diagram',
  templateUrl: './process-flow-diagram.component.html',
  styleUrls: ['./process-flow-diagram.component.css']
})
export class ProcessFlowDiagramComponent implements OnInit {
  @Input() items: any[];
  @Input() bindLabel: string;
  @Input() subItems: string;
  hasItems = true;

  constructor() { }

  ngOnInit() {
    this.initItems();
  }

  initItems() {
    if (this.items === null) {
      this.items = [];
    }
    let bindLabelValid = false;
    if (this.items.length && Object.getOwnPropertyNames(this.items[0]).filter(item => item === this.bindLabel && item === this.subItems)) {
      bindLabelValid = true;
    }
    if (this.items.length && bindLabelValid) {
      this.items.forEach(item => {
        item.bindLabel = item[this.bindLabel],
        item.subItems = item[this.subItems]
        // item.color = this.getColor();
      })
    } else {
      this.hasItems = false;
      throw new Error('No item found, you passed an empty array.');
    }
  }
  // getColor() {
  //     // tslint:disable-next-line:prefer-const
  //     let color = Math.floor(0x1000000 * Math.random()).toString(16);
  //     return '#' + ('000000' + color).slice(6);
  //   }



}
