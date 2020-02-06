import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ro-ms-chips',
  templateUrl: './ro-ms-chips.component.html',
  styleUrls: ['./ro-ms-chips.component.scss']
})
export class RoMsChipsComponent implements OnInit {
  @Input() items: any[];
  @Input() bindLabel: string;
  @Input() class: string;
  @Input() iconClass: string;
  @Output() onChange: EventEmitter<any[]> = new EventEmitter();

  hasItems = true;

  constructor() { }

  ngOnInit() {
    this.initItems();
  }

  handleClick(item: any) {
    item.checked = item.checked ? false : true;
    this.onChange.emit(this.items.filter(currentItem => currentItem.checked === true))
  }

  initItems() {
    if (this.items === null) {
      this.items = [];
    }
    let bindLabelValid = false;
    if (this.items.length && Object.getOwnPropertyNames(this.items[0]).filter(item => item === this.bindLabel)) {
      bindLabelValid = true;
    }
    if (this.items.length && bindLabelValid) {
      this.items.forEach(item => {
        item.checked = false;
        item.bindLabel = item[this.bindLabel]
      })
    } else {
      this.hasItems = false;
      throw new Error('No item found, you passed an empty array.');
    }
  }

}
