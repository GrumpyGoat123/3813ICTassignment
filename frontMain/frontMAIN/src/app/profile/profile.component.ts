import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

// for angular http methods
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { Userobj } from '../userobj';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid = 0;
  username = "";
  useremail = "";
  userrole = "";
  groupname = "";
  roomname = "";

  //Set local storage with user
  constructor(private router: Router, private httpClient: HttpClient) {
    if (!(localStorage.getItem('userlogin')=="true")){
      alert("login please");
      this.router.navigateByUrl("/login");
    }
    this.username = localStorage.getItem('username')!;
    this.useremail = localStorage.getItem('useremail')!;
    this.userrole = localStorage.getItem('userrole')!;
    this.userid = Number(localStorage.getItem('userid'));
  }

  ngOnInit(): void {
  }

  //Create a user
  crtUserFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username,
      'useremail': this.useremail,
      'userrole': this.userrole
    }
    let curUser = localStorage.getItem('username');


    if(this.userrole == "super"){
      if(curUser == this.username){
        localStorage.setItem('username', this.username);
        localStorage.setItem('useremail', this.useremail);
        localStorage.setItem('userrole', this.userrole);
        localStorage.setItem('userid', this.userid.toString());
        alert("Updated current user")
      }


      this.httpClient.post<Userobj[]>(BACKEND_URL + '/crtUser', userobj)
        .subscribe((m: any) => {
          if(m == 1){
            alert("Email already exists");
          }else{
            alert(JSON.stringify(m));
          }
        });

    }else{
      alert("Unauthorized Access");
    }





  }

  //Logout User
  logoutFunc(){
    localStorage.clear();
    this.router.navigateByUrl("/");
  }

  //Create a group
  crtGrpFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username,
      'useremail': this.useremail,
      'userrole': this.userrole,
      'groupname': this.groupname
    }
    if(this.userrole == "super" || this.userrole == "admin"){
      this.httpClient.post(BACKEND_URL + '/crtGrp', userobj)
      .subscribe((data:any)=>{
        alert("posting: " +JSON.stringify(this.userrole));

        alert("postRes: " +JSON.stringify(data));

        if (data == 1){
          alert("Already a group with that name");
        }

        else {
          alert("Added to group");
        }


      })
    }else{
      alert("unauthorized Access");
    }

  }

  //Delete a group
  dltGrpFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username,
      'useremail': this.useremail,
      'userrole': this.userrole,
      'groupname': this.groupname
    }
    if(this.userrole == "super" || this.userrole == "admin"){
      this.httpClient.post(BACKEND_URL + '/dltGrp', userobj)
      .subscribe((data:any)=>{
        alert("posting: " +JSON.stringify(this.userrole));

        alert("postRes: " +JSON.stringify(data));

        if (data == 1){
            alert("Couldnt find the group");
        }
        else {
          alert("Deleted Group");
        }
      })
    }else {
      alert("unauthorized Access");
    }

  }


  crtRoomFunc(){
    let roomObj = {
      'roomName': this.roomname,
      'group': this.groupname
    }

    if(this.userrole == "super" || this.userrole == "admin"){
      this.httpClient.post(BACKEND_URL + '/crtRoom', roomObj)
      .subscribe((data:any)=>{
        alert("posting: " +JSON.stringify(this.userrole));

        alert("postRes: " +JSON.stringify(data));

        if (data == 1){
          alert("Already a room with that name");
        }else if(data == 2){
          alert("No group with that name");
        }

        else {
          alert("Added room to group");
        }


      })
    }else{
      alert("unauthorized Access");
    }
  }
}


