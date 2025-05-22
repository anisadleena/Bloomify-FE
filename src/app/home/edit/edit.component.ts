import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HomeService } from 'src/app/services/home.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'edit',
  templateUrl: 'edit.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    CommonModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [],
})
export class ModalEditComponent {
  editForm!: FormGroup;
  private snackBar = inject(MatSnackBar);
  fields = [
    {
      label: 'Name',
      placeholder: 'name',
      formControlName: 'name',
      required: true,
    },
    {
      label: 'Type',
      placeholder: 'type',
      formControlName: 'type',
      required: true,
    },
    {
      label: 'Description',
      placeholder: 'description',
      formControlName: 'description',
      required: true,
    },
    {
      label: 'Scientific Name',
      placeholder: 'scientificName',
      formControlName: 'scientificName',
    },
    {
      label: 'Color',
      placeholder: 'color',
      formControlName: 'color',
      type: 'select',
      options: ['Red', 'Pink', 'Yellow', 'White', 'Purple', 'Orange', 'Blue', 'Green', 'Black', 'Other'],
    },
    {
      label: 'Bloom Season',
      placeholder: 'bloomSeason',
      formControlName: 'bloomSeason',
      type: 'select',
      options: [ 'Year-round', 'Spring', 'Summer', 'Autumn', 'Winter','Rainy'],
    },
    {
      label: 'Native Region',
      placeholder: 'nativeRegion',
      formControlName: 'nativeRegion',
      type: 'select',
      options: [
        'Peninsular Malaysia',
        'Sabah',
        'Sarawak',
        'Southeast Asia',
        'Malaysia (General)',
      ],
    },
    {
      label: 'Sunlight Requirement',
      placeholder: 'sunlightRequirement',
      formControlName: 'sunlightRequirement',
      type: 'select',
      options: [
        'Full Sun (6+ hours)',
        'Partial Sun (3–6 hours)',
        'Partial Shade (2–4 hours)',
        'Full Shade (little to no direct sunlight)',
      ],
    },
    {
      label: 'Water Requirement',
      placeholder: 'waterRequirement',
      formControlName: 'waterRequirement',
      type: 'select',
      options: [
        'Low (once a week)',
        'Moderate (2–3 times a week)',
        'High (daily)',
        'Very High (twice a day)',
      ],
    },
    {
      label: 'Price',
      placeholder: 'price',
      formControlName: 'price',
      type: 'number',
    },
    {
      label: 'Stock Quantity',
      placeholder: 'stockQuantity',
      formControlName: 'stockQuantity',
      type: 'number',
    },
  ];

  constructor(
     @Inject(MAT_DIALOG_DATA) public data: { id: any },
    public _dialogRef: MatDialogRef<ModalEditComponent>,
    public _homeService: HomeService,
    private fb: FormBuilder
  ) {}

 ngOnInit() {
  const formGroupConfig: { [key: string]: any } = {};

  this.fields.forEach((field) => {
    const validators = field.required ? [Validators.required] : [];
    formGroupConfig[field.formControlName] = ['', validators];
  });

  this.editForm = this.fb.group(formGroupConfig);

  // Fetch flower by ID and patch the form
  if (this.data?.id) {
    this._homeService.getFlowerById(this.data.id).subscribe((flower) => {
      if (flower) {
        this.editForm.patchValue(flower);
      }
    });
  }
}


  save(): void {
    const body = {
      name: this.editForm.get('name')?.value,
      imageUrl: '',
      type: this.editForm.get('type')?.value,
      description: this.editForm.get('description')?.value,
      scientificName: this.editForm.get('scientificName')?.value,
      color: this.editForm.get('color')?.value,
      bloomSeason: this.editForm.get('bloomSeason')?.value,
      nativeRegion: this.editForm.get('nativeRegion')?.value,
      sunlightRequirement: this.editForm.get('sunlightRequirement')?.value,
      waterRequirement: this.editForm.get('waterRequirement')?.value,
      price: this.editForm.get('price')?.value,
      stockQuantity: this.editForm.get('stockQuantity')?.value,
      addedDate: new Date().toISOString(),
    };

    console.log('COMPONENT: body = ', body);
    console.log('COMPONENT: id = ', this.data.id);

    this._homeService.editFlower(body, this.data.id).subscribe({
      next: () => {
        this.snackBar.open(`${body.name} successfully edited!`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this._dialogRef.close();
      },
      error: (err) => {
        console.error('Error:', err);
        this.snackBar.open(`Failed to edit ${body.name}. Please try again.`, 'Close', {
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
