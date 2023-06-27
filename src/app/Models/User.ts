export class User
{
    Id : number;
    FirstName : string;
    LastName : string;
    UserName : string;
    Email : string;
    Password : string;
}




export class Customer
{
    Id : number;
    Name : string; 
    SPOC : string; 
    Email : string;
    Phone : string;
}


export class Product
{
    Id : number;
    Name : string;
    Version : string;
}


export const CUSTOMERS : Customer[] =
[
    {
        Id : 1,
        Name : 'Santhosh',
        Email : 'santhosh@gmail.com',
        SPOC : 'spoc',
        Phone : '7834674556'
      },
      {
        Id : 2,
        Name : 'Rishi',
        Email : 'santhosh@gmail.com',
        SPOC : 'spoc',
        Phone : '7834674556'
      },
      {
        Id : 3,
        Name : 'Lokesh',
        Email : 'santhosh@gmail.com',
        SPOC : 'spoc',
        Phone : '7834674556'
      },
      {
        Id : 4,
        Name : 'Joseph',
        Email : 'santhosh@gmail.com',
        SPOC : 'spoc',
        Phone : '7834674556'
      },
      {
        Id : 5,
        Name : 'Mahesh',
        Email : 'santhosh@gmail.com',
        SPOC : 'spoc',
        Phone : '7834674556'
      }
];



export const PRODUCTS : Product[] = 
[
    {
        Id : 1,
        Name : 'Dell',
        Version : '8'
      },
      {
        Id : 2,
        Name : 'Sony',
        Version : '7'
      },
      {
        Id : 3,
        Name : 'Lenovo',
        Version : '9'
      },
      {
        Id : 4,
        Name : 'Sony',
        Version : '7'
      },
      {
        Id : 5,
        Name : 'Lenovo',
        Version : '9'
      }
];