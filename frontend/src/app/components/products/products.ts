import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../models/iproduct';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: IProducts[] = []
  loading = false;
  error: string | null = null;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
        console.log(this.products);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }
  openDetails(productId?: string) {
    if (!productId) return;
    this.router.navigate(['/products', productId]);
  }

}
