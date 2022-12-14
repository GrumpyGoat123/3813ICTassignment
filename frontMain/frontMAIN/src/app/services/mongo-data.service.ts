import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userobj } from '../userobj';

@Injectable({
  providedIn: 'root'
})
export class MongoDataService {

  constructor(private http:HttpClient) { }

  //Profile page
  createUser(userobj:Userobj){
    return this.http.post<any>('http://localhost:3000/crtUser', userobj);
  }

  login(user:any){
    console.log(user);
    return this.http.post<any>('http://localhost:3000/login', user);
  }


  //
  //Groups and rooms
  //
  createGroup(groupname:any){
    return this.http.post<any>('http://localhost:3000/crtGrp', groupname);
  }

  deleteGroup(groupname:any){
    return this.http.post<any>('http://localhost:3000/dltGrp', groupname);
  }

  createRoom(roomObj:any){
    return this.http.post<any>('http://localhost:3000/crtRoom', roomObj);
  }

  deleteRoom(roomObj:any){
    return this.http.post<any>('http://localhost:3000/dltRoom', roomObj);
  }



  //
  //Users routes
  //

  addUserGroup(groupObj:any){
    return this.http.post<any>('http://localhost:3000/addUserGroup', groupObj);
  }

  deleteUserGroup(groupObj:any){
    return this.http.post<any>('http://localhost:3000/dltUserGroup', groupObj);
  }

  addUserRoom(groupObj:any){
    return this.http.post<any>('http://localhost:3000/addUserRoom', groupObj);
  }

  deleteUserRoom(groupObj:any){
    return this.http.post<any>('http://localhost:3000/dltUserRoom', groupObj);
  }


  //
  //Gets routes
  //
  getGroups(){
    return this.http.get<any>('http://localhost:3000/getGrp');
  }

  getUsers(){
    return this.http.get<any>('http://localhost:3000/getUsers');
  }


  //Message routes
  curRoom(curRoom: any){
    return this.http.post<any>('http://localhost:3000/curRoom', curRoom);
  }

  updateMessages(room: any){
    return this.http.post<any>('http://localhost:3000/strCht', room);
  }


  //Upload image
  imgupload(fd:any){
    return this.http.post<any>('http://localhost:3000/upload', fd)
  }
}
