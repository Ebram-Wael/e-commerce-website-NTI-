import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';
import { IProducts } from '../../models/product.model';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  products: IProducts[] = [
    { id: 1, name: 'سماعات رياضية لاسلكية', price: 420, rating: 4, imageUrl: 'assets/headphone1.jpg' },
    { id: 2, name: 'سماعة راس لاسلكية سودو', price: 420, rating: 5, imageUrl: 'assets/headphone2.jpg' },
    { id: 3, name: 'سماعة سودو الرياضية', price: 399, rating: 4, imageUrl: 'assets/headphone3.jpg' },
    { id: 4, name: 'سماعة رأس ستريو ببلوتوث', price: 399, rating: 4, imageUrl: 'assets/headphone4.jpg' },
    { id: 5, name: 'سماعات رياضية لاسلكية', price: 420, rating: 4, imageUrl: 'assets/headphone5.jpg' },
    { id: 6, name: 'سماعة راس لاسلكية سودو', price: 420, rating: 5, imageUrl: 'assets/headphone6.jpg' },
    { id: 7, name: 'سماعة سودو الرياضية', price: 399, rating: 4, imageUrl: 'assets/headphone7.jpg' },
    { id: 8, name: 'سماعة رأس ستريو ببلوتوث', price: 399, rating: 4, imageUrl: 'assets/headphone8.jpg' },
     { id: 9, name: 'سماعة راس لاسلكية سودو', price: 420, rating: 5, imageUrl: 'assets/headphone9.jpg' },
    { id: 10, name: 'سماعة سودو الرياضية', price: 399, rating: 4, imageUrl: 'assets/headphone10.jpg' },
    { id: 11, name: 'سماعة رأس ستريو ببلوتوث', price: 399, rating: 4, imageUrl: 'assets/headphone1.jpg' }
  ];
}
