import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userobj } from '../userobj';

@Injectable({
  providedIn: 'root'
})
export class MongoDataService {

  constructor(private http:HttpClient) { }
  createUser(userobj:Userobj){
    return this.http.post<any>('http://localhost:3000/crtUser', userobj);
  }

  login(user:any){
    console.log(user);
    return this.http.post<any>('http://localhost:3000/login', user);
  }

  createGroup(groupname:any){
    return this.http.post<any>('http://localhost:3000/crtGrp', groupname);
  }
}
