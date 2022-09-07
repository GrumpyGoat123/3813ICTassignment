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

  editFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username,
      'useremail': this.useremail,
      'userrole': this.userrole
    }


    localStorage.setItem('username', this.username);
    localStorage.setItem('useremail', this.useremail);
    localStorage.setItem('userrole', this.userrole);
    localStorage.setItem('userid', this.userid.toString());

    this.httpClient.post<Userobj[]>(BACKEND_URL + '/loginafter', userobj)
      .subscribe((m: any) => {alert(JSON.stringify(m));});



  }

  logoutFunc(){
    localStorage.clear();
    this.router.navigateByUrl("/");
  }

  crtGrpFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username,
      'useremail': this.useremail,
      'userrole': this.userrole,
      'groupname': this.groupname
    }
    this.httpClient.post(BACKEND_URL + '/crtGrp', userobj)
    .subscribe((data:any)=>{
      alert("posting: " +JSON.stringify(this.userrole));

      alert("postRes: " +JSON.stringify(data));

      if (data.ok){
        alert("correct");
        localStorage.setItem('userid', data.userid.toString());
        localStorage.setItem('userlogin', data.ok.toString());
        localStorage.setItem('username', data.username);
        localStorage.setItem('useremail', data.useremail);
        localStorage.setItem('userrole', data.userrole);

        this.router.navigateByUrl("/chat");
      }
      else { alert("email or password incorrect");}


    })
  }
}
