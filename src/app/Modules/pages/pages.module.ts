import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NbInputModule, NbButtonModule, NbCardModule, NbSelectModule, NbOptionModule, NbDatepickerModule, NbIconModule } from '@nebular/theme';
import { AuthGuard } from '../../Gaurds/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductCustomerMapComponent } from './product-customer-map/product-customer-map.component';
import { GenerateKeyComponent } from './generate-key/generate-key.component';

const routes : Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'generatekey',
    component: GenerateKeyComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'pcm',
    component: ProductCustomerMapComponent,
    canActivate : [AuthGuard]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    ProductComponent,
    CustomerComponent,
    ProductCustomerMapComponent,
    GenerateKeyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    MatSnackBarModule,
    NbSelectModule,
    NbOptionModule,
    MatTableModule,
    NbDatepickerModule,
    NbIconModule
  ]
})
export class PagesModule { }
