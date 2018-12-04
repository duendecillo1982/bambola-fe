import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { CustomersDataSource } from './customers-data-source';
import { MatPaginator } from '@angular/material';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

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
  @ViewChild('input') input: ElementRef;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.datasource = new CustomersDataSource(this.customerService);
    this.datasource.loadCustomers('', 0, 2);
    this.getTotalNumberOfCustomers();
  }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCustomersPage();
        })
      )
      .subscribe();

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
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

}
