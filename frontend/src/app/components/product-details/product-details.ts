import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProducts } from '../../models/productdetails';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProducts;

  // Mock product data (later you can fetch from service or API)
  private allProducts: IProducts[] = [
    {
      id: 1,
      name: 'سماعة رأس لاسلكية بتقنية البلوتوث',
      price: 420,
      rating: 4.5,
      imageUrl: 'assets/headphone1.jpg',
      description: 'سماعات رياضية لاسلكية بتصميم مريح وصوت ستيريو عالي الجودة.'
    },
    {
      id: 2,
      name: 'سماعة رأس ستيريو سلكية',
      price: 300,
      rating: 4.0,
      imageUrl: 'assets/headphone2.jpg',
      description: 'سماعات سلكية مدمجة للتمارين والمكالمات اليومية.'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.allProducts.find(p => p.id === id)!;
  }
}
