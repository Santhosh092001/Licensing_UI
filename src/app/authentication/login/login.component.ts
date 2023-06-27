import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  UserLoginGroup:FormGroup

  constructor(private authservice:AuthService, private _fb:FormBuilder,private _router:Router, private toastrService: NbToastrService)
  {

    this.UserLoginGroup = _fb.group({
      UserName : ['',[Validators.required,Validators.pattern("[a-zA-Z].{8,15}")]],
      Password : ['',[Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}")]]
    })
    
  }

  ngOnInit(): void {
  }

  Login()
  {
    console.log("UserLogin Group : ",this.UserLoginGroup.value)
    this.authservice.jwtAuthentication(this.UserLoginGroup.value)
    .subscribe({
      next: (data) => {
        if(data != null)
        {
          localStorage.setItem('Token', data)
          this._router.navigate(['/pages/dashboard'])
          this.showToast(data.message, 'success', 'bottom-end')
        }
        else
        {
          this.UserLoginGroup.reset();
          this.showToast('Login Failed', 'danger', 'bottom-end')
        }
      },error(err) {
        this.UserLoginGroup.reset()
        console.log("Error : ",err)
        this.showToast(err.message, 'danger', 'bottom-end')
      },
    })
  }


  showToast(message : string, color : string, position) {
    this.toastrService.show( '', 
      message,
      { duration : 3000, status: color, position, icon : ''});
  }

}
