import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userobj } from '../userobj';

@Injectable({
  providedIn: 'root'
})
export class MongoDataService {

  constructor(private http:HttpClient) { }
  add(userobj:Userobj){
    return this.http.post<any>('http://localhost:3000/add', userobj);
  }
}
