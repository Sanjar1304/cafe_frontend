import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestSellerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
