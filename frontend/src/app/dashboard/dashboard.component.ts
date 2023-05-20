import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../dialogs/create/create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalRecords = 0;
  fetch: Boolean = false;
  pageIndex = 0;
  size = 10;  
  constructor( public dialog: MatDialog) { }

  handleRecordsEvent(count: any) {
    this.totalRecords = count
    this.fetch = false;
  }

  handleRecordChange(e: any) {
    this.pageIndex = e.pageIndex;
    this.size = e.size;
    this.fetch = true
  }

  openUploadDialog(e:any){
    this.dialog.open(CreateComponent,{
      width:'400px'
    }).afterClosed().subscribe((res:any)=>{
      if(res){
        window.location.reload();
      }
    });
  }
  stop(e: any) {
    e.event.stopPropagation()
  }
}
