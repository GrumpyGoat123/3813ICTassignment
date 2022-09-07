import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
// for angular http methods

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  submit(){

    let user = {username:this.email, pwd: this.password};
    this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      alert("posting: " +JSON.stringify(user));

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
