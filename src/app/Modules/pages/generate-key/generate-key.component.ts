import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProductCustomerMapService } from '../../../../Services/product-customer-map.service';
import { GenerateKeyService } from '../../../../Services/generate-key.service';

@Component({
  selector: 'ngx-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.scss']
})
export class GenerateKeyComponent implements OnInit {

  generateKeyForm : FormGroup;
  inventories : any;
  securityKey = '';
  DecryptKey : string = '';
  IndexDecryptKey  = ['MAC Address', 'Expiry Date', 'Product Name', 'Inventory Id', 'Serial Number'];

  constructor(private _fb : FormBuilder,
              private _authService : AuthService,
              private clipboard : Clipboard, 
              private _ProductCust : ProductCustomerMapService, 
              private _generateKeyService : GenerateKeyService)
  {
    this.generateKeyForm = _fb.group({
      InventoryId : ['', Validators.required],
      MachineId : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(10)]],
      SerialNumber : ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      MACAddress : ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      ExpiryDate : ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // this.getProductCustomer();
    this.getProductCustomers();
  }


  getProductCustomers()
  {
    this._ProductCust.gets()
    .subscribe({
      next : (data) =>
      {
        if(data.err != true)
        {
          this.inventories = data;
        }
        else
        {
          this._authService.showToast(data.Message, 'danger', 'bottom-end');
        }
      }
    })
  }

  
  copyText(key)
  {
    if(key != null && key != '')
    {
      this.clipboard.copy(key);
      this._authService.showToast('Key Copied Clipboard', 'success', 'bottom-end');
    }
    else
    {
      this._authService.showToast('Key not Generated', 'warning', 'bottom-end')
    }
  }


  generate()
  {
    // this.generateKeyForm.value.InventoryId = this.generateKeyForm.value.InventoryId.split("-");
    // this.generateKeyForm.value.InventoryId = +this.generateKeyForm.value.InventoryId[0].replace(/\s/g, "");
    // console.log("Inventory Id : ", this.generateKeyForm.value.InventoryId);
    // console.log("Inventory Id : ", typeof(this.generateKeyForm.value.InventoryId));
    
    // this.generateKeyForm.value.InventoryId = this.generateKeyForm.value.InventoryId.match(/\d+/g);
    // this.generateKeyForm.value.InventoryId = this.generateKeyForm.value.InventoryId[0];
    if(this.generateKeyForm.valid)
    {
      this.generateKeyForm.value.InventoryId = this.generateKeyForm.value.InventoryId.split("-");
      this.generateKeyForm.value.InventoryId = +this.generateKeyForm.value.InventoryId[0].replace(/\s/g, "");
      // console.log("Generate Key Form : ", this.generateKeyForm.value);


      this._ProductCust.generateKey(this.generateKeyForm.value)
      .subscribe({
        next : (data) => 
        {
          this.generateKeyForm.reset();
          this.securityKey = data.key;
        },error(err) {
          // console.log("Error : ",err);
        },
      })
    }
    else
    {
      this._authService.showToast('Please enter Correct Values', 'warning', 'bottom-end');
    }

//----------------------------------------------------------------------
    // this._ProductCust.generateKey(this.generateKeyForm.value)
    // .subscribe({
    //   next : (data) => 
    //   {
    //     // data.decryptedKey.forEach((element, index) => {
    //     //   this.DecryptKey +=  `${this.IndexDecryptKey[index]} : ${element} \n`;
    //     // });
    //     this.generateKeyForm.reset();
    //     this.securityKey = data.key;
    //   },error(err) {
    //     console.log("Error : ",err);
    //   },
    // })
  }

  decryptKey(generatekey)
  {
    this.DecryptKey = '';
    if(generatekey != null && generatekey != '')
    {
    this._generateKeyService.decryptKey(generatekey)
    .subscribe({
      next : (data) => 
      {
        // console.log("Data : ", data);
        data.forEach((element, index) => {
            this.DecryptKey +=  `${this.IndexDecryptKey[index]} : ${element} \n`;
        });
      }
    })
    }
    else
    {
      this._authService.showToast('Enter The key', 'warning', 'bottom-end');
    }
  }


}
