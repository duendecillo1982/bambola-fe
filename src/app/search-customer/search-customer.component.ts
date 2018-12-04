import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { CustomersDataSource } from './customers-data-source';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  datasource: CustomersDataSource;
  displayedColumns = ['id', 'firstName', 'lastName'];
  totalNumberofCustomers: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.datasource = new CustomersDataSource(this.customerService);
    this.datasource.loadCustomers(0, 2);
    this.getTotalNumberOfCustomers();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadCustomersPage())
      )
      .subscribe();
  }

  getTotalNumberOfCustomers(): void {
    this.customerService.getTotalNumberOfCustomers()
      .subscribe(totalNumberOfCustomers => this.totalNumberofCustomers = totalNumberOfCustomers);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  loadCustomersPage() {
    this.datasource.loadCustomers(
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

}
