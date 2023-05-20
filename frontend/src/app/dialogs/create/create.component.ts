import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/http/api.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  selectedFiles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateComponent>,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  selectFile(event: any){
    this.selectedFiles = event.target.files;
  }

  uploadFile(){
    if(this.selectedFiles){
      this.apiService.uploadFile(this.selectedFiles.item(0)).subscribe((res:any)=>{
        this.snackbar.open('Compounds Uploaded To DB')
        this.dialogRef.close(true);
      },(err: any) => {
        console.log('mjsj',err)
        this.selectedFiles = null;
        this.snackbar.open('Failed To Uploaded')
      })
    }
  }
}
