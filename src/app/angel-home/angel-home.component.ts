import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Request } from '../models/request';
import { User } from '../models/user';

@Component({
  selector: 'app-angel-home',
  templateUrl: './angel-home.component.html',
  styleUrls: ['./angel-home.component.css']
})
export class AngelHomeComponent implements OnInit {

  newRequests!: Request[];
  assignedRequests!: Request[];
  username!: string;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')!;
    this.getNewRequests(this.username);
    this.getAssignedRequests(this.username);
  }

  public getNewRequests(username: string){
    let resp = this.userService.getNewRequestsInArea(username)
    resp.subscribe((response) => {
      console.log("getNewRequests");
      console.log(response);
      console.log("getNewRequests");
    }, (error) => console.log(error));
  }

  public getAssignedRequests(username: string){
    let resp = this.userService.getAssignedRequests(username)
    resp.subscribe((response) => {
      console.log(response);
      this.assignedRequests = response;
    }, (error) => console.log(error));
  }

}
