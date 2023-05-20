
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/http/api.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteComponent>,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}
  
  deleteCompound(){
    this.apiService.deleteCompound(this.data.id).subscribe((res:any)=>{
      this.dialogRef.close(true);
    },
    (err: any) => {
      this.snackbar.open('Failed to Delete')
    })
  }
}
