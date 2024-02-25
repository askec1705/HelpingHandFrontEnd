
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProductDetail } from '../../models/productDetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductProcessComponent } from '../product-process/product-process.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [DialogService]
})
export class ProductComponent implements OnInit {

  productsLoaded = false;
  products: ProductDetail[] = [];

  categories: Category[] = [];
  categoriesLoaded = false;


  ref: DynamicDialogRef


  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: UntypedFormBuilder,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories()
    this.getDetails()
  }

  getDetails() {
    this.productService.getDetails().subscribe(result => {
      if (result.success) {
        this.products = result.data
        this.productsLoaded = true;
      }
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
      this.categoriesLoaded = true;
    })
  }

  process(product:ProductDetail){
    this.ref = this.dialogService.open(ProductProcessComponent, {
      header: 'Take Product',
      width: '70%',
      contentStyle: { 'overflow': 'auto' },
      data: product
    });
  }



}
