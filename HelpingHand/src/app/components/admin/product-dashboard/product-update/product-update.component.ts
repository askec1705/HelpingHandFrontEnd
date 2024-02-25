import { ProductImage } from './../../../../models/productImage';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from './../../../../services/image.service';
import { ProductService } from './../../../../services/product.service';
import { CategoryService } from './../../../../services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from './../../../../models/category';
import { Product } from './../../../../models/product';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  categories: Category[];
  categoriesLoaded = false;

  images: ProductImage[] = [];
  imagesLoaded = false;

  product: Product;
  productLoaded = false;


  productUpdateForm: FormGroup;


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig,

  ) { }

  ngOnInit(): void {
    this.getProduct()
    this.getCategories()
  }

  getProduct() {
    this.productService.getProductById(this.config.data.id).subscribe(result => {
      if (result.success) {
        this.product = result.data
        this.createProductUpdateForm()
        this.getImages()
        this.productLoaded = true
      }
    });
  }

  getImages() {
    this.imageService.getImagesByProductId(this.product.id).subscribe(result => {
      if (result.success) {
        this.images = result.data
        this.imagesLoaded = true
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      if (result.success) {
        this.categories = result.data
        this.categoriesLoaded = true
      }
    });
  }

  createProductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      id: [this.product.id],
      categoryId: [this.product.categoryId, Validators.required],
      productName: [this.product.productName, Validators.required],
      description: [this.product.description, Validators.required],
      address: [this.product.address, Validators.required],

    });
  }

  updateProduct() {
    this.productService.updateProduct(this.productUpdateForm.value).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
      }
    });
  }

  deleteImage(image: ProductImage) {
    this.imageService.deleteImage(image.id).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getImages()
      }
    });
  }

  uploadImages(event: any) {
    let imagesToUpload = []
    for (const image of event.files) {
      imagesToUpload.push(image)
    }
    this.imageService.uploadImages(imagesToUpload, this.product.id).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getImages()
      }
    });
  }

}