import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MongoDataService } from '../services/mongo-data.service';

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

  constructor(private router:Router, private httpClient: HttpClient, private mongoData:MongoDataService) { }

  ngOnInit(): void {

  }
  submit(){

    let user = {useremail:this.email, pwd: this.password};
    this.mongoData.login(user)
    .subscribe((data:any)=>{
      console.log(data);
      if (data.ok){
        alert("correct");
        localStorage.setItem('userid', data.userid);
        localStorage.setItem('userlogin', data.ok);
        localStorage.setItem('username', data.username);
        localStorage.setItem('useremail', data.useremail);
        localStorage.setItem('userrole', data.userrole);

        this.router.navigateByUrl("/chat");
      }
      else { alert("email or password incorrect");}


    })




  }

}
