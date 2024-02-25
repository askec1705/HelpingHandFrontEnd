import { ImageService } from '../../../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  categories: Category[];
  categoriesLoaded = false;

  images: any[] = [];


  productAddForm: UntypedFormGroup;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createProductAddForm()
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      if (result.success) {
        this.categories = result.data
        this.categoriesLoaded = true
      }
    });
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      categoryId: [0, [Validators.required]],
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  setImages(event: any) {
    this.images = [];
    for (let file of event.files) {
      this.images.push(file);
    }
    let plural = this.images.length > 1 ? 's' : '';
    this.toastrService.success(`${this.images.length} file${plural} selected`);
  }

  addProduct() {
    this.productService.addProduct(this.productAddForm.value).subscribe(result => {
      if (result.success) {

        this.toastrService.success(result.message)
        if (this.images) {
          this.imageService.uploadImages(this.images, result.data).subscribe(imageResult => {
            if (imageResult.success) {
              this.toastrService.success(imageResult.message);
              this.productAddForm.reset();
              this.images = [];
            }
            else {
              this.toastrService.error(imageResult.message, "Couldn't upload images")
            }
          })
        }
      }
      else {
        this.toastrService.error(result.message)
      }
    });
  }


}
