import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MongoDataService } from '../services/mongo-data.service';
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
  constructor(private router: Router, private httpClient: HttpClient, private mongoData:MongoDataService) {
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
    let curUserRole = localStorage.getItem('userrole');

    //Super roles
    if(curUserRole == "super"){

      this.mongoData.createUser(userobj)
        .subscribe((m: any) => {
          if(m.error != null){
            alert("Email already exists");
          }else{
            if(curUser == this.useremail){
              localStorage.setItem('username', this.username);
              localStorage.setItem('useremail', this.useremail);
              localStorage.setItem('userrole', this.userrole);
              localStorage.setItem('userid', this.userid.toString());
              alert("Updated current user")
            }
            alert(JSON.stringify(m));
          }
        });

        //Admin role
    }else if(curUserRole == "admin"){
      if(this.userrole == "admin" || this.userrole == "super"){
        alert("Cannot give user super/admin role")
      }else{
        this.mongoData.createUser(userobj)
        .subscribe((m: any) => {
          if(m.error != null){
            alert("Email already exists");
          }else{
            if(curUser == this.username){
              localStorage.setItem('username', this.username);
              localStorage.setItem('useremail', this.useremail);
              localStorage.setItem('userrole', this.userrole);
              localStorage.setItem('userid', this.userid.toString());
              alert("Updated current user")
            }
            alert(JSON.stringify(m));
          }
        });
      }


      //Cant access
    }else{
      alert("Unauthorized Access");
    }






  }

  //Logout User
  logoutFunc(){
    localStorage.clear();
    this.router.navigateByUrl("/");
  }

  title = 'imageupload';
  selectedfile:any = null;
  imagepath="";

  onFileSelected(event:any){
    this.selectedfile = event.target.files[0];
  }
  onUpload(){
    const fd = new FormData();
    fd.append('image',this.selectedfile,this.selectedfile.name);
    this.mongoData.imgupload(fd).subscribe(res=>{
      this.imagepath = res.data.filename;

    });
  }
}
