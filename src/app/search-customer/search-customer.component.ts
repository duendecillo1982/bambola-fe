import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { CustomersDataSource } from './customers-data-source';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

datasource : CustomersDataSource;
displayedColumns = ['id', 'firstName', 'lastName'];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.datasource = new CustomersDataSource(this.customerService);
    this.datasource.loadCustomers(0, 2);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  } 

}
