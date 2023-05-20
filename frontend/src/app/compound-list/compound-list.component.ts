import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { UpdateComponent } from '../dialogs/update/update.component';
import { SnackbarService } from '../service/snackbar/snackbar.service';
import { ApiService } from '../service/http/api.service';

@Component({
  selector: 'app-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.css']
})
export class CompoundListComponent implements OnInit, OnChanges {
  compounds:any = [];
  totalRecords = 0

  @Input('toFetchRecord') toFetch: Boolean = true;
  @Input('size') size: number = 10;
  @Input('pageIndex') pageIndex: number = 0;


  @Output('recordCount') recordCount = new EventEmitter<Number>()
  constructor(private apiService:ApiService, public dialog: MatDialog, private snackBar: SnackbarService) { }

  ngOnInit(): void {
    this.fetchCompounds()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['toFetch']) {
      this.fetchCompounds()
      this.toFetch = false;
    }
  }

  handleRecordFetchEvent(e: any) {
    this.pageIndex = e.pageIndex;
    this.size = e.size;
    this.fetchCompounds()
  }

  fetchCompounds(){
    this.apiService.fetchCompounds(this.pageIndex + 1, this.size).subscribe((res:any) => {
      this.compounds = res.data.rows;
      this.totalRecords = res.data.count;
      this.recordCount.emit(this.totalRecords)
    })
  }

  openUpdateDialog(e:any, compound:any) {
    this.dialog.open(UpdateComponent, {
      width: '750px',
      data: compound
    }).afterClosed().subscribe((res:any)=>{
      if(res){
        this.snackBar.open("Updated Succesfully!");
        this.fetchCompounds();
      }
    });
    e.stopPropagation();
  }

  openDeleteDialog(e:any, compound:any) {
    e.stopPropagation()
    this.dialog.open(DeleteComponent, {
      data: compound,
      width: 'auto',
      minWidth: '300px'
    }).afterClosed().subscribe((res:any)=>{
      if(res){
        this.snackBar.open("Deleted Succesfully!");
        this.fetchCompounds();
      }
    });
  }
}
