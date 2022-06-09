import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private service: MainService,private router: Router) {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
    );
  }

  ngOnInit() {
  
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value).subscribe((res)=>{
      if(res.message == 'Authentic User')
      {
        this.router.navigate(['/home']);
      }else if(res.message == "Wrong password"){
        alert("Please enter correct email id and password!")
      }else if(res.message == "Please enter correct mailID"){
        alert("Email is not registered,Please Sign Up")
      }else{
        alert("Server error!")
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
