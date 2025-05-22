import { Component, OnInit } from '@angular/core';
import { Flower } from './home.type';
import { HomeService } from '../services/home.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalAddComponent } from './add/add.component';
import { ConfirmDeleteComponent } from '../confirmation/delete.component';
import { ModalEditComponent } from './edit/edit.component';

interface CareTips {
  waterRequirement:
    | 'Full Sun'
    | 'Medium'
    | 'Low to Medium'
    | 'Summer to Early Fall'
    | 'Spring to Early Summer'
    | 'Year-round';
  bloomSeason:
    | 'Full Sun'
    | 'Medium'
    | 'Low to Medium'
    | 'Summer to Early Fall'
    | 'Spring to Early Summer'
    | 'Year-round';
}

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
})
export class HomeComponent implements OnInit {
  flowers: Flower[] = [];
  constructor(public _homeService: HomeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllListFlower();
  }

  getAllListFlower(): void {
    this._homeService.getAllListFlowers().subscribe(
      (listFlower: Flower[]) => {
        this.flowers = listFlower;
      },
      (error: any) => {
        console.error('Error fetching flower list:', error);
      }
    );
  }

  createFlower(): void {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '100%',
      disableClose: false,
      panelClass: 'info',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllListFlower();
    });
  }

  EditFlower(id: any): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '100%',
      disableClose: false,
      panelClass: 'info',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllListFlower();
    });
  }

  deleteFlower(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
    });

    console.log('masukk delete :', id);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._homeService.deleteFlower(id).subscribe(() => {
          this.getAllListFlower();
        });
      }
    });
  }

  getAICareTip(flower: {
    waterRequirement: string;
    bloomSeason: string;
  }): string {
    const waterTips: Record<string, string> = {
      'Low (once a week)': 'Water sparingly, once a week is usually enough.',
      'Moderate (2–3 times a week)':
        'Keep soil moist by watering 2 to 3 times per week.',
      'High (daily)': 'Needs daily watering, especially in hot weather.',
      'Very High (twice a day)':
        'Water twice daily for best growth, avoid waterlogging.',
      '☀️ Full Sun (6+ hours)':
        'Make sure it gets at least 6 hours of sunlight daily.',
      '🌤️ Partial Sun (3–6 hours)':
        'Needs moderate sunlight; avoid harsh afternoon sun.',
      '🌥️ Partial Shade (2–4 hours)':
        'Thrives in filtered light or morning sun.',
      '🌑 Full Shade (indirect light)':
        'Prefers shady spots, avoid direct sunlight.',
    };

    // Define mappings for bloom seasons
    const bloomTips: Record<string, string> = {
      'Summer to Early Fall':
        'Great time to see its full bloom – keep it fed with compost!',
      'Spring to Early Summer': 'Ideal time for pruning and fertilizing.',
      'Year-round':
        'Perfect for consistent environments – just don’t let it dry out!',
      Spring: 'Spring is the best time for growth and blooming.',
      Summer: 'Provide extra water during the hot summer months.',
      // Add other bloom season variants if needed
    };

    // Normalize input (optional)
    const waterReq = flower.waterRequirement.trim();
    const bloomSeason = flower.bloomSeason.trim();

    return (
      waterTips[waterReq] ||
      bloomTips[bloomSeason] ||
      "Handle with love and it'll thrive beautifully."
    );
  }

  onImageSelected(event: any, flowerId: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this._homeService.uploadImage(flowerId, file).subscribe({
        next: () => {
          console.log('Image uploaded successfully');
          this.getAllListFlower(); // Refresh list to show new image
        },
        error: (err) => {
          console.error('Error uploading image:', err);
        },
      });
    }
  }
}
