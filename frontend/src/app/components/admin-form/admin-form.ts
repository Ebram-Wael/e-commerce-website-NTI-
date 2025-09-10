import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-form',
  standalone: true,  
  imports: [
    ReactiveFormsModule, 
    CommonModule                 
  ],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.css']
})
export class AdminFormComponent {
  productForm: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  loading = false;

  cloudName = 'YOUR_CLOUD_NAME';
  uploadPreset = 'YOUR_UPLOAD_PRESET';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      photoUrl: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) return;
    this.loading = true;

    try {
      let photoUrl = '';

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', this.uploadPreset);

        const res: any = await this.http
          .post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData)
          .toPromise();

        photoUrl = res.secure_url;
      }

      this.productForm.patchValue({ photoUrl });

      console.log(' Product Data:', this.productForm.value);
      alert('Product added successfully!');
      this.productForm.reset();
      this.previewUrl = null;
    } catch (error) {
      console.error(error);
      alert('Error uploading product');
    } finally {
      this.loading = false;
    }
  }
}
