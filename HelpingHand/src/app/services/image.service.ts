import { ProductImage } from '../models/productImage';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { apiUrl } from './serviceConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  serviceUrl = apiUrl + 'productimages/';

  constructor(
    private httpClient: HttpClient
  ) { }



  uploadImages(images: File[], carId: number): Observable<ResponseModel> {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('productId', carId.toString());

    return this.httpClient.post<ResponseModel>(this.serviceUrl + "addmultiple", formData);
  }

  getImagesByProductId(id: number): Observable<ListResponseModel<ProductImage>> {
    return this.httpClient.get<ListResponseModel<ProductImage>>(this.serviceUrl + "getbyproductid?productId=" + id);
  }

  deleteImage(id: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "delete", { id: id });
  }

}
