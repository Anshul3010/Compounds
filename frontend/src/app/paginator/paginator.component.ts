import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  size = 10;
  
  pageEvent!: PageEvent;

  @Output('fetchRecord') fetchRecord = new EventEmitter<any>();
  @Input('totalRecords') totalRecords: any

  constructor() {

  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalRecords = e.length;
    this.size = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchRecord.emit({totalRecords: this.totalRecords, size: this.size, pageIndex: this.pageIndex});
  }
}
