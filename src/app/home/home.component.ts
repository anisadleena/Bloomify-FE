import { Component, OnInit } from "@angular/core";
import { Flower } from "./home.type";
import { HomeService } from "../services/home.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  standalone: true,
})
export class HomeComponent implements OnInit {
 
    flowers: Flower[] = [];
  constructor(
    public _homeService: HomeService,
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
}
