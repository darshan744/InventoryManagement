import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-productviewcard',
  imports: [CardModule, ButtonModule],
  templateUrl: './productviewcard.component.html',
  styleUrl: './productviewcard.component.css',
})
export class ProductviewcardComponent { }
