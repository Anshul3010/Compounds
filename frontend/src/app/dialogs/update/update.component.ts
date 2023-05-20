import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/http/api.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: new FormControl(this.data && this.data.name ? this.data.name : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.data && this.data.description ? this.data.description : '',
        [Validators.required]
      ),
    });
  }
  
  updateCompound(){
    this.apiService.updateCompound(this.data.id, this.updateForm.value).subscribe((res:any)=>{
      this.dialogRef.close(true);
    },
    (err: any) => {
      this.snackbar.open('Failed to Update')
    })
  }
}
