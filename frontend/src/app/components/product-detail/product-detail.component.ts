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
  productId!: number;
  product: IProducts | null = null;
  productIDs!: number[];
  constructor(
    public activatedRoute: ActivatedRoute,
    public productService: ProductsService,
    public location: Location,
    public router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.productService.getProductById(this.productId.toString())
        .subscribe({
          next: (data) => { this.product = data; },
          error: (err) => { console.error('Error fetching product:', err); }
        });
    });
  }

  goBack() {
    this.location.back();
  }

  prev() {
    this.productService.getProductsIds().subscribe({
      next: (data) => {
        this.productIDs = data;
        let index = this.productIDs.indexOf(this.productId);
        if (index > 0) {
          this.router.navigateByUrl(`/productDetails/${this.productIDs[index - 1]}`);
        }
      },
      error: (err) => console.error('Error fetching product IDs:', err)
    });
  }

  next() {
    this.productService.getProductsIds().subscribe({
      next: (data) => {
        this.productIDs = data;
        let index = this.productIDs.indexOf(this.productId);
        if (index < this.productIDs.length - 1) {
          this.router.navigateByUrl(`/productDetails/${this.productIDs[index + 1]}`);
        }
      },
      error: (err) => console.error('Error fetching product IDs:', err)
    });
  }

}
