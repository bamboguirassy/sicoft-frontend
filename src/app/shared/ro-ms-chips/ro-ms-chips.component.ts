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
  customClass = 'selected-chips';

  @Output() onChange: EventEmitter<any[]> = new EventEmitter();

  alteredItem: any[] = [];
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
      throw new Error('No Item founded, You passed an empty array.');
    }
  }

}
