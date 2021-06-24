import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { MustMatch } from '../utilities/custom-validators';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  selectedFile!: File;
  @ViewChild("address2")
  addr2InputField!: ElementRef;

  // Google Maps Api Options
  // Had to import Options directly, per advice at:
  // https://github.com/skynet2/ngx-google-places-autocomplete/issues/91
  formattedAddress = "";
  options={
    fields: ["address_components"],
    types: ["address"],
    componentRestrictions:{
      country: "US"
    }
  } as Options; // "as ..." tells TypeScript to type this object as the defined type instead of the default

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]],
        gender: new FormControl(),
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        altNumber: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        address: this.formBuilder.group({
          addressText: ['', [Validators.required]],
          address1: [{ value: '', disabled: true }, [Validators.required]],
          address2: [{ value: '', disabled: true }],
          city: [{ value: '', disabled: true }, [Validators.required]],
          state: [{ value: '', disabled: true }, [Validators.required]],
          zipCode: [{ value: '', disabled: true }, [Validators.required]],
          country: [{ value: '', disabled: true }, [Validators.required]],
        }),
        idFile: ['', [Validators.required]],
        termsAndConditions: ['', [Validators.requiredTrue]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  //setting address from API to form variables
  public AddressChange(address: Address) {

    let street_number: string = "";
    for(let address_component of address.address_components) {
      const componentType = address_component.types[0];
      switch (componentType) {
        case "street_number": {
          street_number = address_component.long_name;
          break;
        }
        case "route": {
          //this.registerForm.get('address.address1')?.enable();
          this.registerForm.get('address.address1')?.setValue(`${street_number} ${address_component.short_name}`);
          break;
        }
        case "locality": {
          //this.registerForm.get('address.city')?.enable();
          this.registerForm.get('address.city')?.setValue(address_component.long_name);
          break;
        }
        case "administrative_area_level_1": {
          //this.registerForm.get('address.state')?.enable();
          this.registerForm.get('address.state')?.setValue(address_component.short_name);
          break;
        }
        case "postal_code": {
          //this.registerForm.get('address.zipCode')?.enable();
          this.registerForm.get('address.zipCode')?.setValue(address_component.long_name);
          break;
        }
        case "country": {
          //this.registerForm.get('address.country')?.enable();
          this.registerForm.get('address.country')?.setValue(address_component.short_name);
        }
      }
    } 
    this.registerForm.get('address.address2')?.enable();
    this.addr2InputField.nativeElement.focus();
  }

  // Angel registration function. Gets called on form submission
  registerAngel() {
    //sets the image and user data into form object
    const userAndImageData = new FormData();
    this.registerForm.value.userType = 'angel';
    const blobUser = new Blob([JSON.stringify(this.registerForm.getRawValue())], {
      type: 'application/json',
    });
    userAndImageData.append('imageFile', this.selectedFile);
    userAndImageData.append('user', blobUser);

    //calls angel registration service method
    this.userService.registerAngel(userAndImageData).subscribe(
      (data) => {
        alert("Angel has been successfully registered.\n Please login to check on help requests in your area.");
        this.router.navigate(['/login']);
      },
      (error) => console.log(error)
    );
  }

  //Clears the registration form on click of clear button
  resetForm() {
    this.registerForm.reset();
  }
}
