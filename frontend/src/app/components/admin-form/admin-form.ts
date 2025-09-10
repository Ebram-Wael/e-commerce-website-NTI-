import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.css']
})
export class AdminFormComponent {
  productForm: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  base64Image: string | null = null; 
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient , private productsService: ProductsService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.base64Image = reader.result as string; // نخزن Base64
      };
      reader.readAsDataURL(this.selectedFile); // بيحول ل Base64
    }
  }

  async onSubmit() {
  if (this.productForm.invalid) return;

  this.loading = true;

  try {
    const productData = {
      title: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      quantityInStore: this.productForm.get('quantity')?.value,
      description: this.productForm.get('description')?.value,
      image: this.base64Image
    };

    const res = await this.productsService.createProduct(productData).toPromise();

    console.log('Product created:', res);
    alert('Product added successfully!');
    this.productForm.reset();
    this.previewUrl = null;
    this.base64Image = null;
  } catch (error) {
    console.error(error);
    alert('Error uploading product');
  } finally {
    this.loading = false;
  }
}

}
