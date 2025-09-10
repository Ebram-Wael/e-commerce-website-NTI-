import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { IProducts } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productId!: string;
  product: IProducts | null = null;
  constructor(
    public activatedRoute: ActivatedRoute,
    public productService: ProductsService,
    public location: Location,
    public router: Router
  ) { }

  ngOnInit() {
  this.activatedRoute.paramMap.subscribe((params) => {
    const id = params.get('_id');
    if (id) {
      this.productId = id;
      this.productService.getProductById(this.productId)
        .subscribe({
          next: (data) => { this.product = data; },
          error: (err) => { console.error('Error fetching product:', err); }
        });
    } else {
      console.error('Product ID not found in route');
    }
  });
}


  goBack() {
    this.location.back();
  }

  
  addToCart() {
    if (!this.product) return;

    this.productService.addProductToCart(this.product._id.toString())
      .subscribe({
        next: (res) => {
          alert(res.message);
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          alert('Failed to add product to cart');
        }
      });
  }
}
