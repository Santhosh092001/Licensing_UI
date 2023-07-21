import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCustomerMapService } from '../../../../Services/product-customer-map.service';
import { MatTableDataSource } from '@angular/material/table';
import { GenerateKeyService } from '../../../../Services/generate-key.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Clipboard } from '@angular/cdk/clipboard';
import { AuthService } from '../../../../Services/auth.service';
import { ProductService } from '../../../../Services/product.service';
import { CustomerService } from '../../../../Services/customer.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  cols = ['s-no', 'ProductId-col', 'productname-col', 'customername-col', 'mac-col', 'serialno-col', 'keygenerationdat-col', 'expirydate-col', 'status-col', 'activationkey-col']
  datasource = new MatTableDataSource();
  ProductDetails = [];
  ProductsName = [];
  FilteredProducts;
  FilteredCustomers;
  CustomersName = [];
  searchForm : FormGroup;
  StatusList = ['Active', 'Expired'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _ProductCust : ProductCustomerMapService,
              private _generateKeyService : GenerateKeyService,
              private _fb : FormBuilder, 
              private clipboard : Clipboard, 
              private _authService : AuthService, 
              private _ProductService : ProductService, 
              private _CustomerService : CustomerService)
  {
    
    this.searchForm = _fb.group({
      ProductName : '',
      CustomerName : '',
      Status : '', 
    })

  }

  ngOnInit(): void {
    this.getProductCustomers();
    this.getProductNames();
    this.getCustomerNames();


    this.searchForm.get('ProductName').valueChanges.subscribe(response => {
      this.filterProductData(response);
      this.applyFilter();
    })

    this.searchForm.get('CustomerName').valueChanges.subscribe(response => {
      this.filterProductData(response);
      this.applyFilter();
    })

    this.searchForm.get('Status').valueChanges.subscribe(response => {
      this.filterProductData(response);
      this.applyFilter();
    })

  }



  filterProductData(enteredData)
  {
    this.FilteredProducts = this.ProductsName.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }


  filterCustomerData(enteredData)
  {
    this.FilteredCustomers = this.ProductsName.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }


  getProductCustomers()
  {
    this._generateKeyService.getProductCustomersDetails()
    .subscribe({
      next : (data) => 
      {
        data.forEach(element => {
          if(element.Status == true)
          {
            element.Status = 'Active';
          }
          else
          {
            element.Status = 'Expired'
          }
          this.ProductDetails.push(element);
        });
        this.datasource = new MatTableDataSource(this.ProductDetails);
        this.datasource.paginator = this.paginator;
      }
    })
  }


  CopyText(ActivationKey)
  {
    this.clipboard.copy(ActivationKey);
    this._authService.showToast('Copy to Clipboard', 'success', 'bottom-end');
  }


  applyFilter()
  {
    this.searchForm.valueChanges.subscribe({
      next : (value) =>  {
        const filter = {...value, ProductName : value.ProductName.trim().toLocaleLowerCase()} as string;
        this.datasource.filter = filter;
      },
    })


    this.datasource.filterPredicate = ((data, filter) => {
      const b = !filter.ProductName || data.ProductName.toLowerCase().includes(filter.ProductName);
      const c = !filter.CustomerName || data.CustomerName.toLowerCase().includes(filter.CustomerName.toLowerCase().trim());
      const f = !filter.Status || data.Status == filter.Status;
      return b && c && f;
    }) as (PeriodicElement, string) => boolean;


  }


  getProductNames()
  {
    this._ProductService.getProductsName().subscribe({
      next : (data) => 
      {
        this.ProductsName = data;
        this.FilteredProducts = data;
      }
    })
  }


  getCustomerNames()
  {
    this._CustomerService.getCustomersName().subscribe({
      next : (data) => 
      {
        this.CustomersName = data;
        this.FilteredCustomers = data;
      }
    })
  }


  downloadExcel()
  {
    this._generateKeyService.getExcel()
    .subscribe({
      next : (response : Blob) => 
      {
        const URL = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = URL;
        link.download = 'ComanyDetails.xlsx';
        link.click();
        this._authService.showToast('Excel Downloaded', 'success', 'bottom-end')
      }
    })
  }

}