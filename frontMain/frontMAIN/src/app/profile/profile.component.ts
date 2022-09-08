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
    let curUserRole = localStorage.getItem('userrole');

    if(curUserRole == "super"){

      this.httpClient.post<Userobj[]>(BACKEND_URL + '/crtUser', userobj)
        .subscribe((m: any) => {
          if(m == 1){
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

    }else if(curUserRole == "admin"){
      if(this.userrole == "admin" || this.userrole == "super"){
        alert("Cannot give user super/admin role")
      }else{
        this.httpClient.post<Userobj[]>(BACKEND_URL + '/crtUser', userobj)
        .subscribe((m: any) => {
          if(m == 1){
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

        if (data == 1){
          alert("Already a group with that name");
        }

        else {
          alert("Created new group");
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


  //Create a room
  crtRoomFunc(){
    let roomObj = {
      'roomName': this.roomname,
      'group': this.groupname
    }

    if(this.userrole == "super" || this.userrole == "admin" || this.userrole == "assis"){
      this.httpClient.post(BACKEND_URL + '/crtRoom', roomObj)
      .subscribe((data:any)=>{

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

  //Delete a room
  dltRoomFunc(){
    let roomObj = {
      'roomName': this.roomname,
      'group': this.groupname
    }

    if(this.userrole == "super" || this.userrole == "admin"){
      this.httpClient.post(BACKEND_URL + '/dltRoom', roomObj)
      .subscribe((data:any)=>{

        if (data == 1){
          alert("No room with that name");
        }else if(data == 2){
          alert("No group with that name");
        }

        else {
          alert("Deleted Room");
        }


      })
    }else{
      alert("unauthorized Access");
    }
  }


  //Add user to group
  addUserGroupFunc(){
    let groupObj = {
      'group': this.groupname,
      'username': this.username,
    }

    if(this.userrole == "super" || this.userrole == "admin"){
      this.httpClient.post(BACKEND_URL + '/addUserGroup', groupObj)
      .subscribe((data:any)=>{

        if (data == 1){
          alert("Group does not exist");
        }else if(data == 2){
          alert("User already exists in group");
        }else if(data == 3){
          alert("User does not exist");
        }
        else {
          alert("User added to group");
        }


      })
    }else{
      alert("unauthorized Access");
    }
  }

  //Delete user from group
  dltUserGroupFunc(){
    let groupObj = {
      'group': this.groupname,
      'username': this.username,
    }

    if(this.userrole == "super" || this.userrole == "admin"){
      this.httpClient.post(BACKEND_URL + '/dltUserGroup', groupObj)
      .subscribe((data:any)=>{

        if (data == 1){
          alert("Group does not exist");
        }else if(data == 2){
          alert("User does not exist in group");
        }else if(data == 3){
          alert("User does not exist");
        }
        else {
          alert("User deleted from group");
        }


      })
    }else{
      alert("unauthorized Access");
    }
  }

  //Add user to room
  addUserRoomFunc(){
    let groupObj = {
      'group': this.groupname,
      'roomname': this.roomname,
      'username': this.username
    }
    if(this.userrole == "super" || this.userrole == "admin" || this.userrole == "assis"){
      this.httpClient.post(BACKEND_URL + '/addUserRoom', groupObj)
      .subscribe((data:any)=>{

        if (data == 1){
          alert("Group does not exist");
        }else if(data == 2){
          alert("Room does not exist");
        }else if(data == 3){
          alert("User does not exist");
        }else if(data == 4){
          alert("User already exists in room");
        }else if(data == 5){
          alert("User is not in this group");
        }
        else {
          alert("User added to room");
        }


      })
    }else{
      alert("unauthorized Access");
    }
  }

  //Delete user from room
  dltUserRoomFunc(){
    let groupObj = {
      'group': this.groupname,
      'roomname': this.roomname,
      'username': this.username
    }
    if(this.userrole == "super" || this.userrole == "admin" || this.userrole == "assis"){
      this.httpClient.post(BACKEND_URL + '/dltUserRoom', groupObj)
      .subscribe((data:any)=>{

        if (data == 1){
          alert("Group does not exist");
        }else if(data == 2){
          alert("Room does not exist");
        }else if(data == 3){
          alert("User does not exist");
        }else if(data == 4){
          alert("User does not exist in this room");
        }else if(data == 5){
          alert("User is not in this group");
        }
        else {
          alert("User removed from room");
        }


      })
    }else{
      alert("unauthorized Access");
    }
  }
}


