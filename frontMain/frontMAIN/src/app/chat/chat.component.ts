import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';

const BACKEND_URL = 'http://localhost:3000';

// for angular http methods
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userid = 0;
  username = "";
  useremail = "";
  userrole = "";
  groupname = "";
  roomname = "";


  grouplist = [];
  constructor(private router: Router, private httpClient: HttpClient, private socketService:SocketService) {
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
      $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });

    this.initIoConnection();
  }

  //
  //
  //ROUTES FOR CHAT COMPONENT
  //
  //


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
          this.grouplist = data;
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


  //
  //
  //CHAT MESSAGING COMPONENT
  //
  //

  //messages
  messagecontent:string="";
  messages:string[] = [];
  ioConnection:any;

  initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
      .subscribe((message:any) => {
        //Add new message to message array
        this.messages.push(message);
      });
  }

  chat(){
    if(this.messagecontent){
      //Check for message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent = "";
    }else{
      console.log("No message");
    }

  }
}
