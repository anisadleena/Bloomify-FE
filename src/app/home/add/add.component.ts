import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { HomeService } from "src/app/services/home.service";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'add',
  templateUrl: 'add.component.html',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule,CommonModule, MatButtonModule, CommonModule,MatNativeDateModule, MatSelectModule, ReactiveFormsModule, MatSnackBarModule ],
  providers: [],

})
export class ModalAddComponent {
  addForm!: FormGroup;
  private snackBar = inject(MatSnackBar)

  constructor(public _dialogRef: MatDialogRef<ModalAddComponent>, public _homeService: HomeService, private fb: FormBuilder) {
  }
    
  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      scientificName: [''],
      color: [''],
      bloomSeason: [''],
      nativeRegion: [''],
      sunlightRequirement: [''],
      waterRequirement: [''],
      price: [''],
      stockQuantity: [''],
    });
  }  
    
  save(): void {
    const body = {
      name: this.addForm.get('name')?.value,
      imageUrl: '',
      type: this.addForm.get('type')?.value,
      description: this.addForm.get('description')?.value,
      scientificName: this.addForm.get('scientificName')?.value,
      color: this.addForm.get('color')?.value,
      bloomSeason: this.addForm.get('bloomSeason')?.value,
      nativeRegion: this.addForm.get('nativeRegion')?.value,
      sunlightRequirement: this.addForm.get('sunlightRequirement')?.value,
      waterRequirement: this.addForm.get('waterRequirement')?.value,
      price: this.addForm.get('price')?.value,
      stockQuantity: this.addForm.get('stockQuantity')?.value,
      addedDate: new Date().toISOString(),
    }

    this._homeService.addFlower(body).subscribe({
      next: () => {
        this.snackBar.open('New flower successfully added!', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
  
        this._dialogRef.close();
      },
      error: (err) => {
        console.error('Error:', err);
        this.snackBar.open('Failed to create item. Please try again.', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
    
  }

  close(): void {
    this._dialogRef.close();
  }
}
