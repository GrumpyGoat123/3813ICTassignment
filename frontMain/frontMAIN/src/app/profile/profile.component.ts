import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
// const BACKEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'https://s2179956.elf.ict.griffith.edu.au:3001';

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
  userbirthdate = "";
  userage = 0;
  constructor(private router: Router, private httpClient: HttpClient) { 
    if (!(sessionStorage.getItem('userlogin')=="true")){
      alert("login please");
      this.router.navigateByUrl("/login");
    }
    this.username = sessionStorage.getItem('username')!;
    this.userbirthdate = sessionStorage.getItem('userbirthdate')!;
    this.userage = Number(sessionStorage.getItem('userage'));
    this.userid = Number(sessionStorage.getItem('userid'));
  }

  ngOnInit(): void {
  }

  editFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username, 
      'userbirthdate': this.userbirthdate, 
      'userage': this.userage
    }

    
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('userbirthdate', this.userbirthdate);
    sessionStorage.setItem('userage', this.userage.toString());
    sessionStorage.setItem('userid', this.userage.toString());

    this.httpClient.post<Userobj[]>(BACKEND_URL + '/loginafter', userobj,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});



  }

}
