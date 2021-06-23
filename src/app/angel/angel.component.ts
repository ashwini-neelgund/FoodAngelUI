import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request } from '../models/request';
import { AngelService } from '../services/angel.service';

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
    private angelService: AngelService
  ) {
    this.newReqForm = this.formBuilder.group({});
    this.assignedReqForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.getNewRequests();
    this.getAssignedRequests();
  }

  getNewRequests() {
    this.angelService.getNewRequests('PRAVEENBIDRI@GMAIL.COM').subscribe(
      (data: any) => {
        console.log(data);
        this.newRequests = data;
      },
      (error: any) => console.log(error)
    );
  }

  getAssignedRequests() {
    this.angelService.getAssignedRequests('PRAVEENBIDRI@GMAIL.COM').subscribe(
      (data: any) => {
        console.log(data);
        this.assignedRequests = data;
      },
      (error: any) => console.log(error)
    );
  }

  assignRequest(requestId: number) {
    this.angelService
      .assignRequest(requestId, 'PRAVEENBIDRI@GMAIL.COM')
      .subscribe(
        (data: any) => {
          this.assignedRequests = data;
          this.getNewRequests();
        },
        (error: any) => console.log(error)
      );
  }

  updateRequest(requestId: number) {
    this.angelService.updateRequestAsComplete(requestId).subscribe(
      (data: any) => {
        console.log(data);
        this.getAssignedRequests();
      },
      (error: any) => console.log(error)
    );
  }

  removeAssignedRequest(requestId: number) {
    this.angelService.removeAssignedRequest(requestId, 'PRAVEENBIDRI@GMAIL.COM').subscribe(
      (data: any) => {
        console.log(data);
        this.assignedRequests = data;
        this.getNewRequests();
      },
      (error: any) => console.log(error)
    );
  }
}
