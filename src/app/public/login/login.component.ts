import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from 'src/assets/validators/email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  changeClass = false;
  public form: FormGroup;
  public userName: AbstractControl;
  public password: AbstractControl;
  myMessage = '';
  successTrigger = false;
  errorTrigger = false;

  constructor(private fb: FormBuilder, private router: Router) {

    this.form = fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.userName = this.form.controls['userName'];
    this.password = this.form.controls['password'];

  }


  onSubmit(m) {
    this.changeClass = true;
    console.log(m)

    if (m.userName == "admin@png.com" && m.password == 'admin') {
      localStorage.clear()
      let obj: any = {
        Authorized: true,
        email: m.email,
        role: 'admin'
      }
      localStorage.setItem("Authorized", JSON.stringify(obj));
      this.router.navigate(['home']);

    }
    

    else if (m.userName != "admin@png.com" || m.password != 'admin') {
      localStorage.clear()
      this.myMessage = 'Username OR password is invalid.';
      this.errorTrigger = true;

      setTimeout(() => {
        this.errorTrigger=false;
        
      }, 3000);

    }



  }



  ngOnInit() {
  }

}
