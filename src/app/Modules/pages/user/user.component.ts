import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../../Services/auth.service';
import { User } from '../../../Models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  UserFormGroup: FormGroup = new FormGroup({});
  headerValue = 'Update User'
  btnValue = 'Update'
  data: any
  Users: any

  constructor(private _fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private _AuthService: AuthService,
  ) {

    this.UserFormGroup = _fb.group({
      FirstName: ['', [Validators.required, Validators.pattern("[a-zA-Z].{4,15}")]],
      LastName: ['', [Validators.required, Validators.pattern("[a-zA-Z].{0,10}")]],
      UserName: ['', [Validators.required, Validators.pattern("(?=.*[0-9]).[a-zA-Z].{8,20}")]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}")]]
    })

  }

  ngOnInit() {
    this.getUser()
   
  }

  createUser() {
      this._AuthService.createUser(this.UserFormGroup.value)
        .subscribe({
          next: (data) => {
            this._AuthService.showToast(data.message, 'success', 'bottom-end');
            this.getUser();
          }, error : (err) => {
            this.showToast(err.error, 'danger', 'bottom-end');
          },
        })
  }

  updateUser() {
    const user = new User();
    user.Id = this.data.Id;
    user.FirstName = this.UserFormGroup.value.FirstName
    user.LastName = this.UserFormGroup.value.LastName
    user.UserName = this.UserFormGroup.value.UserName
    user.Email = this.UserFormGroup.value.Email
    user.Password = this.UserFormGroup.value.Password
      this._AuthService.updateUser(user)
        .subscribe({
          next: (data) => {
            this.showToast(data.message, 'success', 'bottom-end');
            this.getUser();
          }, error : (err) => {
            this.showToast(err.error, 'danger', 'bottom-end');
          },
        })
  }


  changeData(changedata) {
    this.UserFormGroup.patchValue(changedata);
    this.data = changedata
    this.headerValue = 'Update User'
    this.btnValue = 'Update'
    // console.log("Change data : ",this.data)
  }

  addUser() {
    this.UserFormGroup.reset();
    this.headerValue = 'Create User';
    this.btnValue = 'Create'
    // console.log("Add User data : ",this.data)
  }

  clear(buttonValue: any) {
    if (buttonValue == 'Update') {
      this.UserFormGroup.patchValue(this.data)
    }
    else {
      this.UserFormGroup.reset();
    }
  }

  createOrUpdateUser(buttonValue,ref) {
    if (buttonValue == 'Create') {
      this.createUser();
    }
    else {
      this.updateUser()
    }
    ref.close(true);
  }


  showToast(message: string, color: string, position) {
    this.toastrService.show('',
      message,
      { duration: 3000, status: color, position, icon: '' });
  }

  getUser() {
    this._AuthService.getAllUser()
      .subscribe({
        next: (data) => {
          this.Users = data;
          this.changeData(this.Users[0]);
          if (this.Users.length == 0) {
            this.headerValue = 'Create User'
            this.btnValue = 'Create'
          }
        }
      })
  }

  open(dialog: TemplateRef<any>) {
    if(this.UserFormGroup.valid)
    {
        if(    this.data.UserName != this.UserFormGroup.value.UserName 
           ||  this.data.FirstName != this.UserFormGroup.value.FirstName
           ||  this.data.LastName != this.UserFormGroup.value.LastName 
           ||  this.data.Email != this.UserFormGroup.value.Email
           ||  this.data.Password != this.UserFormGroup.value.Password  )
        {
          this.dialogService.open(dialog);
        }
        else
        {
          this.showToast('User not Updated', 'danger', 'bottom-end')
        }
    }
    else
    {
      this.showToast('Enter Valid User Details', 'danger', 'bottom-end')
    }
  }

}
