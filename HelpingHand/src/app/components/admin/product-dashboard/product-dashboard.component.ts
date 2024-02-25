import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ProductService } from '../../../services/product.service';
import { ProductDetail } from '../../../models/productDetail';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ProductDashboardComponent implements OnInit {


  products:ProductDetail[]
  productsLoaded=false;

  ref: DynamicDialogRef;


  constructor(
    private productService:ProductService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getDetails().subscribe(
      (result)=>{
        if(result.success){
          this.products = result.data
          this.productsLoaded=true;
        }
      }
    )
  }

  addProduct(){
    this.ref = this.dialogService.open(ProductAddComponent, {
      header: 'Add Product',
      width: '70%',
      contentStyle: { 'min-height': '300px', 'overflow': 'auto' }
    });

    this.ref.onClose.subscribe(() => {
      this.getProducts();
    });


  }

  editProduct(product: ProductDetail){
    this.ref = this.dialogService.open(ProductUpdateComponent, {
      header: 'Update Product',
      width: '70%',
      contentStyle: { 'min-height': '300px', 'overflow': 'auto' },
      data: product,

    });

    this.ref.onClose.subscribe(() => {
      this.getProducts();
    });
  }

  deleteProduct(product: ProductDetail){
    let productName = product.productName;
    this.confirmationService.confirm({
      key: product.id.toString(),
      message: 'Are you sure that you want to delete ' + productName + '?',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(
          (result)=>{
            if(result.success){
              this.toastrService.success(result.message,"Delete successful", );
              this.getProducts();
            }
          }
        )
      }
    });
  }



}
