import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { MongoDataService } from '../services/mongo-data.service';

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

  //Data
  groupObj: any[] = [];
  userObj: any[] = [];


  //User list
  userGroupList: any[] = [];
  userRoomList: any[] = [];
  userCurRoom: any;


  constructor(private router: Router, private httpClient: HttpClient, private socketService:SocketService, private mongoData:MongoDataService) {
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
    this.mongoData.getGroups()
    .subscribe((data)=>{
      console.log(data);

      this.groupObj = data;


    });
    this.mongoData.getUsers()
    .subscribe((data)=>{
      console.log(data);

      this.userObj = data;
      this.userGroupList = this.userObj[0].usergroups;
      console.log(this.userGroupList)

    });

      $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });

    this.initIoConnection();
    this.groupJoined = Array.from({ length: 10}).fill('JOIN');
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
      this.mongoData.createGroup(userobj)
      .subscribe((data:any)=>{

        if (data == 1){
          alert("Already a group with that name");
        }

        else {
          this.mongoData.getGroups()
            .subscribe((data)=>{
              console.log(data);

              this.groupObj = data;

          });
          this.mongoData.getUsers()
          .subscribe((data)=>{
            console.log(data);

            this.userObj = data;
            this.userGroupList = this.userObj[0].usergroups;


          });
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
      this.mongoData.deleteGroup(userobj)
      .subscribe((data:any)=>{

        if (data == 1){
            alert("Couldnt find the group");
        }
        else {
          this.mongoData.getGroups()
            .subscribe((data)=>{
              console.log(data);

              this.groupObj = data;

            });
            this.mongoData.getUsers()
            .subscribe((data)=>{
              console.log(data);

              this.userObj = data;
              this.userGroupList = this.userObj[0].usergroups;


            });
          alert("Deleted Group");
          console.log(data);
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
      'group': this.groupname,
      'newRoom': [],
      'roomUsers': [],
    }


    if(this.userrole == "super" || this.userrole == "admin" || this.userrole == "assis"){
      let i = this.groupObj.findIndex((x: { group: string; }) => x.group == roomObj.group);
      if (i == -1) {
        alert("No group with that name");
      } else{
        let ttlRooms = this.groupObj[i].rooms.length;
        for(let a = 0; a < this.groupObj[i].rooms.length; a ++){
          if(this.groupObj[i].rooms[a].room == roomObj.roomName){
            alert("Already a room with that name");
            break;
          }else{
            ttlRooms --;
          }

        }

        if (ttlRooms == 0){
          roomObj.newRoom = this.groupObj[i].rooms;
          console.log(roomObj.newRoom);
          roomObj.roomUsers = this.groupObj[i].rooms.users;
          this.mongoData.createRoom(roomObj)
          .subscribe((data:any)=>{
            alert("Added room to group");

            this.mongoData.getGroups()
            .subscribe((data)=>{
              console.log(data);

              this.groupObj = data;

            });
          });
        }
      }
    }else{
      alert("unauthorized Access");
    }
  }

  //Delete a room
  dltRoomFunc(){
    let roomObj = {
      'roomName': this.roomname,
      'group': this.groupname,
      'newRoom': [],
      'roomUsers': []
    }


    if(this.userrole == "super" || this.userrole == "admin"){
      let i = this.groupObj.findIndex((x: { group: string; }) => x.group == roomObj.group);
      if (i == -1) {
        alert("No group with that name");
      }else{
        let ttlRooms = this.groupObj[i].rooms.length;
        for(let a = 0; a < this.groupObj[i].rooms.length; a ++){
          if(this.groupObj[i].rooms[a].room == roomObj.roomName){
            roomObj.newRoom = this.groupObj[i].rooms;
            roomObj.roomUsers = this.groupObj[i].rooms.users;
            console.log(roomObj.newRoom)
            this.mongoData.deleteRoom(roomObj)
            .subscribe((data:any)=>{
              alert("Deleted Room");

              this.mongoData.getGroups()
              .subscribe((data)=>{
                console.log(data);

                this.groupObj = data;

              });
            });
            break;
          }else{
            ttlRooms --;
          }

        }
        if (ttlRooms == 0){
          alert("No rooms found");
        }
      }
    }else{
      alert("unauthorized Access");
    }
  }


  //Add user to group
  addUserGroupFunc(){
    let groupObj = {
      'group': this.groupname,
      'username': this.username,
      'users': [],
      'usergroups': this.userObj[0].usergroups,
    }


    let check = this.userObj.findIndex((x: { username: string; }) => x.username == groupObj.username);
    if(check == -1){
      alert("Username doesnt exist");
    }else{
      if(this.userrole == "super" || this.userrole == "admin"){
      let i = this.groupObj.findIndex((x: { group: string; }) => x.group == groupObj.group);
      if (i == -1) {
        alert("No group with that name");
      }else{
          let userIndex = this.groupObj[i].users.indexOf(groupObj.username);
          if(userIndex == -1){
            groupObj.users = this.groupObj[i].users;
            this.mongoData.addUserGroup(groupObj)
            .subscribe((data:any)=>{
              alert("User added to group");

              this.mongoData.getGroups()
              .subscribe((data)=>{
                console.log(data);

                this.groupObj = data;

              });
            });
          }else{
            alert("User already exists in group");
          }
        }
      }else{
        alert("unauthorized Access");
      }
    }



  }

  //Delete user from group
  dltUserGroupFunc(){
    let groupObj = {
      'group': this.groupname,
      'username': this.username,
      'users': [],
      'usergroups': this.userObj[0].usergroups,
    }

    let check = this.userObj.findIndex((x: { username: string; }) => x.username == groupObj.username);
    if(check == -1){
      alert("Username doesnt exist");
    }else{
      if(this.userrole == "super" || this.userrole == "admin"){
        let i = this.groupObj.findIndex((x: { group: string; }) => x.group == groupObj.group);
        if (i == -1) {
          alert("No group with that name");
        }else{
            let userIndex = this.groupObj[i].users.indexOf(groupObj.username);
            if(userIndex == -1){
              alert("User does not exist in group");
            }else{
              groupObj.users = this.groupObj[i].users;
                this.mongoData.deleteUserGroup(groupObj)
                .subscribe((data:any)=>{
                  alert("User delete from group");

                  this.mongoData.getGroups()
                  .subscribe((data)=>{
                    console.log(data);

                    this.groupObj = data;

                  });
                });
            }
        }

      }else{
        alert("unauthorized Access");
      }
    }
  }

  //Add user to room
  addUserRoomFunc(){
    let groupObj = {
      'group': this.groupname,
      'roomname': this.roomname,
      'username': this.username,
      'newRoom': [],
      'users': [] = [],
      'userrooms': this.userObj[0].userrooms,
      'messages': [] = []
    }

    let check = this.userObj.findIndex((x: { username: string; }) => x.username == groupObj.username);
    if(check == -1){
      alert("Username doesnt exist");
    }else{
      //User role check
        if(this.userrole == "super" || this.userrole == "admin" || this.userrole == "assis"){
          //Find group
          let i = this.groupObj.findIndex((x: { group: string; }) => x.group == groupObj.group);
          if (i == -1) {
            alert("No group with that name");
          }else{
            let ttlRooms = this.groupObj[i].rooms.length;
            for(let a = 0; a < this.groupObj[i].rooms.length; a ++){
              //Find room in group
              if(this.groupObj[i].rooms[a].room == groupObj.roomname){
                groupObj.users = this.groupObj[i].rooms[a].users;
                groupObj.messages = this.groupObj[i].rooms[a].messages;
                groupObj.newRoom = this.groupObj[i].rooms;
                //Check if user exists in room
                let userCheck = groupObj.users.length;
                for(let b = 0; b < groupObj.users.length; b++){
                  if(groupObj.users[b] == groupObj.username){
                    alert("User already exists in room")
                    break;
                  }else{
                    userCheck --;
                  }
                }
                if(userCheck == 0){
                  //User does not exist in room
                  this.mongoData.addUserRoom(groupObj)
                  .subscribe((data:any)=>{
                    alert("Added user to room");

                    this.mongoData.getGroups()
                    .subscribe((data)=>{
                      console.log(data);

                      this.groupObj = data;

                      });
                  });
                  break;
                }

              }else{
                ttlRooms --;
              }
            }
            //Could not find room
            if(ttlRooms == 0){
              alert("No rooms found");
            }
          }
      }else{
        alert("unauthorized Access");
      }
    }

  }

  //Delete user from room
  dltUserRoomFunc(){
    let groupObj = {
      'group': this.groupname,
      'roomname': this.roomname,
      'username': this.username,
      'newRoom': [],
      'users': [] = [],
      'userrooms': this.userObj[0].userrooms,
      'messages': []=[]
    }

    let check = this.userObj.findIndex((x: { username: string; }) => x.username == groupObj.username);
    if(check == -1){
      alert("Username doesnt exist");
    }else{
      //User role check
      if(this.userrole == "super" || this.userrole == "admin" || this.userrole == "assis"){
        //Find group
        let i = this.groupObj.findIndex((x: { group: string; }) => x.group == groupObj.group);
          if (i == -1) {
            alert("No group with that name");
          }else{
            let ttlRooms = this.groupObj[i].rooms.length;
            for(let a = 0; a < this.groupObj[i].rooms.length; a ++){
              //Find room in group
              if(this.groupObj[i].rooms[a].room == groupObj.roomname){
                groupObj.users = this.groupObj[i].rooms[a].users;
                groupObj.messages = this.groupObj[i].rooms[a].messages;
                groupObj.newRoom = this.groupObj[i].rooms;
                //Check if user exists in room
                let userCheck = groupObj.users.length;
                for(let b = 0; b < groupObj.users.length; b++){
                  if(groupObj.users[b] == groupObj.username){
                    this.mongoData.deleteUserRoom(groupObj)
                    .subscribe((data:any)=>{
                      alert("Deleted user from room");

                      this.mongoData.getGroups()
                      .subscribe((data)=>{
                        console.log(data);

                        this.groupObj = data;

                        });
                    });
                    break;
                  }else{
                    userCheck --;
                  }
                }
                //Cant find user in room
                if(userCheck == 0){
                  alert("User does not exist in this room");
                  break;
                }
              }else{
                ttlRooms --;
              }
            }
            //Could not find room
            if(ttlRooms == 0){
              alert("No rooms found");
            }
          }

      }else{
        alert("unauthorized Access");
      }
    }

  }


  //
  //
  //CHAT MESSAGING
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
      this.socketService.send(this.messagecontent, this.userCurRoom);
      this.messagecontent = "";
      this.updateMessages();
    }else{
      console.log("No message");
    }

  }

  //
  //
  //Group functions
  //
  //
  //Group list variables
  selectedName: any;
  groupJoined: any;
  roomJoined: any;
  currentGroup: any;

  //Display rooms when button clicked
  showRooms(index: any, group: any){
    //reset rooms list
    this.userRoomList = [];
    //Update button
    this.groupJoined = Array.from({ length: 10}).fill('JOIN');
    this.groupJoined[index] = 'JOINED';
    //Get button clicked name
    let a = this.userGroupList[index];
    this.currentGroup = a;


    //loop through data and store rooms
    for(let i = 0; i<this.groupObj.length; i++){
      if(a == this.groupObj[i].group){
        for(let roomsIndex = 0; roomsIndex<this.groupObj[i].rooms.length; roomsIndex++){
          for(let roomUsrIndex = 0; roomUsrIndex<this.groupObj[i].rooms[roomsIndex].users.length; roomUsrIndex++){
            if (this.username == this.groupObj[i].rooms[roomsIndex].users[roomUsrIndex]){
              this.userRoomList.push(this.groupObj[i].rooms[roomsIndex].room);
            }
          }

          console.log(this.userRoomList)

        }

      }
    }
    this.roomJoined = Array.from({ length: 10}).fill('JOIN');
  }

  //Join a room
  joinRoom(index: any, room: any){
    this.roomJoined = Array.from({ length: 10}).fill('JOIN');
    this.roomJoined[index] = 'JOINED';
    this.selectedName = room;

    //create unique room identifier
    this.userCurRoom = this.currentGroup.concat(":"+room);
    console.log(this.userCurRoom);


    let curRoom = {
      "username": this.username,
      "currentroom": this.userCurRoom
    }
    this.mongoData.curRoom(curRoom)
    .subscribe((data:any)=>{

    });

    this.socketService.joinRoom(this.userCurRoom);

    //Update chat history
    this.getMessages();

  }

  //Store messages in mongo
  updateMessages(){
    let groupObj = {
      'group': this.currentGroup,
      'roomname': this.selectedName,
      'username': this.username,
      'newRoom': [],
      'users': [] = [],
      'userrooms': this.userObj[0].userrooms,
      'messages': [] as string []
    }

    let i = this.groupObj.findIndex((x: { group: string; }) => x.group == groupObj.group);

    console.log(groupObj.roomname)
    for(let a = 0; a < this.groupObj[i].rooms.length; a ++){
      if(this.groupObj[i].rooms[a].room == groupObj.roomname){
        groupObj.users = this.groupObj[i].rooms[a].users;
        groupObj.messages = this.messages;
        groupObj.newRoom = this.groupObj[i].rooms;
        console.log(groupObj);
        this.mongoData.updateMessages(groupObj)
        .subscribe((data:any)=>{
            this.mongoData.getGroups()
              .subscribe((data)=>{
                this.groupObj = data;

              });
        });
        break;
      }
    }
  }

  //Display messages on client side
  getMessages(){
    let i = this.groupObj.findIndex((x: { group: string; }) => x.group == this.currentGroup);
    for(let a = 0; a < this.groupObj[i].rooms.length; a ++){
      if(this.groupObj[i].rooms[a].room == this.selectedName){
        this.messages = this.groupObj[i].rooms[a].messages;
      }
    }
  }

}





