
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { backendUrl } from '../../services/serviceConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetail } from '../../models/productDetail';
import { Component, OnInit } from '@angular/core';
import { ProductProcessComponent } from '../product-process/product-process.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [DialogService]
})
export class ProductDetailComponent implements OnInit {


  url = backendUrl
  currentProduct: ProductDetail;
  productLoaded = false;

  attributes: any[] = []

  ref: DynamicDialogRef;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
  ) { }


  rentDate: string = "";
  returnDate: string = "";


  minDate: Date;

  ngOnInit(): void {
    this.minDate = new Date()
    this.activatedRoute.params.subscribe(params => {
      if (params["productId"]) {
        this.getCurrentProduct(params["productId"])
      }
    })
  }


  getCurrentProduct(productId: number) {
    this.productService.getProductDetail(productId).subscribe(result => {
      if (result.success) {
        this.currentProduct = result.data;
        this.getAttributes()
        this.productLoaded = true;
      }
    })
  }

  getAttributes(){
    this.attributes.push({key: "Category", value: this.currentProduct.categoryName})
  }

  process(){
    this.ref = this.dialogService.open(ProductProcessComponent, {
      header: 'Take Product',
      width: '70%',
      contentStyle: { 'overflow': 'auto' },
      data: this.currentProduct
    });

  }

}
