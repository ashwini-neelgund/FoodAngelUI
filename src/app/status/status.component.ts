import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request } from '../models/request';
import { SeekerService } from '../services/seeker.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  checkStatusForm!: FormGroup;
  updateStatusForm!: FormGroup;
  requestDeatils!: Request;
  requestExist: boolean = false;
  btnClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private seekerService: SeekerService
  ) {
    this.checkStatusForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      pin: ['', [Validators.required]],
    });

    this.updateStatusForm = this.formBuilder.group({});
  }

  ngOnInit(): void {}

  // Gets called on checkStatusForm submission
  checkRequestStatus() {
    //calls check request status service method
    this.seekerService
      .getRequest(
        this.checkStatusForm.get('id')?.value,
        this.checkStatusForm.get('pin')?.value
      )
      .subscribe(
        (data) => {
          this.requestDeatils = data;
          this.btnClicked = true;
          if (this.requestDeatils == null) {
            this.requestExist = false;
          } else {
            this.requestExist = true;
          }
          console.log(this.requestDeatils);
        },
        (error) => console.log(error)
      );
  }

  // Gets called on updateStatusForm submission
  updateRequestStatus() {
    //calls update request status service method
    this.seekerService.updateRequest(this.requestDeatils).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  //deletes the request on click
  deleteRequest() {
    if (this.requestDeatils.status == 'active') {
      this.seekerService.deleteRequest(this.requestDeatils.id).subscribe(
        (data) => {
          alert("Request has been successfully deleted.");
          this.resetForm();
        },
        (error) => console.log(error)
      );
    } else {
      alert('Only request with active status can be deleted');
    }
  }

  //Clears the form on click of clear button
  resetForm() {
    this.checkStatusForm.reset();
    this.btnClicked = false;
  }
}
