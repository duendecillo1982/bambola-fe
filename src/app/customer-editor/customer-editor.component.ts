import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Customer } from '../customer';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.css']
})
export class CustomerEditorComponent implements OnInit {

  customer: Customer = new Customer;

  customerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    postalCode: [''],
    city: ['']
  });  

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(customer => {
        this.customer = customer,
        this.fillForm(this.customer)
      });
  }

  fillForm(customer: Customer): void {
    /*if (customer)
    {
      this.customerForm.patchValue({
        firstName : customer.firstName
      })
    }*/
    if (customer)
    {
      this.customerForm.patchValue(customer)
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.customerService.updateCustomer(this.customer, this.customer.id)
      .subscribe(() => this.goBack());
  }

}
