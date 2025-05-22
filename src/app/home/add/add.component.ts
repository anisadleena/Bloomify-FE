import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HomeService } from 'src/app/services/home.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'add',
  templateUrl: 'add.component.html',
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
export class ModalAddComponent {
  addForm!: FormGroup;
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
    public _dialogRef: MatDialogRef<ModalAddComponent>,
    public _homeService: HomeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const formGroupConfig: { [key: string]: any } = {};

    this.fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      formGroupConfig[field.formControlName] = ['', validators];
    });

    this.addForm = this.fb.group(formGroupConfig);
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
    };

    console.log('COMPONENT: body = ', body);

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
