import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

customers: Customer[];
datasource = new MatTableDataSource(this.customers);
displayedColumns = ['id', 'firstName', 'lastName'];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers,
        this.datasource.data = this.customers}
        );
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  } 

}
