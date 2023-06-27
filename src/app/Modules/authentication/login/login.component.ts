import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  UserLoginGroup: FormGroup

  constructor(private authservice: AuthService, private _fb: FormBuilder, private _router: Router, private toastrService: NbToastrService) {

    this.UserLoginGroup = _fb.group({
      UserName: ['', [Validators.required, Validators.pattern("[a-zA-Z].{8,15}")]],
      Password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}")]]
    })

  }

  ngOnInit(): void {
  }


  Login() {
    if (this.UserLoginGroup.valid) {
      this.authservice.jwtAuthentication(this.UserLoginGroup.value)
        .subscribe({
          next: (data) => {
            localStorage.setItem('Token', data.Token);
            this.showToast(data.message, 'success', 'bottom-end');
            this._router.navigate(['/pages/dashboard']);
          }, error: (err) => {
            this.showToast(err.error, 'danger', 'bottom-end');
          },
        })
    }
    else {
      this.showToast('Please Enter Username and Password', 'danger', 'bottom-end');
    }
  }


  showToast(message: string, color: string, position) {
    this.toastrService.show('', message, { duration: 3000, status: color, position, icon: '' });
  }

}
