import { Component, Input } from '@angular/core';
import { IProducts } from '../../models/product.model';


@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input() product!:IProducts;
}
