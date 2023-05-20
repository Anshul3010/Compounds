import { Component } from '@angular/core';
import { CreateComponent } from '../dialogs/create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  openUploadDialog(e:any){
    this.dialog.open(CreateComponent,{
      width:'400px'
    }).afterClosed().subscribe((res:any)=>{
      if(res){
        window.location.reload();
        this.snackBar.open('File uploaded successfully!');
      }
    });
    // e.stopPropagation();
  }

}
