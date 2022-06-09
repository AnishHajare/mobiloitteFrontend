import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private service: MainService,private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue],
      },
    );
  }

  ngOnInit() {
  
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.service.register(this.registerForm.value).subscribe((res)=>{
      
      if(res.message == 'Success')
      {
        this.router.navigate(['/login']);
      }else if(res.message == "Mail already registered"){
        alert("Email is not registered,Please Sign Up")
      }else{
        alert("Server error!")
      }
    })
    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
