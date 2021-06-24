import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Request } from '../models/request';
import { AngelService } from '../services/angel.service';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-angel',
  templateUrl: './angel.component.html',
  styleUrls: ['./angel.component.css'],
})
export class AngelComponent implements OnInit {
  newReqForm!: FormGroup;
  assignedReqForm!: FormGroup;
  assignedRequests!: Request[];
  newRequests!: Request[];

  constructor(
    private formBuilder: FormBuilder,
    private angelService: AngelService,
    private jwtService: JwtClientService,
    private router: Router
  ) {
    this.newReqForm = this.formBuilder.group({});
    this.assignedReqForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.getNewRequests();
    this.getAssignedRequests();
  }

  getNewRequests() {
    if (!this.jwtService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    let sessionObj = sessionStorage.getItem('userName');
    console.log(sessionObj);
    let userName = sessionObj ? sessionObj : '';
    this.angelService.getNewRequests(userName).subscribe(
      (data: any) => {
        console.log(data);
        this.newRequests = data;
      },
      (error: any) => console.log(error)
    );
  }

  getAssignedRequests() {
    if (!this.jwtService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    let sessionObj = sessionStorage.getItem('userName');
    console.log(sessionObj);
    let userName = sessionObj ? sessionObj : '';
    this.angelService.getAssignedRequests(userName).subscribe(
      (data: any) => {
        console.log(data);
        this.assignedRequests = data;
      },
      (error: any) => console.log(error)
    );
  }

  assignRequest(requestId: number) {
    if (!this.jwtService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    let sessionObj = sessionStorage.getItem('userName');
    console.log(sessionObj);
    let userName = sessionObj ? sessionObj : '';
    this.angelService.assignRequest(requestId, userName).subscribe(
      (data: any) => {
        this.assignedRequests = data;
        this.getNewRequests();
      },
      (error: any) => console.log(error)
    );
  }

  updateRequest(requestId: number) {
    if (!this.jwtService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.angelService.updateRequestAsComplete(requestId).subscribe(
      (data: any) => {
        console.log(data);
        this.getAssignedRequests();
      },
      (error: any) => console.log(error)
    );
  }

  removeAssignedRequest(requestId: number) {
    if (!this.jwtService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    let sessionObj = sessionStorage.getItem('userName');
    console.log(sessionObj);
    let userName = sessionObj ? sessionObj : '';
    this.angelService.removeAssignedRequest(requestId, userName).subscribe(
      (data: any) => {
        console.log(data);
        this.assignedRequests = data;
        this.getNewRequests();
      },
      (error: any) => console.log(error)
    );
  }

}
