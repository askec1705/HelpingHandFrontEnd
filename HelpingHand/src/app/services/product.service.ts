import { ResponseModel } from '../models/responseModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { ProductDetail } from '../models/productDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { apiUrl } from './serviceConstants';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private serviceUrl = apiUrl + "products/";

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>>{
    return this.httpClient.get<ListResponseModel<Product>>(this.serviceUrl + "getall")
  }

  getDetails():Observable<ListResponseModel<ProductDetail>>{
    return this.httpClient.get<ListResponseModel<ProductDetail>>(this.serviceUrl + "getdetails")
  }

  getProductDetail(productId:number):Observable<ObjectResponseModel<ProductDetail>>{
    return this.httpClient.get<ObjectResponseModel<ProductDetail>>(this.serviceUrl + "getproductdetail?productId=" + productId)
  }

  getProductById(productId:number):Observable<ObjectResponseModel<Product>>{
    return this.httpClient.get<ObjectResponseModel<Product>>(this.serviceUrl + "get?id=" + productId)
  }

  addProduct(product:Product):Observable<ObjectResponseModel<number>>{
    return this.httpClient.post<ObjectResponseModel<number>>(this.serviceUrl + "add", product)
  }

  updateProduct(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "update", product)
  }

  deleteProduct(productId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "delete", {id:productId})
  }

}
