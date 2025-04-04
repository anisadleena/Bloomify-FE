import { Component, OnInit } from "@angular/core";
import { Flower } from "./home.type";
import { HomeService } from "../services/home.service";
import { CommonModule } from "@angular/common";
import {MatIconModule} from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalAddComponent } from "./add/add.component";
import { ConfirmDeleteComponent } from "../confirmation/delete.component";


@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
})
export class HomeComponent implements OnInit {
 
    flowers: Flower[] = [];
  constructor(
    public _homeService: HomeService,
    public dialog: MatDialog,
  ) {
  }

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

  deleteFlower(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
    });

    console.log("masukk delete :", id);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._homeService.deleteFlower(id).subscribe(() => {
          this.getAllListFlower();
        });
      }
    });
  }
}
