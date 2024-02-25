import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';
import { ProcessDetail } from '../models/processDetail';
import { Process } from '../models/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {


  private serviceUrl = apiUrl + "processes/"

  constructor(private httpClient: HttpClient) { }

  getProcessDetails(): Observable<ListResponseModel<ProcessDetail>>{
    return this.httpClient.get<ListResponseModel<ProcessDetail>>(this.serviceUrl + "getdetails")
  }

  process(process:Process): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "add", {process})

  }

}
