import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Item } from '../models/item';
import { ItemRequested } from '../models/ItemRequested';
import { Request } from '../models/request';
import { User } from '../models/user';
import { SeekerService } from '../services/seeker.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  requestForm!: FormGroup;
  @ViewChild('address2')
  addr2InputField!: ElementRef;
  items!: Item[];
  itemsReq: number[] = [];
  itemsRequested: ItemRequested[] = [];
  request: Request = new Request;
  seeker!: User;
  

  // Google Maps Api Options
  // Had to import Options directly, per advice at:
  // https://github.com/skynet2/ngx-google-places-autocomplete/issues/91
  formattedAddress = '';
  options = {
    fields: ['address_components'],
    types: ['address'],
    componentRestrictions: {
      country: 'US',
    },
  } as Options; // "as ..." tells TypeScript to type this object as the defined type instead of the default

  constructor(
    private formBuilder: FormBuilder,
    private seekerService: SeekerService,
    private router: Router
  ) {
    this.requestForm = this.formBuilder.group({
      firstName: [{ value: '', disabled: true }, [Validators.required]],
      lastName: [{ value: '', disabled: true }, [Validators.required]],
      emailAddress: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      gender: [{ value: '', disabled: true }],
      phoneNumber: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      altNumber: [
        { value: '', disabled: true },
        [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      address: this.formBuilder.group({
        addressText: ['', [Validators.required]],
        address1: [{ value: '', disabled: true }, [Validators.required]],
        address2: [{ value: '', disabled: true }],
        city: [{ value: '', disabled: true }, [Validators.required]],
        state: [{ value: '', disabled: true }, [Validators.required]],
        zipCode: [{ value: '', disabled: true }, [Validators.required]],
        country: [{ value: '', disabled: true }, [Validators.required]],
      }),
      termsAndConditions: [
        { value: '', disabled: true },
        [Validators.requiredTrue],
      ]
    });
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.seekerService.getItems().subscribe((items) => {
      console.log(items);
      this.items = items;
    });
  }

  onCheckboxChange(e: any) {
  
    if (e.target.checked) {
      this.itemsReq.push(e.target.value);
    } else {
      let i: number = 0;
      this.itemsReq.forEach((item) => {
        if (item == e.target.value) {
          this.itemsReq.splice(i,1);
          return;
        }
        i++;
      });
    }
  }

  //setting address from API to form variables
  public AddressChange(address: Address) {
    let street_number: string = '';
    for (let address_component of address.address_components) {
      const componentType = address_component.types[0];
      switch (componentType) {
        case 'street_number': {
          street_number = address_component.long_name;
          break;
        }
        case 'route': {
          //this.requestForm.get('address.address1')?.enable();
          this.requestForm
            .get('address.address1')
            ?.setValue(`${street_number} ${address_component.short_name}`);
          break;
        }
        case 'locality': {
          //this.requestForm.get('address.city')?.enable();
          this.requestForm
            .get('address.city')
            ?.setValue(address_component.long_name);
          break;
        }
        case 'administrative_area_level_1': {
          //this.requestForm.get('address.state')?.enable();
          this.requestForm
            .get('address.state')
            ?.setValue(address_component.short_name);
          break;
        }
        case 'postal_code': {
          //this.requestForm.get('address.zipCode')?.enable();
          this.requestForm
            .get('address.zipCode')
            ?.setValue(address_component.long_name);
          break;
        }
        case 'country': {
          //this.requestForm.get('address.country')?.enable();
          this.requestForm
            .get('address.country')
            ?.setValue(address_component.short_name);
        }
      }
    }
    this.requestForm.get('address.address2')?.enable();
    this.addr2InputField.nativeElement.focus();

    //calls to check if an angel is present in that zipcode
    this.seekerService
      .checkForAngel(this.requestForm.getRawValue().address.zipCode)
      .subscribe(
        (data) => {
          if (data == true) {
            this.requestForm.get('firstName')?.enable();
            this.requestForm.get('lastName')?.enable();
            this.requestForm.get('emailAddress')?.enable();
            this.requestForm.get('gender')?.enable();
            this.requestForm.get('phoneNumber')?.enable();
            this.requestForm.get('altNumber')?.enable();
            this.requestForm.get('termsAndConditions')?.enable();
            this.requestForm.get('requests')?.enable();
          } else {
            console.log('no angel');
          }
        },
        (error) => console.log(error)
      );
  }

  // Gets called on form submission
  logRequest() {
    this.itemsReq.forEach(element => {
      this.itemsRequested.push({id: element,name:'',description:''});
    });
    this.request.itemsRequested = this.itemsRequested;
    this.seeker = this.requestForm.getRawValue();
    this.seeker.requests = [];
    this.seeker.requests.push(this.request);
    //calls log request service method
    this.seekerService.logRequest(this.seeker).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (error) => console.log(error)
    );
  }

  //Clears the form on click of clear button
  resetForm() {
    this.requestForm.reset();
  }
}
