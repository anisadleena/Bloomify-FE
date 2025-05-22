import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm',
  templateUrl: 'confirm.component.html',
  standalone: true,
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
     @Inject(MAT_DIALOG_DATA) public data: { 
      title?: string; 
      message?: string; 
      confirmButtonText?: string 
    }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
