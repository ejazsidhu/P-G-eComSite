import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from 'src/assets/validators/email.validator';
import { GeneralService } from 'src/app/_service/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  changeClass = false;
  public form: FormGroup;
  public userName: AbstractControl;
  public password: AbstractControl;
  myMessage = '';
  successTrigger = false;
  errorTrigger = false;

  constructor(private generalService: GeneralService, private fb: FormBuilder, private router: Router) {
    localStorage.clear();

    this.form = this.fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.userName = this.form.controls['userName'];
    this.password = this.form.controls['password'];

  }


  onSubmit(form) {
    this.changeClass = true;
    console.log(form);
    let cradentials = JSON.stringify(form);
    this.generalService.login(cradentials).subscribe(data => {
      localStorage.setItem("Authorized", JSON.stringify(data));
      this.router.navigate(['home']);
      this.changeClass=false;



    }, error => {
      localStorage.clear();
      console.log(error);
      let er=JSON.parse(error._body)
      this.myMessage = er.description//'Username OR password is invalid.';
      this.errorTrigger = true;
      this.changeClass=false;
      setTimeout(() => {
        this.errorTrigger = false;

      }, 3000);

    })
  }

}
